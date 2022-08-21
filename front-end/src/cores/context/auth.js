import { createContext, useReducer } from "react";

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
  return { type: LOGIN, payload };
};

export const logoutAction = () => {
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
  return (
    <authContext.Provider value={{ state, dispatch }}>
      {children}
    </authContext.Provider>
  );
};

export default AuthContext;
