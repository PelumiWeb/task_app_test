import { Button, StyleSheet, Text, TextInput, View } from 'react-native';
import React, { useState } from 'react';

const TaskInput = ({ onAdd }: { onAdd: (title: string) => void }) => {
  const [task, setTask] = useState('');
  return (
    <View style={styles.row}>
      <TextInput
        style={styles.input}
        value={task}
        placeholder="New Task..."
        onChangeText={setTask}
      />
      <Button
        title="+"
        onPress={() => {
          onAdd(task);
          setTask('');
        }}
      />
    </View>
  );
};

export default TaskInput;

const styles = StyleSheet.create({
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
