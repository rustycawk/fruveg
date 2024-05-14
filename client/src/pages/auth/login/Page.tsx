import React, { useState } from 'react'
import authService from '../../../services/auth-service'
import { Button, Container, Form, Spinner } from 'react-bootstrap'
import { AxiosError } from 'axios'
import { ERROR_MESSAGES } from '../../../error.messages'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { useStores } from '../../../store/MobXProvider'
import { observer } from 'mobx-react'
import APP_CONFIG from '../../../app.config'


type Props = {}

const Page = (props: Props) => {

  const {source} = useParams()

  const navigator = useNavigate()

  const { authStore } = useStores()

  const [email, setEmail] = useState<string>('')
  const [password, setPassword] = useState<string>('')

  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    authService.login({ email, password }).then((response) => {
      if(response.status === 200) {
        authStore.setAuth(true)
        authStore.setUser(response.data)
      }
      setError('')
      setLoading(false)
      navigator(source ? `/${source}` : '/')
    }).catch((error: AxiosError) => {
      setLoading(false)
      setError(ERROR_MESSAGES[(error.response?.data as any).message] ?? 'Что-то пошло не так')
    })
  }

  return (
    <Container className="auth-layout">
      <Form onSubmit={handleForm} className='auth-form shadow'>

        <h2 className='fw-bolder'>Вход</h2>
        <p>Еще нет аккаунта? <Link to="/auth/registration" className='text-decoration-underline'>Зарегистрироваться</Link></p>
        <Form.Group className='mb-3'>
          <Form.Label>Ваша почта</Form.Label>
          <Form.Control type="email"
            value={email} onChange={(e) => setEmail(e.target.value)}
            placeholder='example@example.com'
          />
        </Form.Group>

        <Form.Group className='mb-3'>
          <Form.Label>Пароль</Form.Label>
          <Form.Control type="password"
            value={password} onChange={(e) => setPassword(e.target.value)}
            placeholder='ваш пароль'
          />
        </Form.Group>

        <Link to="/auth/reset" className='text-decoration-underline'>Забыли пароль?</Link>
        <br /><br />

        {
          error && <p className='text-danger'>{error}</p>
        }

        {
          loading ? <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner> : <Button type='submit'>Войти</Button>
        }

      </Form>
    </Container>
  )
}

export default observer(Page)