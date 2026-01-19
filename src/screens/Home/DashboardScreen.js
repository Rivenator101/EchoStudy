import React, { useEffect, useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import LearningAvatar from '../../components/Avatar/LearningAvatar';
import { generateMotivationalPrompt } from '../../services/openaiService';

export default function DashboardScreen({ navigation }) {
  const { userProfile } = useAuth();
  const { tasks, goals, completedSessions } = useStudy();
  const [motivationalMessage, setMotivationalMessage] = useState('');

  useEffect(() => {
    loadMotivation();
  }, [userProfile, completedSessions]);

  const loadMotivation = async () => {
    const message = await generateMotivationalPrompt({
      level: userProfile?.level || 1,
      streak: userProfile?.studyStreak || 0,
      completedSessions: completedSessions.length,
    });
    setMotivationalMessage(message);
  };

  const activeTasks = tasks.filter(t => !t.completed);
  const activeGoals = goals.filter(g => g.status === 'active');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.greeting}>Welcome back, {userProfile?.displayName}!</Text>
        <Text style={styles.motivation}>{motivationalMessage}</Text>
      </View>

      <View style={styles.avatarSection}>
        <LearningAvatar level={userProfile?.level || 1} experience={userProfile?.experience || 0} />
        <Text style={styles.levelText}>Level {userProfile?.level || 1}</Text>
        <Text style={styles.streakText}>🔥 {userProfile?.studyStreak || 0} day streak</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{activeGoals.length}</Text>
          <Text style={styles.statLabel}>Active Goals</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{activeTasks.length}</Text>
          <Text style={styles.statLabel}>Tasks</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedSessions.length}</Text>
          <Text style={styles.statLabel}>Sessions</Text>
        </View>
      </View>

      <TouchableOpacity
        style={styles.createButton}
        onPress={() => navigation.navigate('GoalCreation')}
      >
        <Text style={styles.createButtonText}>+ Create New Goal</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.questButton}
        onPress={() => navigation.navigate('Quests')}
      >
        <Text style={styles.questButtonText}>View Quests & Achievements</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
  },
  greeting: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 8,
  },
  motivation: {
    fontSize: 16,
    color: '#64748b',
    fontStyle: 'italic',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 20,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 20,
  },
  levelText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#6366f1',
    marginTop: 12,
  },
  streakText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 4,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    minWidth: 100,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  createButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  questButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  questButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
});

