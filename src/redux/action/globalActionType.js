import * as actionTypes from "./actionTypes";
import axios from "axios";
import { ENDPOINT, access_token } from "../../utils/global/index";

export const signin = (data) => {
  // console.log(data);
  const request = axios.post(`${ENDPOINT}/auth/login/user`, data);

  return (dispatch) => {
    request.then((response) => {
      console.log(response.data.data);
      const getDataUser = response.data.data;
      localStorage.setItem("saveUserdata", JSON.stringify(getDataUser));
      const getToken = response.data.data.access_token;
      localStorage.setItem("userToken", JSON.stringify(getToken));
      dispatch({
        type: actionTypes.SIGNIN,
        payload: data,
      });
    });
  };
};

export const signup = (data) => {
  console.log(data);
  const request = axios.post(`${ENDPOINT}/auth/register/user`, data, {
    // headers: {
    //   Authorization: `Bearer ${access_token}`,
    // },
  });

  return (dispatch) => {
    request.then((response) => {
      console.log(response);
      dispatch({
        type: actionTypes.SIGNUP,
        payload: response.data,
      });
    });
  };
};

export const signout = () => {
  return {
    type: actionTypes.SIGNOUT,
    payload: null,
  };
};

export const PriceCart = (data) => {
  return {
    type: actionTypes.PRICE_CART,
    payload: data,
  };
};

export const updateSaldo = (data) => {
  return {
    type: actionTypes.UPDATE_BOOK,
    payload: data,
  };
};

export const addToCart = (book) => {
  // console.log("actionTypes.ADD_TO_CART", actionTypes.ADD_TO_CART);
  return {
    type: actionTypes.ADD_TO_CART,
    payload: book,
  };
};

export const handlePlus = (bookId) => {
  return {
    type: actionTypes.PLUS_ORDER,
    payload: bookId,
  };
};

export const handleMinus = (bookId) => {
  return {
    type: actionTypes.MINUS_ORDER,
    payload: bookId,
  };
};

// export const getListBook = () => {
//   const request = axios.get(`${ENDPOINT}/product/read`, {
//     headers: {
//       Authorization: `Bearer ${access_token}`,
//     },
//   });

//   return (dispatch) => {
//     request.then((response) => {
//       console.log("response action".response);
//       return dispatch({
//         type: actionTypes.GET_BOOK,
//         payload: response.data.data,
//       });
//     });
//   };
// };

// get list book pagenation
export const getListBook = (currentPage) => {
  const request = axios.get(`${ENDPOINT}/product/read?page=${currentPage}`);

  return (dispatch) => {
    request.then((response) => {
      // console.log("response action". response);
      return dispatch({
        type: actionTypes.GET_BOOK,
        payload: response.data.data,
      });
    });
  };
};

// get book by id
export const getBookById = (id) => {
  // http request
  console.log(id);
  const request = axios.get(`${ENDPOINT}/product/read/${id}`, {
    // data: { id },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  // redux thunk untuk dispatch
  return (dispatch) => {
    console.log("response action".response);
    request.then((response) => {
      return dispatch({
        type: actionTypes.GET_BOOK_BY_ID,
        payload: response.data,
      });
    });
  };
};

export const updateBook = (data) => {
  const request = axios.post(`${ENDPOINT}/book/update`, data, {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionTypes.UPDATE_BOOK,
        payload: response.data.data,
      });

      return dispatch(getListBook());
    });
  };
};

export const deleteBook = (id) => {
  console.log(id);
  const request = axios.delete(`${ENDPOINT}/product/delete`, {
    data: { id },
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
  });

  return (dispatch) => {
    request.then((response) => {
      dispatch({
        type: actionTypes.DELETE_BOOK,
        payload: response.data.data,
      });
    });

    return dispatch(getListBook());
  };
};
