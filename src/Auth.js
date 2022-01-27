import React, { useState } from 'react'

import LoginPage from './components/loginPage/Login'
import App from './App'

function Auth() {

    const [user, setUser] = useState(null)
    
    if(user && (user.role === 'king')) {
        return <App setUser={setUser} user = {user} />
    }

    return (
        <LoginPage user = {user} setUser={setUser}/> 
    )
}

export default Auth
