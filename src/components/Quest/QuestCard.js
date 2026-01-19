import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function QuestCard({ quest }) {
  return (
    <View style={[styles.card, quest.completed && styles.cardCompleted]}>
      <View style={styles.header}>
        <Text style={[styles.title, quest.completed && styles.titleCompleted]}>
          {quest.title}
        </Text>
        {quest.completed && (
          <View style={styles.checkmark}>
            <Text style={styles.checkmarkText}>✓</Text>
          </View>
        )}
      </View>
      <Text style={styles.description}>{quest.description}</Text>
      <View style={styles.rewardSection}>
        <Text style={styles.rewardLabel}>Reward:</Text>
        <Text style={styles.rewardAmount}>{quest.reward} XP</Text>
      </View>
      {quest.type === 'daily' && (
        <View style={styles.badge}>
          <Text style={styles.badgeText}>Daily Quest</Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderWidth: 2,
    borderColor: '#e2e8f0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompleted: {
    backgroundColor: '#f0fdf4',
    borderColor: '#10b981',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    flex: 1,
  },
  titleCompleted: {
    color: '#059669',
  },
  checkmark: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkmarkText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 12,
  },
  rewardSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  rewardLabel: {
    fontSize: 14,
    color: '#64748b',
    marginRight: 8,
  },
  rewardAmount: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#6366f1',
  },
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: '#fef3c7',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    marginTop: 8,
  },
  badgeText: {
    fontSize: 12,
    color: '#92400e',
    fontWeight: '600',
  },
});

