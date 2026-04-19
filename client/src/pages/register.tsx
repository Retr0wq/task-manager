import { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import api from '../services/api'

export function Register() {
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [success, setSuccess] = useState('')

    const navigate = useNavigate()

    async function handleSubmit() {
        try {
            await api.post('/auth/register', { name, email, password })
            setSuccess('Redirecionando...')
            setTimeout(() => navigate('/login'), 2000)
        } catch {
            setError('ERRO')
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center"
             style={{ backgroundColor: '#0a0a0a' }}>
            <div className="p-8 rounded border w-full max-w-md"
                 style={{ backgroundColor: '#0d0d0d', borderColor: '#00ff99' }}>

                <h1 className="text-2xl font-bold mb-6 glitch"
                    style={{ color: '#00ff99' }}>
                    Cadastrar ᓚᘏᗢ
                </h1>

                {error && (
                    <p className="mb-4 text-sm" style={{ color: '#ff0044' }}>{error}</p>
                )}

                {success && (
                    <p className="mb-4 text-sm" style={{ color: '#00ff99' }}>{success}</p>
                )}

                <input
                    type="text"
                    placeholder="Nome"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="w-full p-3 rounded mb-3 outline-none border"
                    style={{
                        backgroundColor: '#0a0a0a',
                        color: '#00ff99',
                        borderColor: '#006644'
                    }}
                />

                <input
                    type="email"
                    placeholder="E-mail"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full p-3 rounded mb-3 outline-none border"
                    style={{
                        backgroundColor: '#0a0a0a',
                        color: '#00ff99',
                        borderColor: '#006644'
                    }}
                />

                <input
                    type="password"
                    placeholder="Senha"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full p-3 rounded mb-6 outline-none border"
                    style={{
                        backgroundColor: '#0a0a0a',
                        color: '#00ff99',
                        borderColor: '#006644'
                    }}
                />

                <button
                    onClick={handleSubmit}
                    className="w-full p-3 font-bold rounded border"
                    style={{
                        backgroundColor: '#00ff99',
                        color: '#0a0a0a',
                        borderColor: '#00ff99'
                    }}
                >
                    Cadastrar
                </button>

                <p className="text-center mt-4 text-sm" style={{ color: '#006644' }}>
                    Já tem? →{' '}
                    <Link to="/login" style={{ color: '#00ff99' }}>
                        ;)
                    </Link>
                </p>
            </div>
        </div>
    )
}