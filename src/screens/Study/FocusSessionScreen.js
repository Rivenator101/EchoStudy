import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';
import { updateDoc, doc } from 'firebase/firestore';
import { db } from '../../services/firebase';

export default function FocusSessionScreen({ route, navigation }) {
  const { taskId, duration: initialDuration } = route.params || {};
  const { activeSession, completeFocusSession, tasks, completeTask } = useStudy();
  const { userProfile } = useAuth();
  const task = tasks.find(t => t.id === taskId);

  const defaultDuration = initialDuration || 25 * 60; // 25 minutes default
  const [timeLeft, setTimeLeft] = useState(defaultDuration);
  const [isRunning, setIsRunning] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [sessionStartTime, setSessionStartTime] = useState(null);

  useEffect(() => {
    let interval = null;
    if (isRunning && !isPaused && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isRunning, isPaused, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsRunning(true);
    setIsPaused(false);
    setSessionStartTime(Date.now());
  };

  const handlePause = () => {
    setIsPaused(!isPaused);
  };

  const handleComplete = async () => {
    if (!userProfile) return;

    const sessionDuration = defaultDuration - timeLeft;
    const experienceGained = Math.floor(sessionDuration / 60) * 10; // 10 XP per minute
    const newExperience = (userProfile?.experience || 0) + experienceGained;
    const experienceNeeded = userProfile?.level * 100 || 100;
    const newLevel = Math.floor(newExperience / experienceNeeded) + 1;

    try {
      await updateDoc(doc(db, 'users', userProfile.uid), {
        experience: newExperience,
        level: newLevel,
        studyStreak: (userProfile?.studyStreak || 0) + 1,
      });

      await completeFocusSession({
        taskId,
        duration: sessionDuration,
        experienceGained,
        startTime: sessionStartTime,
        endTime: Date.now(),
      });

      if (taskId) {
        await completeTask(taskId);
      }

      Alert.alert('Session Complete!', `You earned ${experienceGained} XP!`, [
        { text: 'Great!', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to save session: ' + error.message);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.taskTitle}>{task?.title || 'Focus Session'}</Text>
      <Text style={styles.timer}>{formatTime(timeLeft)}</Text>

      <View style={styles.controls}>
        {!isRunning ? (
          <TouchableOpacity style={styles.startButton} onPress={handleStart}>
            <Text style={styles.buttonText}>Start</Text>
          </TouchableOpacity>
        ) : (
          <TouchableOpacity style={styles.pauseButton} onPress={handlePause}>
            <Text style={styles.buttonText}>{isPaused ? 'Resume' : 'Pause'}</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity style={styles.completeButton} onPress={handleComplete}>
          <Text style={styles.buttonText}>Complete</Text>
        </TouchableOpacity>
      </View>

      <Text style={styles.hint}>Stay focused! Avoid distractions during your session.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  taskTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 40,
    textAlign: 'center',
  },
  timer: {
    fontSize: 72,
    fontWeight: 'bold',
    color: '#6366f1',
    marginBottom: 60,
  },
  controls: {
    flexDirection: 'row',
    gap: 20,
  },
  startButton: {
    backgroundColor: '#10b981',
    padding: 20,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  pauseButton: {
    backgroundColor: '#f59e0b',
    padding: 20,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  completeButton: {
    backgroundColor: '#6366f1',
    padding: 20,
    borderRadius: 12,
    minWidth: 120,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  hint: {
    marginTop: 40,
    fontSize: 14,
    color: '#64748b',
    textAlign: 'center',
    fontStyle: 'italic',
  },
});

