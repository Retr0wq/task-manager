import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import api from '../services/api'

interface Task {
    id: number
    title: string
    done: number
}

export function Dashboard() {
    const [tasks, setTasks] = useState<Task[]>([])
    const [newTask, setNewTask] = useState('')

    const { userName, logout } = useAuth()
    const navigate = useNavigate()

    useEffect(() => {
        fetchTasks()
    }, [])

    async function fetchTasks() {
        const response = await api.get('/tasks')
        setTasks(response.data)
    }

    async function handleAdd() {
        if (!newTask.trim()) return
        await api.post('/tasks', { title: newTask })
        setNewTask('')
        fetchTasks()
    }

    async function handleToggle(task: Task) {
        await api.put(`/tasks/${task.id}`, {
            title: task.title,
            done: task.done ? 0 : 1
        })
        fetchTasks()
    }

    async function handleDelete(id: number) {
        await api.delete(`/tasks/${id}`)
        fetchTasks()
    }

    function handleLogout() {
        logout()
        navigate('/login')
    }

    return (
        <div className="min-h-screen p-8" style={{ backgroundColor: '#0a0a0a' }}>
            <div className="max-w-2xl mx-auto">

                <div className="flex justify-between items-center mb-8 border-b pb-4"
                     style={{ borderColor: '#006644' }}>
                    <div>
                        <h1 className="text-2xl font-bold glitch" style={{ color: '#00ff99' }}>
                            🖥️{/* <-- Emoji caso não apareça na IDE */}
                        </h1>
                        <p className="text-sm mt-1" style={{ color: '#006644' }}>
                            {'>'} usuario: {userName}
                        </p>
                    </div>
                    <button
                        onClick={handleLogout}
                        className="px-4 py-2 text-sm border"
                        style={{
                            color: '#ff0044',
                            borderColor: '#ff0044',
                            backgroundColor: 'transparent'
                        }}
                    >
                        [ LOGOUT ]
                    </button>
                </div>

                <div className="flex gap-2 mb-8">
                    <input
                        type="text"
                        placeholder="nova tarefa..."
                        value={newTask}
                        onChange={(e) => setNewTask(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleAdd()}
                        className="flex-1 p-3 outline-none border text-sm"
                        style={{
                            backgroundColor: '#0a0a0a',
                            color: '#00ff99',
                            borderColor: '#006644'
                        }}
                    />
                    <button
                        onClick={handleAdd}
                        className="px-4 py-2 font-bold text-sm border"
                        style={{
                            backgroundColor: '#00ff99',
                            color: '#0a0a0a',
                            borderColor: '#00ff99'
                        }}
                    >
                        [ + ]
                    </button>
                </div>

                <div className="flex flex-col gap-2">
                    {tasks.length === 0 && (
                        <p className="text-sm text-center py-8" style={{ color: '#006644' }}>
                            // NADA
                        </p>
                    )}

                    {tasks.map((task) => (
                        <div
                            key={task.id}
                            className="flex items-center justify-between p-4 border"
                            style={{
                                borderColor: task.done ? '#003322' : '#006644',
                                backgroundColor: '#0d0d0d'
                            }}
                        >

                            <div
                                className="flex items-center gap-3 cursor-pointer flex-1"
                                onClick={() => handleToggle(task)}
                            >
                <span style={{ color: task.done ? '#006644' : '#00ff99' }}>
                  {task.done ? '[✔]' : '[ ]'}
                </span>
                                <span
                                    className="text-sm"
                                    style={{
                                        color: task.done ? '#006644' : '#00ff99',
                                        textDecoration: task.done ? 'line-through' : 'none'
                                    }}
                                >
                  {task.title}
                </span>
                            </div>

                            <button
                                onClick={() => handleDelete(task.id)}
                                className="text-xs px-2 py-1 border ml-4"
                                style={{
                                    color: '#ff0044',
                                    borderColor: '#ff0044',
                                    backgroundColor: 'transparent'
                                }}
                            >
                                [ x ]
                            </button>
                        </div>
                    ))}
                </div>

                <div className="mt-8 text-center">
                    <p className="text-xs" style={{ color: '#003322' }}>
                        ᓚᘏᕐᐷ // {tasks.filter(t => t.done).length}/{tasks.length} CONCLUÍDAS
                    </p>
                </div>

            </div>
        </div>
    )
}