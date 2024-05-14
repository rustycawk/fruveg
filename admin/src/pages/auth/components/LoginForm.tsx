import React, { useState } from 'react'
import { Alert, Button, Form } from 'react-bootstrap'
import authService from '../../../services/auth-service'
import { useStores } from '../../../store/MobXProvider'
import { ERROR_MESSAGES } from '../../../error.messages'

type Props = {}

const LoginForm = (props: Props) => {

    const [email, setEmail] = useState<string>('')
    const [password, setPassword] = useState<string>('')
    const [error, setError] = useState<string | null>(null)
    const { authStore } = useStores();

    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        authService.login({ email, password }).then((response) => {
            authStore.setAuth(true)
            authStore.setUser(response.data)
            setError(null)
        }).catch((e) => {
            authStore.setAuth(false)
            setError(ERROR_MESSAGES[e.response.data.message])
        })
    }

    return (
        <Form onSubmit={handleForm}>
            <Form.Group className='mb-3'>
                <Form.Label>Эл. почта</Form.Label>
                <Form.Control type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
            </Form.Group>

            <Form.Group className='mb-3'>
                <Form.Label>Пароль</Form.Label>
                <Form.Control type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
            </Form.Group>

            {
                error && <Alert variant='danger'>{error}</Alert>
            }

            <Button type='submit'>Войти</Button>
        </Form>
    )
}

export default LoginForm