import React from 'react'
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
import StatusPayment from './views/cart/confirmPay/statusPayment'



//pages admin
import adminLogin from './admin/AdminLogin'
import SetBookPage from './admin/SetProductPage'
import SetBookDetailPage from './admin/SetProductDetailpage'

import { Provider } from "react-redux";
import store from './redux/store/store'

const App = () => {
  return (
    <div>
      <Provider store={store}>
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

              <Route component={NotFoundPage} />
              {/* admin */}
              <Route path="/admin" exact component={adminLogin} />
              <Route path="/admin/setProduct" exact component={SetBookPage} />
              <Route path="/admin/setProduct/:id" exact component={SetBookDetailPage} />
            </Switch>
            </BrowserRouter>
          </ErrorBoundary>
        </Provider>
    </div>
  )
}

export default App