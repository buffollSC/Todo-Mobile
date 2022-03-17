import React from 'react';
import { Navigation }  from './navigation'
import { useAuth } from './hooks/useAuth';
import { AuthContext } from './context/AuthContext';
export default function App() {
    const { login, logout, token, userId } = useAuth()
    const isLogin = !!token
    const MainNavigation = Navigation(isLogin, logout)

    return (
        <AuthContext.Provider value={{ login, logout, token, userId }}>
          { MainNavigation }
        </AuthContext.Provider>
    );
}


