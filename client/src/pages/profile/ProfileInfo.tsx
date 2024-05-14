import React, { useState } from 'react'
import { IProfile } from '../../types/profile/IProfile'
import { Button, Form } from 'react-bootstrap'
import ReactInputMask from 'react-input-mask'
import { ProfileUpdate } from '../../types/profile/ProfileUpdate'
import profileService from '../../services/profile-service'

type Props = {
    profile: IProfile
    update: () => void
}

function ProfileInfo(props: Props) {
    const [formValues, setFormValues] = useState<ProfileUpdate>(new ProfileUpdate(props.profile))
    const [error, setError] = useState<string>('')
    const [message, setMessage] = useState<string>('')
    const handleForm = (e: React.FormEvent) => {
        setError('')
        setMessage('')
        e.preventDefault()
        profileService.updateProfile(formValues).then(res => {
            props.update()
            setMessage('Данные успешно сохранены')
        }).catch(e => {
            setError('Произошла ошибка при сохранении данных')
        })
    }
    return (
        <div className='card card-body border-0'>
            <Form onSubmit={handleForm}>
                <h4>Изменение основных данных пользователя</h4>
                <div className="row">
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Имя</Form.Label>
                            <Form.Control type="text" placeholder="Имя"
                                value={formValues.name} onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        name: e.target.value
                                    }))
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Фамилия</Form.Label>
                            <Form.Control type="text" placeholder="Фамилия"
                                value={formValues.lastName} onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        lastName: e.target.value
                                    }))
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Почта</Form.Label>
                            <Form.Control type="text" placeholder="Почта"
                                value={formValues.email} onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        email: e.target.value
                                    }))
                                }}
                            />
                        </Form.Group>
                    </div>
                    <div className="col-md-6">
                        <Form.Group className="mb-3">
                            <Form.Label>Телефон</Form.Label>
                            <Form.Control type="text" placeholder="Телефон"
                                as={ReactInputMask}
                                mask={'+7 (999) 999-99-99'}
                                value={formValues.phone} onChange={(e) => {
                                    setFormValues((prev) => ({
                                        ...prev,
                                        phone: e.target.value
                                    }))
                                }}
                            />
                        </Form.Group>
                    </div>

                    
                </div>

                {error !== '' && <p className='text-danger'>{error}</p>}
                {message !== '' && <p className='text-success'>{error}</p>}

                <Button type="submit">Сохранить изменения</Button>
            </Form>
        </div>
    )
}

export default ProfileInfo