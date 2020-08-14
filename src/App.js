import React, {useState} from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'
//pages user
import ErrorBoundary from './views/errorBoundary/ErrorBoundary'
import Signin from './views/login/Login';
import Signup from './views/register/Register';
import HomePage from './views/home/Homepage';
import Navbar from './components/navbar/Navbar';
import BookPage from './views/product/ProductPage'
import BookDetailPage from './views/product/ProductDetailPage'
import NotFoundPage from './views/notFound/NotFound'
import Cart from './views/cart/Cart';
import PayConfirm from './views/cart/confirmPay/ConfirmPay'
import StatusPayment from './views/cart/statusPayment/StatusPayment'



//pages admin
import adminLogin from './admin/AdminLogin'
import SetBookPage from './admin/SetProductPage'
import SetBookDetailPage from './admin/SetProductDetailpage'
import AddProduct from './admin/AddProduct';

import { Provider } from "react-redux";
import {DataContext} from './context/DataContext'
import store from './redux/store/store'

const App = () => {
  const [dataContext, setDataContext] = useState(null)
  return (
    <div>
      <Provider store={store}>
      <DataContext.Provider value={{dataContext, setDataContext}}>
        <ErrorBoundary>
          <BrowserRouter>
          <Navbar/>
            <Switch>
              {/* user */}
              <Route path="/" exact component={Signin} />
              <Route path="/signup" component={Signup}/>
              <Route path="/homepage" component={HomePage}/>
              <Route path="/product" exact component={BookPage}/>
              <Route path="/product/:id" component={BookDetailPage}/>
              <Route path="/cart" component={Cart}/>
              <Route path="/payconfirm" exact component={PayConfirm}/>
              <Route path="/payconfirm/statusPayment" component={StatusPayment}/>

              {/* admin */}
              <Route path="/admin" exact component={adminLogin} />
              <Route path="/admin/setProduct" exact component={SetBookPage} />
              <Route path="/admin/setProduct/:id" component={SetBookDetailPage} />
              <Route path="/admin/addBook" exact component={AddProduct} />

              
              <Route component={NotFoundPage} />
            </Switch>
            </BrowserRouter>
          </ErrorBoundary>
          </DataContext.Provider>
        </Provider>
    </div>
  )
}

export default App