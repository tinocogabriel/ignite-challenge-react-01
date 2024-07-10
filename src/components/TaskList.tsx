import { CheckCircle, Circle, Trash } from '@phosphor-icons/react'
import { TaskProps } from '../App'
import styles from './TaskList.module.css'

interface TaskListProps {
  data: TaskProps[]
  toggleTask: (id: string) => void
  deleteTask: (id: string) => void
}
export function TaskList({ data, toggleTask, deleteTask }: TaskListProps) {
  return (
    <div className={styles.taskList}>
      {data.map((item) => {
        return (
          <div className={styles.taskItem} key={item.id}>
            <label htmlFor="checkInput" onClick={() => toggleTask(item.id)}>
              <input
                type="checkbox"
                readOnly
                name="checkInput"
                checked={item.isCheck}
              />
              {item.isCheck ? (
                <CheckCircle
                  className={styles.checked}
                  weight="fill"
                  size={20}
                />
              ) : (
                <Circle className={styles.unchecked} size={20} />
              )}
            </label>
            <span>{item.content}</span>
            <a href="#" onClick={() => deleteTask(item.id)}>
              <Trash size={20} />
            </a>
          </div>
        )
      })}
    </div>
  )
}
