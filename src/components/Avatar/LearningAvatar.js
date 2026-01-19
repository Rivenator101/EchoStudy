import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function LearningAvatar({ level, experience }) {
  const experienceNeeded = level * 100;
  const progress = (experience % experienceNeeded) / experienceNeeded;

  const getAvatarEmoji = (level) => {
    if (level < 5) return '🌱';
    if (level < 10) return '🌿';
    if (level < 15) return '🌳';
    if (level < 20) return '🌟';
    return '👑';
  };

  return (
    <View style={styles.container}>
      <Text style={styles.emoji}>{getAvatarEmoji(level)}</Text>
      <View style={styles.progressBar}>
        <View style={[styles.progressFill, { width: `${progress * 100}%` }]} />
      </View>
      <Text style={styles.experienceText}>
        {experience % experienceNeeded} / {experienceNeeded} XP
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  emoji: {
    fontSize: 80,
  },
  progressBar: {
    width: 200,
    height: 8,
    backgroundColor: '#e2e8f0',
    borderRadius: 4,
    marginTop: 12,
    overflow: 'hidden',
  },
  progressFill: {
    height: '100%',
    backgroundColor: '#6366f1',
  },
  experienceText: {
    fontSize: 14,
    color: '#64748b',
    marginTop: 4,
  },
});

