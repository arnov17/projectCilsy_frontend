import * as actionTypes from "../action/actionTypes";

const initialState = {
  admin: { username: "admin", password: "admin" },
  users: [
    { name: "arnov", username: "arnov", password: "arnov", saldo: 1000000 },
  ],
  signinResponse: false,
  signedUser: {},
  books: [],
  book: {},
  booksInCart: [],
  totalOrder: 1,
  PriceCart: 0,
};

const book = (state = initialState, action) => {
  // console.log(state.users, "state useres");
  switch (action.type) {
    case actionTypes.SIGNUP:
      return {
        ...state,
        users: [...state.users, action.payload],
      };

    case actionTypes.SIGNIN:
      // console.log(action.payload);
      const findUser = state.users.find(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      )
        ? true
        : false;

      const filterUser = state.users.filter(
        (user) =>
          user.username === action.payload.username &&
          user.password === action.payload.password
      );

      return {
        ...state,
        signinResponse: findUser,
        signedUser: filterUser,
      };

    case actionTypes.SIGNOUT:
      return {
        ...state,
        signinResponse: false,
        signedUser: {},
        booksInCart: [],
      };

    case actionTypes.ADD_TO_CART:
      console.log("action.payload", action.payload);
      const filterProduct = state.books.filter(
        (val) => val.id === action.payload.id
      );
      filterProduct[0].qty = 1;
      return {
        ...state,
        booksInCart: [...state.booksInCart, filterProduct[0]],
      };

    // handdle add chart unique
    // let temp = state.booksInCart.length > 0 ? state.booksInCart : []
    // const indexAddCart = temp.findIndex((val) => val.id === action.payload.id)
    // if(indexAddCart >= 0) {
    //   temp[indexAddCart].qty = temp[indexAddCart].qty + 1
    // } else {
    //   const findproduct = state.books.find((val) => val.id === action.payload.id);
    //   temp.push({...findproduct, qty : 1})
    // }

    // return {
    //   ...state,
    //   booksInCart: temp,
    //   };

    case actionTypes.PRICE_CART:
      return {
        ...state,
        PriceCart: action.payload,
      };

    case actionTypes.PLUS_ORDER:
    // addOrder by totlaOrder
    case actionTypes.MINUS_ORDER:
      if (state.totalOrder > 0) {
        return {
          ...state,
          booksInCart: state.totalOrder + 1,
        };
      }

    // add order by each id, qty
    // const index = state.booksInCart.findIndex(val => val.id === action.payload)
    // const newBooksInCart = state.booksInCart
    // newBooksInCart[index].qty = state.booksInCart[index].qty + 1
    // // console.log("action.payload qty", action.payload);
    // console.log(newBooksInCart[index].qty)
    // return {
    //   ...state,
    //   booksInCart : newBooksInCart
    // }

    case actionTypes.MINUS_ORDER:
      if (state.totalOrder > 0) {
        return {
          ...state,
          booksInCart: state.totalOrder - 1,
        };
      }

    case actionTypes.UPDATE_SALDO:
      let newPayloadsaldo = state.signedUser;
      newPayloadsaldo.saldo = action.payload;
      return {
        ...state,
        signedUser: newPayloadsaldo,
      };

    //setAdminBook
    case actionTypes.GET_BOOK:
      return {
        ...state,
        books: action.payload,
      };
    case actionTypes.GET_BOOK_BY_ID:
      return {
        ...state,
        book: action.payload,
      };
    case actionTypes.UPDATE_BOOK:
      return {
        ...state,
      };
    case actionTypes.DELETE_BOOK:
      return {
        ...state,
      };

    default:
      return initialState;
  }
};

export default book;
