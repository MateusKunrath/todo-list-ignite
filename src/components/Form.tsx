import { ChangeEvent, FormEvent, InvalidEvent } from "react";
import { PlusCircle } from "phosphor-react";

import styles from './Form.module.css';

interface FormProps {
  onCreateNewTask: (event: FormEvent) => void;
  taskDescriptionValue: string;
  onNewTaskDescriptionChange: (event: ChangeEvent<HTMLInputElement>) => void;
  onNewTaskDescriptionInvalid: (event: InvalidEvent<HTMLInputElement>) => void;
}

export function Form({ onCreateNewTask, taskDescriptionValue, onNewTaskDescriptionChange, onNewTaskDescriptionInvalid }: FormProps) {
  return (
    <form onSubmit={onCreateNewTask} className={styles.form}>
      <input
        type="text"
        placeholder='Adicione uma nova tarefa'
        value={taskDescriptionValue}
        onChange={onNewTaskDescriptionChange}
        onInvalid={onNewTaskDescriptionInvalid}
        required
      />
      <button type="submit">
        Criar
        <PlusCircle size={16} />
      </button>
    </form>
  )
}
