import React from 'react'
import { Link } from 'react-router-dom'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'

type Props = {}

interface MenuItem {
    icon: string
    title: string
    link: string
}

const Menu = (props: Props) => {

    const { routerStore } = useStores()

    const menuItems: MenuItem[] = [
        {
            icon: '<i class="fa-solid fa-receipt"></i>',
            title: 'Заказы',
            link: '/orders'
        },
        {
            icon: '<i class="fa-solid fa-carrot"></i>',
            title: 'Продукты',
            link: '/products'
        },
        {
            icon: '<i class="fa-solid fa-percent"></i>',
            title: 'Акции',
            link: '/promotions'
        },
    ]

    const dictionaryItems: MenuItem[] = [
        {
            icon: '<i class="fa-solid fa-list"></i>',
            title: 'Типы продуктов',
            link: '/productTypes'
        },
        {
            icon: '<i class="fa-solid fa-city"></i>',
            title: 'Города',
            link: '/cities'
        }
    ]

    return (
        <div className='menu-container'>
            <h4 className='menu-title'>Основные</h4>
            <ul className='menu'>
                {
                    menuItems.map((item, index) => {
                        return <li key={index}>
                            <Link to={item.link}>
                                <div className={"item " + (routerStore.currentPath === item.link ? 'active' : '')}>
                                    <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        </li>
                    })
                }
            </ul>
            <h4 className='menu-title mt-4'>Дополнительные</h4>
            <ul className='menu'>
                {
                    dictionaryItems.map((item, index) => {
                        return <li key={index}>
                            <Link to={item.link}>
                                <div className={"item " + (routerStore.currentPath === item.link ? 'active' : '')}>
                                    <span dangerouslySetInnerHTML={{ __html: item.icon }}></span>
                                    <span>{item.title}</span>
                                </div>
                            </Link>
                        </li>
                    })
                }
            </ul>
        </div>
    )
}

export default observer(Menu)