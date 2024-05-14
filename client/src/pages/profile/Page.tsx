import React, { useEffect, useState } from 'react'
import { Container, Tab, Tabs } from 'react-bootstrap'
import { useNavigate, useParams } from 'react-router-dom'
import APP_CONFIG from '../../app.config'
import { IProfile } from '../../types/profile/IProfile'
import profileService from '../../services/profile-service'
import ProfileInfo from './ProfileInfo'
import ChangePassword from './ChangePassword'
import Orders from './orders/Index'
import { useStores } from '../../store/MobXProvider'
import { observer } from 'mobx-react-lite'
import Addresses from './Addresses'
import Payments from './Payments'

type Props = {}

const Page = (props: Props) => {
    const { key } = useParams()
    const [profile, setProfile] = useState<IProfile | null>(null)
    const { authStore } = useStores()
    const navigator = useNavigate()

    const update = () => {
        profileService.getProfileInfo().then((response) => {
            setProfile(response.data)
        }).catch((error) => {
            if (error.response?.status === 401) {
                navigator('/auth/login/profile')
            }
        })
    }

    useEffect(() => {
        update()
    }, [key, authStore.isAuth])



    return (
        <>
            <div className="title-banner">
                <img src={APP_CONFIG.PROFILE_BANNER} alt="" />
                <div className="title-banner-content">
                    <Container><h2>Личный кабинет</h2></Container>
                </div>
            </div>
            <Container className='pt-5'>
                {
                    profile && <Tabs
                        defaultActiveKey={key ?? 'user-settings'}
                        className="mb-3"
                        variant='pills'
                    >
                        <Tab eventKey="user-settings" title="Пользователь">
                            <ProfileInfo profile={profile} update={update} />
                        </Tab>
                        <Tab eventKey="change-password" title="Пароль">
                            <ChangePassword />
                        </Tab>
                        <Tab eventKey="orders" title="История заказов">
                            <Orders />
                        </Tab>
                        <Tab eventKey="payments" title="Карты">
                            <Payments payments={profile.payments} update={update}/>
                        </Tab>
                        <Tab eventKey="addresses" title="Адреса доставки">
                            <Addresses update={update} addresses={profile.addresses}/>
                        </Tab>
                    </Tabs>
                }
            </Container>
        </>
    )
}

export default observer(Page)