import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { ICity } from '../../types/cities/ICity'
import cityService from '../../services/city-service'
import Create from './components/create/Index'
import Edit from './components/edit/Index'
import Delete from './components/delete/Index'
import { Link } from 'react-router-dom'

type Props = {}

const Page = (props: Props) => {
    const { routerStore } = useStores()

    const [list, setList] = useState<ICity[]>([])
    const [error, setError] = useState<string | null>(null)

    const update = () => {
        setError(null)
        cityService.findAll().then((response) => {
            setList(response.data)
        }).catch((error) => {
            setError("Ошибка при получении списка")
            console.log(error)
        })
    }

    useEffect(() => {
        routerStore.setCurrentPath('/cities')
        update()
    }, [])

    return (
        <>
            <h3 className='mb-4'>Города</h3>
            <Create update={update} />
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th style={{ width: 80 }}>#</th>
                        <th style={{ width: 200 }}>Название</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => {
                            return (
                                <tr key={index}>
                                    <td>{item.id}</td>
                                    <td>{item.name}</td>
                                    <td>
                                        <div className="d-flex" style={{ gap: 10 }}>
                                            <Link to={'/cities/districts/' + item.id} className='btn btn-secondary btn-sm'>Районы</Link>
                                            <Edit item={item} update={update} />
                                            <Delete item={item} update={update} />
                                        </div>
                                    </td>
                                </tr>
                            )
                        })
                    }
                </tbody>
            </table>
        </>
    )
}

export default Page