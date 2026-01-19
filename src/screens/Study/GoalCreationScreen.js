import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ScrollView, Alert } from 'react-native';
import { useStudy } from '../../context/StudyContext';
import { generateStudyPlan } from '../../services/openaiService';
import { useAuth } from '../../context/AuthContext';

export default function GoalCreationScreen({ navigation }) {
  const [goalTitle, setGoalTitle] = useState('');
  const [description, setDescription] = useState('');
  const [targetDate, setTargetDate] = useState('');
  const [loading, setLoading] = useState(false);
  const { addGoal, addTask } = useStudy();
  const { userProfile } = useAuth();

  const handleCreateGoal = async () => {
    if (!goalTitle.trim()) {
      Alert.alert('Error', 'Please enter a goal title');
      return;
    }

    setLoading(true);
    try {
      const goalData = {
        title: goalTitle,
        description,
        targetDate: targetDate || null,
      };

      const newGoal = await addGoal(goalData);

      // Generate study plan using OpenAI
      try {
        const studyPlan = await generateStudyPlan([goalTitle], userProfile);
        
        // Parse study plan and create tasks (simplified - in production, you'd parse the AI response better)
        const tasks = parseStudyPlanToTasks(studyPlan, newGoal.id);
        
        for (const task of tasks) {
          await addTask(task);
        }
      } catch (error) {
        console.error('Error generating study plan:', error);
        // Create a default task if AI fails
        await addTask({
          title: `Work on: ${goalTitle}`,
          description: description,
          goalId: newGoal.id,
          dueDate: targetDate || null,
        });
      }

      Alert.alert('Success', 'Goal created successfully!', [
        { text: 'OK', onPress: () => navigation.goBack() }
      ]);
    } catch (error) {
      Alert.alert('Error', 'Failed to create goal: ' + error.message);
    } finally {
      setLoading(false);
    }
  };

  const parseStudyPlanToTasks = (studyPlan, goalId) => {
    // Simple parsing - in production, use better NLP or structured AI responses
    const lines = studyPlan.split('\n').filter(line => line.trim());
    const tasks = [];
    
    lines.slice(0, 5).forEach((line, index) => {
      if (line.match(/^\d+\./)) {
        tasks.push({
          title: line.replace(/^\d+\.\s*/, '').trim(),
          description: `Task ${index + 1} for your goal`,
          goalId,
          dueDate: null,
        });
      }
    });

    return tasks.length > 0 ? tasks : [{
      title: `Start working on: ${goalTitle}`,
      description: description,
      goalId,
      dueDate: null,
    }];
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.form}>
        <Text style={styles.label}>Goal Title *</Text>
        <TextInput
          style={styles.input}
          placeholder="e.g., Master Calculus"
          value={goalTitle}
          onChangeText={setGoalTitle}
        />

        <Text style={styles.label}>Description</Text>
        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Describe your goal..."
          value={description}
          onChangeText={setDescription}
          multiline
          numberOfLines={4}
        />

        <Text style={styles.label}>Target Date (Optional)</Text>
        <TextInput
          style={styles.input}
          placeholder="YYYY-MM-DD"
          value={targetDate}
          onChangeText={setTargetDate}
        />

        <TouchableOpacity
          style={[styles.button, loading && styles.buttonDisabled]}
          onPress={handleCreateGoal}
          disabled={loading}
        >
          <Text style={styles.buttonText}>
            {loading ? 'Creating...' : 'Create Goal & Generate Study Plan'}
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  form: {
    padding: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1e293b',
    marginBottom: 8,
    marginTop: 16,
  },
  input: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    borderWidth: 1,
    borderColor: '#e2e8f0',
    fontSize: 16,
    marginBottom: 8,
  },
  textArea: {
    height: 120,
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#6366f1',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    marginTop: 24,
  },
  buttonDisabled: {
    opacity: 0.6,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
});

