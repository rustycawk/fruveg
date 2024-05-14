import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from './pages/home/Page'
import OrdersPage from './pages/orders/Page'
import ProductsPage from './pages/products/Page'
import ProductTypesPage from './pages/productTypes/Page'
import CitiesPage from './pages/cities/Page'
import CityDistrictsPage from './pages/cities/DistrictsPage'
import PromotionsPage from './pages/promotions/Page'

type Props = {}

const Router = (props: Props) => {
    return (
        <Routes>
            <Route path='/' element={<HomePage />} />
            <Route path="/orders" element={<OrdersPage />} />
            <Route path="/products" element={<ProductsPage />} />
            <Route path="/productTypes" element={<ProductTypesPage />} />
            <Route path="/cities" element={<CitiesPage/>}/>
            <Route path="/cities/districts/:id" element={<CityDistrictsPage/>}/>
            <Route path="/promotions" element={<PromotionsPage/>}/>
        </Routes>
    )
}

export default Router