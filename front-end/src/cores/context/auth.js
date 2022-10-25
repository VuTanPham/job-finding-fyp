import { createContext, useEffect, useReducer } from "react";

export const authContext = createContext({
  state: {
    user: {},
    token: "",
    isAuthenticated: false,
  },
  dispatch: () => {},
});

const initialState = {
  user: {},
  token: "",
  isAuthenticated: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";

export const loginAction = (payload) => {
  localStorage.setItem('account_info', JSON.stringify(payload));
  return { type: LOGIN, payload };
};

export const logoutAction = () => {
  localStorage.setItem('account_info', JSON.stringify(initialState));
  return { type: LOGOUT };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      return { ...state, ...action.payload };
    case LOGOUT:
      return initialState;
    default:
      return initialState;
  }
};

const AuthContext = ({ children }) => {
  const [state, dispatch] = useReducer(authReducer, initialState);

  useEffect(() => {
    const account_info_from_local_storage = localStorage.getItem('account_info');
    const account_info = JSON.parse(account_info_from_local_storage);
    if(account_info) {
      dispatch(loginAction(account_info))
    }
  }, [])

  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
