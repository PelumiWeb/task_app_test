/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import { NewAppScreen } from '@react-native/new-app-screen';
import {
  Button,
  FlatList,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  useColorScheme,
  View,
} from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import TaskInput from './src/components/TaskInput';
import { useState } from 'react';
import { Section, Task } from './src/types';
import { TaskRow } from './src/components/TaskRow';
import { useDisplayNotification } from './src/hooks/useDisplayNotification';
import useMutateTask from './src/hooks/useMutateTask';

function App() {
  const isDarkMode = useColorScheme() === 'dark';

  return (
    <SafeAreaProvider>
      <StatusBar barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
      <AppContent />
    </SafeAreaProvider>
  );
}

function AppContent() {
  // const [sections, setSections] = useState<Section[]>([]);
  // const [newSection, setNewSection] = useState('');
  const { onDisplayNotification } = useDisplayNotification();
  const {
    sections,
    newSection,
    setNewSection,
    addSection,
    addTask,
    deleteTask,
    editTask,
  } = useMutateTask();

  const scheduleNotification = async (taskTitle: string) => {
    onDisplayNotification('Task reminder', `Don't forget: ${taskTitle}`);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.header}>To-Do List</Text>

      <View style={styles.row}>
        <TextInput
          style={styles.input}
          value={newSection}
          placeholder="New Section (e.g., Work)"
          onChangeText={setNewSection}
        />
        <Button title="Add" onPress={addSection} />
      </View>

      <FlatList
        data={sections}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>

            <TaskInput onAdd={title => addTask(item.id, title)} />

            {item.tasks.map(task => (
              <TaskRow
                key={task.id}
                task={task}
                sectionId={item.id}
                onEdit={editTask}
                onDelete={deleteTask}
                onReminder={scheduleNotification}
              />
            ))}
          </View>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },

  section: {
    marginBottom: 20,
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderRadius: 8,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', marginBottom: 5 },
  taskRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 5,
  },
  taskText: { fontSize: 16 },
  taskActions: { flexDirection: 'row' },
  actionBtn: { marginHorizontal: 5, fontSize: 18 },
  row: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
  },
});

export default App;
