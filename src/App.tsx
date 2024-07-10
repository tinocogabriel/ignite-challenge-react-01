import { PlusCircle } from '@phosphor-icons/react'
import styles from './App.module.css'
import ImgLogo from './assets/logo-todo.png'

import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react'
import { Empty } from './components/Empty'
import { TaskList } from './components/TaskList'

export interface TaskProps {
  isCheck: boolean
  content: string
  id: string
}

function App() {
  const [task, setTask] = useState('')
  const [taskList, setTaskList] = useState<TaskProps[]>([])

  function checkCompletedTasks() {
    const count = taskList.reduce((acc, current) => {
      if (current.isCheck) {
        return acc + 1
      }
      return acc
    }, 0)

    return `${count} de ${taskList.length}`
  }

  function handleNewTask(event: FormEvent) {
    event.preventDefault()

    const newTask: TaskProps = {
      isCheck: false,
      content: task,
      id: crypto.randomUUID(),
    }

    setTaskList([...taskList, newTask])

    setTask('')
  }

  function handleNewTaskChange(event: ChangeEvent<HTMLInputElement>) {
    event.target.setCustomValidity('')
    setTask(event.target.value)
  }

  function handleNewTaskInvalid(event: InvalidEvent<HTMLInputElement>) {
    event.target.setCustomValidity('Esse campo é obrigatório!')
  }

  function handleToggleTask(id: string) {
    const updated = taskList.map((item) => {
      if (item.id === id) {
        item.isCheck = !item.isCheck
      }
      return item
    })
    setTaskList(updated)
  }
  function handleDeleteTask(id: string) {
    const newList = taskList.filter((item) => {
      return item.id !== id
    })
    setTaskList(newList)
  }

  return (
    <>
      <header className={styles.header}>
        <img src={ImgLogo} alt="ToDo Logo" />
      </header>
      <main className={styles.content}>
        <form className={styles.form} onSubmit={handleNewTask}>
          <input
            placeholder="Adicione uma nova tarefa"
            onChange={handleNewTaskChange}
            onInvalid={handleNewTaskInvalid}
            required
            value={task}
          />
          <button type="submit">
            <strong>Criar</strong> <PlusCircle size={16} />{' '}
          </button>
        </form>

        <article className={styles.tasks}>
          <div className={styles.info}>
            <div className={styles.createdTasks}>
              <strong>Tarefas Criadas</strong>
              <div className={styles.createdTasksCount}>
                <span>{taskList.length}</span>
              </div>
            </div>
            <div className={styles.completedTasks}>
              <strong>Concluídas</strong>
              <div className={styles.completedTasksCount}>
                {taskList.length === 0 ? (
                  <span>0</span>
                ) : (
                  <span>{checkCompletedTasks()}</span>
                )}
              </div>
            </div>
          </div>
          {taskList.length === 0 ? (
            <Empty />
          ) : (
            <TaskList
              data={taskList}
              deleteTask={handleDeleteTask}
              toggleTask={handleToggleTask}
            />
          )}
        </article>
      </main>
    </>
  )
}

export default App
