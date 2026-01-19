import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { db } from '../services/firebase';

const StudyContext = createContext({});

export const useStudy = () => useContext(StudyContext);

export const StudyProvider = ({ children }) => {
  const { currentUser, userProfile } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [goals, setGoals] = useState([]);
  const [activeSession, setActiveSession] = useState(null);
  const [completedSessions, setCompletedSessions] = useState([]);

  useEffect(() => {
    if (currentUser) {
      loadUserData();
    }
  }, [currentUser]);

  const loadUserData = async () => {
    if (!currentUser) return;

    // Load tasks
    const tasksQuery = query(collection(db, 'tasks'), where('userId', '==', currentUser.uid));
    const tasksSnapshot = await getDocs(tasksQuery);
    const tasksData = tasksSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setTasks(tasksData);

    // Load goals
    const goalsQuery = query(collection(db, 'goals'), where('userId', '==', currentUser.uid));
    const goalsSnapshot = await getDocs(goalsQuery);
    const goalsData = goalsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setGoals(goalsData);

    // Load completed sessions
    const sessionsQuery = query(collection(db, 'sessions'), where('userId', '==', currentUser.uid));
    const sessionsSnapshot = await getDocs(sessionsQuery);
    const sessionsData = sessionsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setCompletedSessions(sessionsData);
  };

  const addGoal = async (goalData) => {
    const goalRef = await addDoc(collection(db, 'goals'), {
      ...goalData,
      userId: currentUser.uid,
      createdAt: new Date().toISOString(),
      status: 'active',
    });
    const newGoal = { id: goalRef.id, ...goalData, userId: currentUser.uid, createdAt: new Date().toISOString(), status: 'active' };
    setGoals([...goals, newGoal]);
    return newGoal;
  };

  const addTask = async (taskData) => {
    const taskRef = await addDoc(collection(db, 'tasks'), {
      ...taskData,
      userId: currentUser.uid,
      createdAt: new Date().toISOString(),
      completed: false,
    });
    const newTask = { id: taskRef.id, ...taskData, userId: currentUser.uid, createdAt: new Date().toISOString(), completed: false };
    setTasks([...tasks, newTask]);
    return newTask;
  };

  const completeTask = async (taskId) => {
    await updateDoc(doc(db, 'tasks', taskId), { completed: true, completedAt: new Date().toISOString() });
    setTasks(tasks.map(task => task.id === taskId ? { ...task, completed: true } : task));
  };

  const startFocusSession = (taskId, duration) => {
    setActiveSession({
      taskId,
      duration,
      startTime: Date.now(),
      paused: false,
    });
  };

  const completeFocusSession = async (sessionData) => {
    const sessionRef = await addDoc(collection(db, 'sessions'), {
      ...sessionData,
      userId: currentUser.uid,
      completedAt: new Date().toISOString(),
    });
    setCompletedSessions([...completedSessions, { id: sessionRef.id, ...sessionData }]);
    setActiveSession(null);
    return sessionRef.id;
  };

  const value = {
    tasks,
    goals,
    activeSession,
    completedSessions,
    addGoal,
    addTask,
    completeTask,
    startFocusSession,
    completeFocusSession,
    loadUserData,
  };

  return <StudyContext.Provider value={value}>{children}</StudyContext.Provider>;
};

