import { useState } from 'react';
import { Section } from '../types';

const useMutateTask = () => {
  const [sections, setSections] = useState<Section[]>([]);
  const [newSection, setNewSection] = useState('');
  const addSection = () => {
    if (!newSection.trim()) return;
    setSections([
      ...sections,
      { id: Date.now().toString(), title: newSection, tasks: [] },
    ]);
    setNewSection('');
  };

  const addTask = (sectionId: string, taskTitle: string) => {
    if (!taskTitle.trim()) return;
    setSections(
      sections.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              tasks: [
                ...sec.tasks,
                { id: Date.now().toString(), title: taskTitle },
              ],
            }
          : sec,
      ),
    );
  };

  const deleteTask = (sectionId: string, taskId: string) => {
    setSections(
      sections.map(sec =>
        sec.id === sectionId
          ? { ...sec, tasks: sec.tasks.filter(task => task.id !== taskId) }
          : sec,
      ),
    );
  };

  const editTask = (sectionId: string, taskId: string, newTitle: string) => {
    setSections(
      sections.map(sec =>
        sec.id === sectionId
          ? {
              ...sec,
              tasks: sec.tasks.map(task =>
                task.id === taskId ? { ...task, title: newTitle } : task,
              ),
            }
          : sec,
      ),
    );
  };

  return {
    sections,
    newSection,
    setNewSection,
    addSection,
    addTask,
    deleteTask,
    editTask,
  };
};
export default useMutateTask;
