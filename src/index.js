import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import reportWebVitals from './reportWebVitals';
import Detail from './component/Blog/Detail';
import Blog from './component/Blog/Blog';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import Account from './component/member/Account';
import Login from './component/member/Login';
import Regiester from './component/member/Register';
import MyProduct from './component/member/product/MyProduct';
import AddProduct from './component/member/product/AddProduct';
import EditProduct from './component/member/product/EditProduct';
import ShowProduct from './component/ShowProduct/ShowProduct';
import ProductDetail from './component/ShowProduct/ProductDetail';
import Cart from './component/ShowProduct/Cart';
import Wishlist from './component/ShowProduct/Wishlist';
import ContactUs from './component/ContactUs/ContactUs';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <Router>
      <App>
        <Routes>
          <Route index path='/' element={<ShowProduct/>} />
          <Route path='/Login' element={<Login/>} />
          <Route path='/Regiester' element={<Regiester/>} />
          <Route path='/Account' element={<Account/>} />
          <Route path='/Account/MyProduct' element={<MyProduct />} />
          <Route path='/Account/AddProduct' element={<AddProduct />} />
          <Route path='/Account/EditProduct/:id' element={<EditProduct />} />
          <Route path='/Product/ProductDetail/:id' element={<ProductDetail />} />
          <Route path='/Cart' element={<Cart />} />
          <Route path='/Wishlist' element={<Wishlist/>} />
          <Route path='/ContactUs' element={<ContactUs/>} />
          <Route path='/Blog/List' element={<Blog/>} />
          <Route path='/Blog/Detail/:id' element={<Detail/>} />
        </Routes>
      </App>
    </Router>
  </React.StrictMode>
);
reportWebVitals();
