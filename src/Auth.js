import React, { useState } from 'react'

import LoginPage from './components/loginPage/Login'
import App from './App'

function Auth() {

    const [auth, setAuth] = useState(null)
    
    if(auth && (auth.role === 'king')) {
        return <App setUser={setAuth} user = {auth} />
    }

    return (
        <LoginPage user = {auth} setUser={setAuth}/> 
    )
}

export default Auth
