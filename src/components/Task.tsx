import { Circle, Trash, CheckCircle } from 'phosphor-react';

import styles from './Task.module.css';

interface Task {
  id: string;
  description: string;
  completed: boolean;
}

interface TaskProps {
  onToggleStatusTask: (taskId: string) => void;
  onDeleteTask: (taskId: string) => void;
  task: Task;
}

export function Task({ onToggleStatusTask, onDeleteTask, task }: TaskProps) {

  return (
    <div className={styles.task}>
      {task.completed ? (
        <CheckCircle onClick={() => onToggleStatusTask(task.id)} className={styles.checked} weight="fill" size={20} />
      ) : (
        <Circle onClick={() => onToggleStatusTask(task.id)} className={styles.uncheck} size={20} />
      )}

      <span className={task.completed ? styles.taskChecked : ''}>
        {task.description}
      </span>

      <button className={styles.buttonDelete} onClick={() => onDeleteTask(task.id)}>
        <Trash size={16} />
      </button>
    </div>
  );
}
