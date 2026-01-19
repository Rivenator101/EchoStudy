import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, FlatList } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import QuestCard from '../../components/Quest/QuestCard';

export default function QuestScreen() {
  const { userProfile } = useAuth();
  const { completedSessions, goals } = useStudy();
  const [quests, setQuests] = useState([]);

  useEffect(() => {
    generateQuests();
  }, [userProfile, completedSessions, goals]);

  const generateQuests = () => {
    const allQuests = [
      {
        id: '1',
        title: 'First Steps',
        description: 'Complete your first study session',
        reward: 50,
        completed: completedSessions.length > 0,
        type: 'achievement',
      },
      {
        id: '2',
        title: 'Streak Starter',
        description: 'Maintain a 3-day study streak',
        reward: 100,
        completed: (userProfile?.studyStreak || 0) >= 3,
        type: 'achievement',
      },
      {
        id: '3',
        title: 'Goal Setter',
        description: 'Create 3 study goals',
        reward: 75,
        completed: goals.length >= 3,
        type: 'achievement',
      },
      {
        id: '4',
        title: 'Dedicated Learner',
        description: 'Complete 10 study sessions',
        reward: 200,
        completed: completedSessions.length >= 10,
        type: 'achievement',
      },
      {
        id: '5',
        title: 'Week Warrior',
        description: 'Maintain a 7-day study streak',
        reward: 300,
        completed: (userProfile?.studyStreak || 0) >= 7,
        type: 'achievement',
      },
      {
        id: '6',
        title: 'Level Up',
        description: 'Reach level 5',
        reward: 250,
        completed: (userProfile?.level || 1) >= 5,
        type: 'achievement',
      },
      {
        id: '7',
        title: 'Daily Quest',
        description: 'Complete a study session today',
        reward: 50,
        completed: false,
        type: 'daily',
      },
      {
        id: '8',
        title: 'Goal Master',
        description: 'Complete 5 goals',
        reward: 500,
        completed: goals.filter(g => g.status === 'completed').length >= 5,
        type: 'achievement',
      },
    ];

    setQuests(allQuests);
  };

  const completedQuests = quests.filter(q => q.completed);
  const activeQuests = quests.filter(q => !q.completed);

  const renderQuest = ({ item }) => <QuestCard quest={item} />;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Quests & Achievements</Text>
      </View>

      <ScrollView style={styles.content}>
        {activeQuests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Quests ({activeQuests.length})</Text>
            <FlatList
              data={activeQuests}
              renderItem={renderQuest}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {completedQuests.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed ({completedQuests.length})</Text>
            <FlatList
              data={completedQuests}
              renderItem={renderQuest}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {quests.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No quests available</Text>
          </View>
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    backgroundColor: '#fff',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  content: {
    flex: 1,
    padding: 20,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748b',
  },
});

