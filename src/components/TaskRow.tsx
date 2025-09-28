import { useState } from 'react';
import { Task } from '../types';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { iconType } from '../../assets/images';

export const TaskRow = ({
  task,
  sectionId,
  onEdit,
  onDelete,
  onReminder,
}: {
  task: Task;
  sectionId: string;
  onEdit: (sectionId: string, taskId: string, newTitle: string) => void;
  onDelete: (sectionId: string, taskId: string) => void;
  onReminder: (title: string) => void;
}) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(task.title);

  return (
    <View style={styles.taskRow}>
      {isEditing ? (
        <>
          <TextInput
            style={[styles.input, { flex: 1 }]}
            value={text}
            onChangeText={setText}
          />
          <TouchableOpacity
            onPress={() => {
              onEdit(sectionId, task.id, text);
              setIsEditing(false);
            }}
          >
            <Text style={styles.actionBtn}>✅</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              setText(task.title);
              setIsEditing(false);
            }}
          >
            <Image
              source={iconType.Delete}
              style={{
                width: 20,
                height: 20,
              }}
            />
          </TouchableOpacity>
        </>
      ) : (
        <>
          <Text style={styles.taskText}>{task.title}</Text>
          <View style={styles.taskActions}>
            <TouchableOpacity
              onPress={() => onReminder(task.title)}
            >
              <Text style={styles.actionBtn}>⏰</Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.item}
              onPress={() => setIsEditing(true)}
            >
              {/* <Text style={styles.actionBtn}>✏️</Text> */}
              <Image
                source={iconType.Edit}
                style={{
                  width: 20,
                  height: 20,
                }}
              />
            </TouchableOpacity>
            <TouchableOpacity
              onPress={() => onDelete(sectionId, task.id)}
              style={styles.item}
            >
              <Image
                source={iconType.Cancel}
                style={{
                  width: 18,
                  height: 18,
                }}
              />
            </TouchableOpacity>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: '#fff' },
  header: { fontSize: 22, fontWeight: 'bold', marginBottom: 10 },
  row: { flexDirection: 'row', marginBottom: 10, alignItems: 'center' },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 8,
    marginRight: 10,
    borderRadius: 6,
  },
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
  taskActions: { flexDirection: 'row', alignItems: 'center' },
  item: { marginHorizontal: 5 },
  actionBtn: { marginHorizontal: 5, fontSize: 18 },
});
