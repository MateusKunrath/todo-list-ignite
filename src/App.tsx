import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import uuid from 'react-uuid';

import { Header } from './components/Header';
import { Task } from './components/Task';
import { Form } from './components/Form';

import './global.css';
import styles from './App.module.css';
import { EmptyTasks } from './components/EmptyTasks';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

export function App() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [newTaskDescription, setNewTaskDescription] = useState<string>('');

  const completedTasks = tasks.filter(task => task.completed === true);

  function handleCreateNewTask(event: FormEvent) {
    event.preventDefault();

    setTasks([...tasks, createNewTaskFromDescription()]);
    setNewTaskDescription('');
  }

  function createNewTaskFromDescription(): Task {
    const newTask = {
      id: uuid(),
      description: newTaskDescription,
      completed: false,
    }
    return newTask;
  }

  function handleNewTaskDescriptionChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('');
    setNewTaskDescription(event.target.value);
  }

  function handleNewTaskDescriptionInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório');
  }

  function handleToggleStatusTask(taskId: string) {
    const tasksWithUpdates = tasks.map((task) => {
      if (task.id === taskId) {
        task.completed = !task.completed;
      }
      return task;
    });
    setTasks(tasksWithUpdates);
  }

  function deleteTask(taskId: string) {
    const tasksWithoutDeletedOne = tasks.filter(task => task.id !== taskId);
    setTasks(tasksWithoutDeletedOne);
  }

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Form
          onCreateNewTask={handleCreateNewTask}
          taskDescriptionValue={newTaskDescription}
          onNewTaskDescriptionChange={handleNewTaskDescriptionChange}
          onNewTaskDescriptionInvalid={handleNewTaskDescriptionInvalid}
        />

        <div className={styles.tasksInfo}>
          <div className={styles.createdTasks}>
            Tarefas criadas<span>{tasks.length}</span>
          </div>
          <div className={styles.completedTasks}>
            Concluídas<span>{completedTasks.length === 0 ? completedTasks.length : `${completedTasks.length} de ${tasks.length}`}</span>
          </div>
        </div>

        <div className={styles.content}>
          {tasks.length === 0 ? (
            <EmptyTasks />
          ) : (
            tasks.map(task => {
              return (
                <Task
                  key={task.id}
                  task={task}
                  onToggleStatusTask={handleToggleStatusTask}
                  onDeleteTask={deleteTask}
                />
              )
            })
          )}
        </div>
      </div>
    </div>
  )
}
