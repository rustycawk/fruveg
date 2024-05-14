import React, { useEffect, useState } from 'react'
import { useStores } from '../../store/MobXProvider'
import { IProductType } from '../../types/productTypes/IProductType'
import APP_CONFIG from '../../app.config'
import productTypeService from '../../services/productType-service'
import Edit from './components/edit/Index'
import Delete from './components/delete/Index'
import Create from './components/create/Index'

type Props = {}

const Page = (props: Props) => {
    const { routerStore } = useStores()

    const [list, setList] = useState<IProductType[]>([])
    const [error, setError] = useState<string | null>(null)

    const update = () => {
        setError(null)
        productTypeService.findAll().then((response) => {
            setList(response.data)
        }).catch((error) => {
            setError("Ошибка при получении списка")
            console.log(error)
        })
    }

    useEffect(() => {
        routerStore.setCurrentPath('/productTypes')
        update()
    }, [])

    return (
        <>
            <h3 className='mb-4'>Типы продуктов</h3>
            <Create update={update}/>
            {error && <div className="alert alert-danger">{error}</div>}
            <table className="table">
                <thead>
                    <tr>
                        <th scope="col" style={{ width: 50 }}>#</th>
                        <th scope="col" style={{ width: 100 }}>Иконка</th>
                        <th scope="col" style={{ width: 200 }}>Название</th>
                        <th scope="col">Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {
                        list.map((item, index) => (
                            <tr key={index}>
                                <td>{item.id}</td>
                                <td><img src={APP_CONFIG.API_URL + item.logo} alt="" style={{ width: '60px' }} /></td>
                                <td>{item.name}</td>
                                <td>
                                    <div className="d-flex" style={{ gap: 20 }}>
                                        <Edit item={item} update={update} />
                                        <Delete item={item} update={update}/>
                                    </div>
                                </td>
                            </tr>
                        ))
                    }
                </tbody>
            </table>
        </>
    )
}

export default Page