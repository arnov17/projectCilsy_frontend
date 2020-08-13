import { combineReducers, compose, createStore, applyMiddleware } from 'redux';
import books from '../reducer/globalReducer'
import thunk from "redux-thunk";


const rootReducer = combineReducers({
    bookReducer: books
  });
  
  const logger = (store) => {
    return (next) => {
      return (action) => {
        console.log('[Middleware] Dispatching', action)
        const result = next(action)
        console.log('[Middleware next state]', store.getState())
        return result
      }
    }
  };
  
  const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
  
  const store = createStore(
    rootReducer,
    composeEnhancers(applyMiddleware(logger, thunk))
  );

  export default store