import { useState, useEffect, useCallback } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [isReady, setIsReady] = useState(false)

    const login =  useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)
        const jsonTokenId = JSON.stringify({
            userId: id,
            token: jwtToken
        })
        AsyncStorage.setItem('userData', jsonTokenId)
    }, []) 

    const logout = () => {
        setToken(null)
        setUserId(null)
        AsyncStorage.removeItem('userData')
    }

    useEffect(() => {
        try {
            const jsonParseTokenId = AsyncStorage.getItem('userData')

            if(jsonParseTokenId != null) {
                JSON.parse(jsonParseTokenId)
                login(jsonParseTokenId.token, jsonParseTokenId.userId)
                setIsReady(true)
            }
            
        } catch (error) {
            console.log(error)
        }
    }, [])
    return { login, logout, token, userId, isReady }
}