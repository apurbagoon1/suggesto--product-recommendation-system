import React, { createContext, useEffect, useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import {
  createUserWithEmailAndPassword,
  getAuth,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut
} from 'firebase/auth';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';
import Swal from 'sweetalert2';
import axios from 'axios';

export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  const hasShownModalAlert = useRef(false);

  const logIn = async (email, password) => {
    setLoading(true);
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      await axios.post(
        'https://suggesto-product-reco-server.vercel.app/jwt',
        { email },
        { withCredentials: true }
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const result = await signInWithPopup(auth, googleProvider);
      const email = result.user.email;
      await axios.post(
        'https://suggesto-product-reco-server.vercel.app/jwt',
        { email },
        { withCredentials: true }
      );
      return result;
    } finally {
      setLoading(false);
    }
  };

  const createUser = async (email, password) => {
    setLoading(true);
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      await logIn(email, password);
      return result;
    } finally {
      setLoading(false);
    }
  };

  const logOut = async () => {
    setLoading(true);
    try {
      await axios.post('https://suggesto-product-reco-server.vercel.app/logout', null, { withCredentials: true });

      return signOut(auth);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  useEffect(() => {
    if (isAuthModalOpen && !hasShownModalAlert.current) {
      Swal.fire('Oops!', 'Please log in to access this page.', 'error');
      hasShownModalAlert.current = true;
    }
    if (!isAuthModalOpen) {
      hasShownModalAlert.current = false;
    }
  }, [isAuthModalOpen]);

  const authData = {
    user,
    setUser,
    createUser,
    logIn,
    logOut,
    loading,
    googleSignIn,
    isAuthModalOpen,
    setIsAuthModalOpen
  };

  return <AuthContext.Provider value={authData}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
