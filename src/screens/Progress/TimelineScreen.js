import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { useStudy } from '../../context/StudyContext';
import { useAuth } from '../../context/AuthContext';

export default function TimelineScreen() {
  const { completedSessions } = useStudy();
  const { userProfile } = useAuth();

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      month: 'short', 
      day: 'numeric', 
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const sortedSessions = [...completedSessions].sort((a, b) => {
    return new Date(b.completedAt) - new Date(a.completedAt);
  });

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Progress Timeline</Text>
        <Text style={styles.subtitle}>Your study journey</Text>
      </View>

      <View style={styles.statsRow}>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{completedSessions.length}</Text>
          <Text style={styles.statLabel}>Total Sessions</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userProfile?.studyStreak || 0}</Text>
          <Text style={styles.statLabel}>Day Streak</Text>
        </View>
        <View style={styles.statBox}>
          <Text style={styles.statNumber}>{userProfile?.experience || 0}</Text>
          <Text style={styles.statLabel}>Total XP</Text>
        </View>
      </View>

      {sortedSessions.length > 0 ? (
        <View style={styles.timeline}>
          {sortedSessions.map((session, index) => (
            <View key={session.id || index} style={styles.timelineItem}>
              <View style={styles.timelineDot} />
              <View style={styles.timelineContent}>
                <Text style={styles.timelineTitle}>Study Session Completed</Text>
                <Text style={styles.timelineDate}>{formatDate(session.completedAt)}</Text>
                <Text style={styles.timelineDetails}>
                  Duration: {Math.floor(session.duration / 60)} minutes • 
                  XP Earned: {session.experienceGained || 0}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ) : (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText}>No sessions yet</Text>
          <Text style={styles.emptySubtext}>Complete your first study session to see it here!</Text>
        </View>
      )}
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
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 16,
    color: '#64748b',
  },
  statsRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: 20,
    backgroundColor: '#fff',
    marginTop: 20,
    marginHorizontal: 20,
    borderRadius: 12,
  },
  statBox: {
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
  timeline: {
    padding: 20,
    paddingLeft: 40,
  },
  timelineItem: {
    flexDirection: 'row',
    marginBottom: 24,
    position: 'relative',
  },
  timelineDot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: '#6366f1',
    position: 'absolute',
    left: -32,
    top: 4,
  },
  timelineContent: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    borderLeftWidth: 3,
    borderLeftColor: '#6366f1',
  },
  timelineTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  timelineDate: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 4,
  },
  timelineDetails: {
    fontSize: 14,
    color: '#94a3b8',
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
    paddingHorizontal: 20,
  },
  emptyText: {
    fontSize: 20,
    fontWeight: '600',
    color: '#64748b',
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#94a3b8',
    textAlign: 'center',
  },
});

