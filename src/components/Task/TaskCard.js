import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

export default function TaskCard({ task, onPress }) {
  const formatDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
  };

  return (
    <TouchableOpacity 
      style={[styles.card, task.completed && styles.cardCompleted]} 
      onPress={onPress}
      disabled={task.completed}
    >
      <View style={styles.content}>
        <Text style={[styles.title, task.completed && styles.titleCompleted]}>
          {task.title}
        </Text>
        {task.description && (
          <Text style={styles.description} numberOfLines={2}>
            {task.description}
          </Text>
        )}
        {task.dueDate && (
          <Text style={styles.dueDate}>
            Due: {formatDate(task.dueDate)}
          </Text>
        )}
      </View>
      {task.completed && (
        <View style={styles.completedBadge}>
          <Text style={styles.completedText}>✓</Text>
        </View>
      )}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    borderLeftWidth: 4,
    borderLeftColor: '#6366f1',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  cardCompleted: {
    opacity: 0.6,
    borderLeftColor: '#10b981',
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 4,
  },
  titleCompleted: {
    textDecorationLine: 'line-through',
    color: '#64748b',
  },
  description: {
    fontSize: 14,
    color: '#64748b',
    marginBottom: 8,
  },
  dueDate: {
    fontSize: 12,
    color: '#94a3b8',
  },
  completedBadge: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#10b981',
    alignItems: 'center',
    justifyContent: 'center',
  },
  completedText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

