import React from 'react';
import { FirebaseApp, getApps, initializeApp } from "firebase/app";
import { Auth } from "firebase/auth";

let app: FirebaseApp | null;
let auth: Auth | null;

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
};

const initFirebase = () => {
  if (!app || getApps().length === 0) {
    app = initializeApp({});
  }
  return app;
};

const FirebaseContext = React.createContext<FirebaseContextProps>({
  firebaseApp: initFirebase(),
  firebaseAuth: null,
});

export const FirebaseContextProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {
  const [firebaseApp, setFirebaseApp] = React.useState<FirebaseApp | null>(app);
  const [firebaseAuth, setFirebaseAuth] = React.useState<Auth | null>(auth);
  const contextValue: FirebaseContextProps = {
    firebaseApp,
    firebaseAuth,
  }
  return (
    <FirebaseContext.Provider
      value={contextValue}
    >
      {children}
    </FirebaseContext.Provider>
  )
};

export const useFirebase = () => React.useContext<FirebaseContextProps>(FirebaseContext)
