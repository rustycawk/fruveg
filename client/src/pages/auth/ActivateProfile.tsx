import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import ActivateRequest from '../../types/auth/ActivateRequest'
import authService from '../../services/auth-service'

type Props = {}

const ActivateProfile = (props: Props) => {

    const { email, key } = useParams()
    const [loading, setLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>('')

    useEffect(() => {
        const activateRequest = new ActivateRequest(email as string, key as string)
        authService.activate(activateRequest).then((response: any) => {
            console.log(response)
            setError('')
            setLoading(false)
        }).catch((error: any) => {
            console.log(error)
            setError(error.message)
            setLoading(false)
        })
    }, [])


    return loading ? <></>
        : error !== '' ? <p>{error}</p> : <>
            <p>Активация прошла успешно</p>
            <Link to={'/'}>Перейти к магазину</Link>
        </>
}

export default ActivateProfile