import { useState } from 'react'
import api from '../api'
import { useNavigate } from 'react-router-dom'
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants'
import '../styles/Form.css'

function Form({route, method}) {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const name = method === 'register' ? 'Register' : 'Login'

    const handleSubmit = async (e) => {   
        setLoading(true)
        e.preventDefault()

        

        try {
            console.log("Username:", username)
            const response = await api.post(route, { username, password })
            console.log("Response Data:", response.data);
            console.log("Stored Token:", localStorage.getItem(ACCESS_TOKEN));
            if (method == 'login') {
                localStorage.setItem(ACCESS_TOKEN, response.data.access_token)
                localStorage.setItem(REFRESH_TOKEN, response.data.refresh_token)
                navigate('/')
            } else {
                navigate('/login')
            }
        }
        catch (error) {
            console.log("Error Response:", error.response); 
            alert(error)
        } finally { setLoading(false) }
    };

    return (<form onSubmit = {handleSubmit} className = "form-container">
        <h1> {name} </h1>
        <input
            className = "form-input"
            type = "text"
            value = {username}
            onChange = {(e) => setUsername(e.target.value)}
            placeholder = "Username"
        />

        <input
            className = "form-input"
            type = "password"
            value = {password}
            onChange = {(e) => setPassword(e.target.value)}
            placeholder = "Password"
        />

        <button className = "form-button" type = "submit">
            {name}
        </button>
    </form>);
}

export default Form