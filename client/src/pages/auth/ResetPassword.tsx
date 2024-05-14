import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ResetPasswordRequest from '../../types/auth/ResetPasswordRequest'
import authService from '../../services/auth-service'
import { Button, Container, Form } from 'react-bootstrap'

type Props = {}

const ResetPassword = (props: Props) => {

    const { key } = useParams()
    const [resetPasswordRequest, setResetPasswordRequest] = useState<ResetPasswordRequest>(new ResetPasswordRequest(key as string))
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')

    const hanldeForm = (e: React.FormEvent) => {
        e.preventDefault()
        authService.resetPasswordPost(resetPasswordRequest).then((response) => {
            setError('')
            setMessage('Ваш пароль успешно изменен')
        }).catch((error: any) => {
            setError('Что-то пошло не так')
            console.log(error)
        })
    }

    return <>
        <Container className='auth-layout'>
        <form onSubmit={hanldeForm} className='auth-form'>
            <h2 className='fw-bold'>Сброс пароля</h2>
            {
                message !== '' ? <>
                <p>{message}</p>
                <Link to="/auth/login" className='btn btn-primary'>Перейти ко входу</Link>
                </> : <>
                <Form.Group className='mb-4'>
                <Form.Label>Новый пароль</Form.Label>
                <Form.Control type="password" value={resetPasswordRequest.newPassword} onChange={(e) => setResetPasswordRequest((prev) => ({
                    ...prev,
                    newPassword: e.target.value
                }))}
                />
            </Form.Group>

            <Button type='submit'>Сохранить новый пароль</Button>
            </>
            }
        </form>
        </Container>
    </>
}

export default ResetPassword