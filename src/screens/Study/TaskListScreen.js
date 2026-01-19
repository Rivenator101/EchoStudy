import React from 'react';
import { View, Text, ScrollView, TouchableOpacity, StyleSheet, FlatList } from 'react-native';
import { useStudy } from '../../context/StudyContext';
import TaskCard from '../../components/Task/TaskCard';

export default function TaskListScreen({ navigation }) {
  const { tasks, goals } = useStudy();
  const activeTasks = tasks.filter(t => !t.completed);
  const completedTasks = tasks.filter(t => t.completed);

  const renderTask = ({ item }) => (
    <TaskCard
      task={item}
      onPress={() => navigation.navigate('FocusSession', { taskId: item.id })}
    />
  );

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>My Study Tasks</Text>
        <TouchableOpacity
          style={styles.addButton}
          onPress={() => navigation.navigate('GoalCreation')}
        >
          <Text style={styles.addButtonText}>+ New Goal</Text>
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {activeTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Active Tasks ({activeTasks.length})</Text>
            <FlatList
              data={activeTasks}
              renderItem={renderTask}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {completedTasks.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Completed ({completedTasks.length})</Text>
            <FlatList
              data={completedTasks}
              renderItem={renderTask}
              keyExtractor={item => item.id}
              scrollEnabled={false}
            />
          </View>
        )}

        {tasks.length === 0 && (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No tasks yet!</Text>
            <Text style={styles.emptySubtext}>Create a goal to get started</Text>
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
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#e2e8f0',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1e293b',
  },
  addButton: {
    backgroundColor: '#6366f1',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '600',
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
    marginBottom: 8,
  },
  emptySubtext: {
    fontSize: 16,
    color: '#94a3b8',
  },
});

