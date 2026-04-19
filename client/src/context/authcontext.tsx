import { createContext, useContext, useState } from "react"
import type { ReactNode } from "react"

interface AuthContextType {
    token: string | null
    userName: string | null
    login: (token: string, name: string) => void
    logout: () => void
}

const AuthContext = createContext<AuthContextType>({} as AuthContextType)

export function AuthProvider({ children }: { children: ReactNode }) {
    const [token, setToken] = useState<string | null>(
        localStorage.getItem("token")
    )
    const [userName, setUserName] = useState<string | null>(
        localStorage.getItem("userName")
    )

    function login(token: string, name: string) {
        setToken(token)
        setUserName(name)
        localStorage.setItem("token", token)
        localStorage.setItem("userName", name)
    }

    function logout() {
        setToken(null)
        setUserName(null)
        localStorage.removeItem("token")
        localStorage.removeItem("userName")
    }

    return (
        <AuthContext.Provider value={{ token, userName, login, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    return useContext(AuthContext)
}