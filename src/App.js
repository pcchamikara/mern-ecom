import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Footer from './components/Footer';
import { Header } from './components/Header/Header';
import Cart from './screens/Cart';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import ProductScreen from './screens/ProductScreen';
import ProfileScreen from './screens/ProfileScreen';
import RegisterScreen from './screens/RegisterScreen';
import ShippingScreen from './screens/ShippingScreen';
import PaymentScreen from './screens/PaymentScreen';
import OrderScreen from './screens/OrderScreen';
import OrderItemScreen from './screens/OrderItemScreen';
import UserList from './screens/admin/UserList';
import UserEdit from './screens/admin/UserEdit';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProductList from './screens/admin/ProductList';

import ProductAddEdit from './screens/admin/ProductAddEdit';
import OrderList from './screens/admin/OrderList';
import SearchScreen from './screens/SearchScreen.js';
import ArchiveScreen from './screens/ArchiveScreen';

function App() {
  return (
    <BrowserRouter basename="/mern-ecom">
      <Header />
      <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <div className="h-75  p-0">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/page/:pageNumber" element={<HomeScreen />} />
          <Route path="/product/:id" element={<ProductScreen />} />
          <Route path="/search/">
            <Route index element={<SearchScreen />} />
            <Route path=":keyword" element={<SearchScreen />} />
            <Route
              path=":keyword/page/:pageNumber"
              element={<SearchScreen />}
            />
            <Route path="page/:pageNumber" element={<ArchiveScreen />} />
          </Route>
          <Route path="/products/">
            <Route index element={<ArchiveScreen />} />
            <Route path=":category" element={<ArchiveScreen />} />
          </Route>

          <Route path="/login" element={<LoginScreen />} />
          <Route path="/register" element={<RegisterScreen />} />
          <Route path="/profile" element={<ProfileScreen />} />
          <Route path="/admin/user-list" element={<UserList />} />
          <Route path="/admin/order-list" element={<OrderList />} />
          <Route path="/admin/product-list" element={<ProductList />} />
          <Route path="/admin/user-edit/:id" element={<UserEdit />} />
          <Route path="/admin/product-edit/:id" element={<ProductAddEdit />} />
          <Route path="/admin/product-add/" element={<ProductAddEdit />} />
          <Route path="/shipping" element={<ShippingScreen />} />
          <Route path="/payment" element={<PaymentScreen />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/order" element={<OrderScreen />} />
          <Route path="/order/:id" element={<OrderItemScreen />} />
        </Routes>
      </div>

      <Footer />
    </BrowserRouter>
  );
}

export default App;
