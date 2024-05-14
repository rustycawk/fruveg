import React, { useState } from 'react'
import { IProfile } from '../../types/profile/IProfile'
import { Button, Form } from 'react-bootstrap'
import { ProfileUpdatePassword } from '../../types/profile/ProfileUpdatePassword'
import profileService from '../../services/profile-service'

type Props = {
}

const ChangePassword = (props: Props) => {

    const [formValues, setFormValues] = useState<ProfileUpdatePassword>(new ProfileUpdatePassword())
    const [confirmPassword, setConfirmPassword] = useState<string>('')
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const handleForm = (e: React.FormEvent) => {
        e.preventDefault()
        setError('')
        setMessage('')
        if (formValues.newPassword !== confirmPassword) {
            setError('Пароли не совпадают')
        } else {
            profileService.updatePassword(formValues).then(res => {
                setMessage('Пароль успешно изменен')
            }).catch((e: any) => {
                if (e.response.status === 401) {
                    setError('Текущий пароль не верен')
                }
            })
        }
    }

    return (
        <div className='card card-body border-0' style={{ maxWidth: 500 }}>
            <Form onSubmit={handleForm}>
                <h4>Смена пароля</h4>
                <Form.Group className="mb-3">
                    <Form.Label>Текущий пароль</Form.Label>
                    <Form.Control type="password" placeholder=""
                        value={formValues.password} onChange={(e) => setFormValues((prev) => ({ ...prev, password: e.target.value }))}
                    />
                </Form.Group>
                <div className="d-flex mb-3" style={{ gap: 30 }}>
                    <Form.Group className='flex-grow-1'>
                        <Form.Label>Новый пароль</Form.Label>
                        <Form.Control type="password" placeholder=""
                            value={formValues.newPassword} onChange={(e) => setFormValues((prev) => ({ ...prev, newPassword: e.target.value }))}
                        />
                    </Form.Group>
                    <Form.Group>
                        <Form.Label>Повторите пароль</Form.Label>
                        <Form.Control type="password" placeholder=""
                            value={confirmPassword} onChange={(e) => {
                                setConfirmPassword(e.target.value)
                                if (e.target.value !== formValues.newPassword) {
                                    setError('Пароли не совпадают')
                                } else {
                                    setError('')
                                }
                            }}
                        />
                    </Form.Group>
                </div>
                {error !== '' && <p className='text-danger'>{error}</p>}
                {message !== '' && <p className='text-success'>{error}</p>}

                <Button type='submit'>Изменить пароль</Button>
            </Form>
        </div>
    )
}

export default ChangePassword