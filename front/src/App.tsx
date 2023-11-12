import React, { createContext, useReducer, useContext } from "react";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Link, Navigate } from "react-router-dom";
import { WellcomePage } from "./page/WellcomePage";
import { SignupPage } from "./page/SignupPage";
import { SignupConfirmPage } from "./page/SignupConfirmPage";
import { SigninPage } from "./page/SigninPage";
import { RecoveryPage } from "./page/RecoveryPage";
import { RecoveryConfirmPage } from "./page/RecoveryConfirmPage";
import { BalancePage } from "./page/BalancePage";
import { SettingsPage } from "./page/SettingsPage";
import { NotificationsPage } from "./page/NotificationsPage";
import { RecivePage } from "./page/RecivePage";
import { SendPage } from "./page/SendPage";
import TransactionPage from "./page/TransactionPage";

import AuthRoute from "./component/auth-route/AuthRoute";
import PrivateRoute from "./component/privat-router";
import ErrorPage from "./page/ErrorPage";

//Типи для даних аутентифікації
export type ContextType = {
  state: {
    isAuthenticated: boolean;
    token: string | null;
    user: { email: string; isConfirm: boolean; id: number } | null;
  };
  dispatch: (action: AuthAction) => void;
};

export type AuthAction =
  | {
      type: "LOGIN";
      payload: {
        token: string;
        user: { email: string; isConfirm: boolean; id: number };
      };
    }
  | {
      type: "AUTH";
      payload: {
        token: string;
        user: { email: string; isConfirm: boolean; id: number };
      };
    }
  | { type: "LOGOUT" };

//Створення контекста для даних аутентифікації
export const AuthContext = createContext<ContextType | null>(null);

//Початковий стан.
export const initialAuthState = {
  isAuthenticated: false,
  token: null,
  user: { email: null, isConfirm: null, id: null },
};

// Редуктор для оброки дій
export function authReducer(state: any, action: AuthAction) {
  switch (action.type) {
    case "LOGIN":
      return {
        ...state,
        isAuthenticated: true,
        token: action.payload.token,
        user: action.payload.user,
      };
    case "AUTH":
      return {
        ...state,
        isAuthenticated: false,
        token: action.payload.token,
        user: action.payload.user,
      };

    case "LOGOUT":
      return {
        ...state,
        isAuthenticated: false,
        token: null,
        user: null,
      };

    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(authReducer, initialAuthState);

  return (
    <AuthContext.Provider value={{ state, dispatch }}>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <AuthRoute>
                <WellcomePage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <AuthRoute>
                <SignupPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signup-confirm"
            element={
              <AuthRoute>
                <SignupConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/signin"
            element={
              <AuthRoute>
                <SigninPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery"
            element={
              <AuthRoute>
                <RecoveryPage />
              </AuthRoute>
            }
          />
          <Route
            path="/recovery-confirm"
            element={
              <AuthRoute>
                <RecoveryConfirmPage />
              </AuthRoute>
            }
          />
          <Route
            path="/balance"
            element={
              <PrivateRoute>
                <BalancePage />
              </PrivateRoute>
            }
          />
          <Route
            path="/settings"
            element={
              <PrivateRoute>
                <SettingsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/notifications"
            element={
              <PrivateRoute>
                <NotificationsPage />
              </PrivateRoute>
            }
          />
          <Route
            path="/recive"
            element={
              <PrivateRoute>
                <RecivePage />
              </PrivateRoute>
            }
          />

          <Route
            path="/send"
            element={
              <PrivateRoute>
                <SendPage />
              </PrivateRoute>
            }
          />

          <Route
            path="/transaction/:transactionId"
            element={
              <PrivateRoute>
                <TransactionPage />
              </PrivateRoute>
            }
          />

          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
