import React, { createContext, useState, useEffect, useContext } from 'react';
import { onAuthStateChanged, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth';
import { auth } from '../services/firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { db } from '../services/firebase';

const AuthContext = createContext({});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [userProfile, setUserProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      setCurrentUser(user);
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserProfile(userDoc.data());
        }
      } else {
        setUserProfile(null);
      }
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const register = async (email, password, displayName) => {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    
    const userProfile = {
      uid: user.uid,
      email: user.email,
      displayName,
      createdAt: new Date().toISOString(),
      level: 1,
      experience: 0,
      avatarStage: 1,
      studyStreak: 0,
    };

    await setDoc(doc(db, 'users', user.uid), userProfile);
    setUserProfile(userProfile);
    return userCredential;
  };

  const login = async (email, password) => {
    return signInWithEmailAndPassword(auth, email, password);
  };

  const logout = async () => {
    await signOut(auth);
    setUserProfile(null);
  };

  const value = {
    currentUser,
    userProfile,
    register,
    login,
    logout,
    loading,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

