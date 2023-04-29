import React from 'react';
import { FirebaseApp, getApp, getApps, initializeApp } from "firebase/app";
import { Auth, getAuth } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

let app: FirebaseApp | null;
let auth: Auth | null;

export interface FirebaseContextProps {
  firebaseApp: FirebaseApp | null;
  firebaseAuth: Auth | null;
};

const initFirebase = () => {
  if (!app || getApps().length === 0) {
    app = initializeApp({
      apiKey: "AIzaSyBR2PExNOFV5t0RVD07svvp127mV3Y7q0c",
      authDomain: "clase-react-9e118.firebaseapp.com",
      projectId: "clase-react-9e118",
      storageBucket: "clase-react-9e118.appspot.com",
      messagingSenderId: "199363965945",
      appId: "1:199363965945:web:6b910b22d38b272605c328",
      measurementId: "G-C20NC3QF5Q"
    });
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

  React.useEffect(() => {
    if (!firebaseApp) {
      setFirebaseApp(initFirebase());
    } else {
      getAnalytics(getApp());
    }
  }, [firebaseApp]);

  React.useEffect(() => {
    if (!firebaseAuth) {
      setFirebaseAuth(getAuth());
    }
  }, [firebaseAuth]);

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
