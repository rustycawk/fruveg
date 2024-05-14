import React, { useState } from 'react'
import RegisterRequest from '../../../types/auth/RegisterRequest'
import { Button, Container, Form } from 'react-bootstrap'
import authService from '../../../services/auth-service'
import { Link, useNavigate } from 'react-router-dom'

type Props = {}

const Page = (props: Props) => {

  const navigator = useNavigate()

  const [fomrValues, setFormValues] = useState<RegisterRequest>(new RegisterRequest())
  const [confirmPassword, setConfirmPassword] = useState<string>('')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault()
    authService.register(fomrValues).then((response) => {
      console.log(response)
      navigator('/auth/login')
    }).catch((e) => console.log(e))
  }

  const [error, setError] = useState<string>('')

  const [loading, setLoading] = useState<boolean>(false)

  return <Container className="auth-layout">
    <Form onSubmit={handleForm} className='auth-form shadow'>
      <h2>Регистрация</h2>
      <p>Уже есть аккаунт? <Link to="/auth/login">Войти</Link></p>
      <Form.Group className='mb-3'>
        <Form.Label>Ваша почта</Form.Label>
        <Form.Control type="email"
          value={fomrValues.email} onChange={(e) => setFormValues((prev) => ({
            ...prev,
            email: e.target.value
          }))}
          placeholder='example@example.com'
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Ваш телефон</Form.Label>
        <Form.Control type="text"
          value={fomrValues.phone} onChange={(e) => setFormValues((prev) => ({
            ...prev,
            phone: e.target.value
          }))}
          placeholder='+7 '
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Имя</Form.Label>
        <Form.Control type="text"
          value={fomrValues.name} onChange={(e) => setFormValues((prev) => ({
            ...prev,
            name: e.target.value
          }))}
          placeholder=''
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Фамилия</Form.Label>
        <Form.Control type="text"
          value={fomrValues.lastName} onChange={(e) => setFormValues((prev) => ({
            ...prev,
            lastName: e.target.value
          }))}
          placeholder=''
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Пароль</Form.Label>
        <Form.Control type="password"
          value={fomrValues.password} onChange={(e) => setFormValues((prev) => ({
            ...prev,
            password: e.target.value
          }))}
          placeholder='придумайте пароль'
        />
      </Form.Group>

      <Form.Group className='mb-3'>
        <Form.Label>Подтверждение пароля</Form.Label>
        <Form.Control type="password"
          value={confirmPassword} onChange={(e) => {
            setConfirmPassword(e.target.value)
            if (e.target.value !== fomrValues.password) {
              setError('Пароли не совпадают')
            } else {
              setError('')
            }
          }}
          placeholder='повторите пароль'
        />
      </Form.Group>

      {error !== '' && <p className='text-danger'>{error}</p>}

      <Button type='submit'>Зарегистрироваться</Button>
    </Form>
  </Container>
}

export default Page