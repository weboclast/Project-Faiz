import React from 'react'
import {
  Routes,
  Route,
} from "react-router-dom";
import DefaultLayout from './Layouts/DefaultLayout';

import Homepage from './Pages/Homepage';
import Product from './Pages/Product';
import Detail from './Pages/Detail';
import Cart from './Pages/Cart';
import Checkout from './Pages/Checkout';
import Payment from './Pages/Payment';
import Address from './Pages/Address';
import Blog from './Pages/Blog';
import BlogDetail from './Pages/BlogDetail';
import Tracking from './Pages/Tracking';
import Privacy from './Pages/Privacy';
import Terms from './Pages/Terms';
import SignIn from './Pages/SignIn';
import SignUp from './Pages/SignUp';
import ResetPassword from './Pages/ResetPassword';

const App = () => {
  return (
    <Routes>
      <Route path="" element={<DefaultLayout />}>
        <Route index element={<Homepage />} />
        <Route path="product" element={<Product />} />
        <Route path="detail" element={<Detail />} />
        <Route path="cart" element={<Cart />} />
        <Route path="checkout" element={<Checkout />} />
        <Route path="payment" element={<Payment />} />
        <Route path="address" element={<Address />} />
        <Route path="blog" element={<Blog />} />
        <Route path="blog/detail" element={<BlogDetail />} />
        <Route path="tracking" element={<Tracking />} />
        <Route path="privacy" element={<Privacy />} />
        <Route path="terms" element={<Terms />} />
        <Route path="sign-in" element={<SignIn />} />
        <Route path="sign-up" element={<SignUp />} />
        <Route path="reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  )
}

export default App
