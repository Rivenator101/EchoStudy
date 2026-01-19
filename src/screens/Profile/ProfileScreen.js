import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useAuth } from '../../context/AuthContext';
import { useStudy } from '../../context/StudyContext';

export default function ProfileScreen() {
  const { userProfile, logout, currentUser } = useAuth();
  const { tasks, goals, completedSessions } = useStudy();

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Logout', onPress: logout, style: 'destructive' },
      ]
    );
  };

  const completedTasks = tasks.filter(t => t.completed);
  const activeGoals = goals.filter(g => g.status === 'active');

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.avatarCircle}>
          <Text style={styles.avatarText}>
            {userProfile?.displayName?.charAt(0).toUpperCase() || 'U'}
          </Text>
        </View>
        <Text style={styles.name}>{userProfile?.displayName || 'User'}</Text>
        <Text style={styles.email}>{currentUser?.email || ''}</Text>
      </View>

      <View style={styles.statsSection}>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.level || 1}</Text>
          <Text style={styles.statLabel}>Level</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.experience || 0}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
        <View style={styles.statCard}>
          <Text style={styles.statNumber}>{userProfile?.studyStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
      </View>

      <View style={styles.infoSection}>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Active Goals</Text>
          <Text style={styles.infoValue}>{activeGoals.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Completed Tasks</Text>
          <Text style={styles.infoValue}>{completedTasks.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Study Sessions</Text>
          <Text style={styles.infoValue}>{completedSessions.length}</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoLabel}>Member Since</Text>
          <Text style={styles.infoValue}>
            {userProfile?.createdAt 
              ? new Date(userProfile.createdAt).toLocaleDateString()
              : 'N/A'}
          </Text>
        </View>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Logout</Text>
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
    backgroundColor: '#fff',
    padding: 30,
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  avatarCircle: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#6366f1',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 16,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#fff',
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  email: {
    fontSize: 16,
    color: '#64748b',
  },
  statsSection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  statCard: {
    alignItems: 'center',
  },
  statNumber: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  statLabel: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
  infoSection: {
    backgroundColor: '#fff',
    margin: 20,
    borderRadius: 12,
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f5f9',
  },
  infoLabel: {
    fontSize: 16,
    color: '#64748b',
  },
  infoValue: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
  },
  logoutButton: {
    backgroundColor: '#ef4444',
    padding: 16,
    borderRadius: 12,
    marginHorizontal: 20,
    marginBottom: 40,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

