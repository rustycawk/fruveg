import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import cityService from '../../services/city-service'
import { ICity } from '../../types/cities/ICity'
import AppendDistrict from './components/appendDistrict/Index'

type Props = {}

const DistrictsPage = (props: Props) => {
    const { id } = useParams()
    const [city, setCity] = useState<ICity | null>(null)
    const [error, setError] = useState<string | null>(null)
    const update = () => {
        setError(null)
        cityService.findOne(Number(id)).then((response) => {
            setCity(response.data)
        }).catch((error) => {
            setError("Ошибка при получении данныз")
            console.log(error)
        })
    }
    return (
        <>
            {
                city && <>
                    <h3 className='mb-4'>Районы для города {city.name}</h3>
                    <AppendDistrict cityId={city.id} update={update} />
                </>
            }
        </>
    )
}

export default DistrictsPage