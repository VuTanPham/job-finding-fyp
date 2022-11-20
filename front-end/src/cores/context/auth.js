import { createContext, useEffect, useReducer } from "react";

export const authContext = createContext({
  state: {
    user: {},
    profile: {},
    token: "",
    isAuthenticated: false,
  },
  dispatch: () => {},
});

const initialState = {
  user: {},
  profile: {},
  token: "",
  isAuthenticated: false,
};

const LOGIN = "LOGIN";
const LOGOUT = "LOGOUT";
const UPDATE = "UPDATE";

export const loginAction = (payload) => {
  return { type: LOGIN, payload };
};

export const updateAction = (payload) => {
  return { type: UPDATE, payload };
};

export const logoutAction = () => {
  return { type: LOGOUT };
};

const authReducer = (state, action) => {
  switch (action.type) {
    case LOGIN:
      localStorage.setItem('account_info', JSON.stringify(action.payload));
      return { ...state, ...action.payload };
    case UPDATE:
      localStorage.setItem('account_info', JSON.stringify({ ...state, user: {...state.user, ...action.payload} }));
      return { ...state, user: {...state.user, ...action.payload} };
    case LOGOUT:
      localStorage.setItem('account_info', JSON.stringify(initialState));
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
