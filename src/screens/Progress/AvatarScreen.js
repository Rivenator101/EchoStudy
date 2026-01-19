import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';
import LearningAvatar from '../../components/Avatar/LearningAvatar';

export default function AvatarScreen({ navigation }) {
  const { userProfile } = useAuth();
  const { completedSessions } = useStudy();

  const experienceNeeded = (userProfile?.level || 1) * 100;
  const currentXP = (userProfile?.experience || 0) % experienceNeeded;
  const progressPercentage = (currentXP / experienceNeeded) * 100;

  return (
    <ScrollView style={styles.container}>
      <View style={styles.avatarSection}>
        <LearningAvatar level={userProfile?.level || 1} experience={userProfile?.experience || 0} />
        <Text style={styles.levelText}>Level {userProfile?.level || 1}</Text>
        <Text style={styles.experienceText}>
          {currentXP} / {experienceNeeded} XP to next level
        </Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.studyStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{completedSessions.length}</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.experience || 0}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
      </View>

      <View style={styles.progressCard}>
        <Text style={styles.progressTitle}>Progress to Next Level</Text>
        <View style={styles.progressBarContainer}>
          <View style={[styles.progressBarFill, { width: `${progressPercentage}%` }]} />
        </View>
        <Text style={styles.progressText}>
          {experienceNeeded - currentXP} XP needed
        </Text>
      </View>

      <TouchableOpacity
        style={styles.questButton}
        onPress={() => navigation.navigate('Quests')}
      >
        <Text style={styles.questButtonText}>View Quests & Achievements</Text>
      </TouchableOpacity>

      <TouchableOpacity
        style={styles.timelineButton}
        onPress={() => navigation.navigate('Timeline')}
      >
        <Text style={styles.timelineButtonText}>View Progress Timeline</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  avatarSection: {
    alignItems: 'center',
    padding: 30,
    backgroundColor: '#fff',
    marginBottom: 20,
    borderRadius: 16,
    marginHorizontal: 20,
    marginTop: 20,
  },
  levelText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#6366f1',
    marginTop: 16,
  },
  experienceText: {
    fontSize: 16,
    color: '#64748b',
    marginTop: 8,
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statCard: {
    backgroundColor: '#fff',
    padding: 20,
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
  progressCard: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
  },
  progressTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 12,
  },
  progressBarContainer: {
    width: '100%',
    height: 12,
    backgroundColor: '#e2e8f0',
    borderRadius: 6,
    overflow: 'hidden',
    marginBottom: 8,
  },
  progressBarFill: {
    height: '100%',
    backgroundColor: '#6366f1',
    borderRadius: 6,
  },
  progressText: {
    fontSize: 14,
    color: '#64748b',
  },
  questButton: {
    backgroundColor: '#6366f1',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 12,
    alignItems: 'center',
  },
  questButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  timelineButton: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 20,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#6366f1',
  },
  timelineButtonText: {
    color: '#6366f1',
    fontSize: 16,
    fontWeight: '600',
  },
});

