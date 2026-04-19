import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/authcontext'
import type { ReactNode } from 'react'

interface Props {
    children: ReactNode
}

export function PrivateRoute({ children }: Props) {
    const { token } = useAuth()

    if (!token) {
        return <Navigate to="/login" />
    }

    return children
}