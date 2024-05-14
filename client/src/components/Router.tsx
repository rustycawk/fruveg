import React from 'react'
import { Route, Routes } from 'react-router-dom'

import HomePage from '../pages/home/Page'


import LoginPage from '../pages/auth/login/Page';
import RegistrationPage from '../pages/auth/registration/Page'
import ActivateProfile from '../pages/auth/ActivateProfile';
import ResetPassword from '../pages/auth/ResetPassword';
import BasketPage from '../pages/basket/Page'
import CheckoutPage from '../pages/checkout/Page'
import Reset from '../pages/auth/Reset';
import CatalogPage from '../pages/catalog/Page'
import ProfilePage from '../pages/profile/Page'
type Props = {}

const Router = (props: Props) => {
  return <Routes>
    {/* Home */}
    <Route path='/' element={<HomePage />} />
    <Route path="/catalog" element={<CatalogPage />} />
    <Route path="/basket" element={<BasketPage />} />
    <Route path="/checkout" element={<CheckoutPage />} />
    <Route path="/profile" element={<ProfilePage/>}/>
    <Route path="/profile/:key" element={<ProfilePage/>}/>
    {/* Auth */}
    <Route path='/auth/login' element={<LoginPage />} />
    <Route path='/auth/login/:source' element={<LoginPage />} />
    <Route path='/auth/registration' element={<RegistrationPage />} />
    <Route path='/auth/activate/:email/:key' element={<ActivateProfile />} />
    <Route path="/auth/reset" element={<Reset />} />
    <Route path='/auth/reset-password/:key' element={<ResetPassword />} />
  </Routes>
}

export default Router