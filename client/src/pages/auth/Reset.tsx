import React, { useState } from 'react'
import { Button, Container, Form } from 'react-bootstrap'
import authService from '../../services/auth-service'

type Props = {}

const Reset = (props: Props) => {

  const [email, setEmail] = useState<string>('')
  const [loading, setLoading] = useState<boolean>(false)
  const [message, setMessage] = useState<string>('')

  const handleForm = (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    authService.resetPassword(email).then((response) => {
      setLoading(false)
      setMessage("Письмо для сброса пароля было отправлено на Вашу почту")
    })
  }

  return (
    <Container className='auth-layout'>
      <div className='auth-form'>
        <h2 className='fw-bold'>Сброс пароля</h2>
        {
          message !== '' ? <p>{message}</p> : <>
            <Form onSubmit={handleForm}>
              <Form.Group className='mb-4'>
                <Form.Label>Ваша почта</Form.Label>
                <Form.Control type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
              </Form.Group>
              <Button type='submit'>Отправить</Button>
            </Form>
          </>
        }
      </div>
    </Container>
  )
}

export default Reset