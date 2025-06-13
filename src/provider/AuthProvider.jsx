import React, { createContext, useEffect, useRef, useState } from 'react';
import app from '../firebase/firebase.config';
import { createUserWithEmailAndPassword, getAuth, onAuthStateChanged, signInWithEmailAndPassword } from "firebase/auth";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import Swal from 'sweetalert2';
export const AuthContext = createContext();

const googleProvider = new GoogleAuthProvider();
const auth = getAuth(app);
const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
    const [loading, setLoading] = useState(true);

    const hasShownModalAlert = useRef(false);

    const logIn = (email, password) => {
        setLoading(true)
        return signInWithEmailAndPassword(auth, email, password)
    };

    const googleSignIn = () => {
        setLoading(true);
        return signInWithPopup(auth, googleProvider);
    };

    const createUser = (email, password) => {
        setLoading(true)
        return createUserWithEmailAndPassword(auth, email, password)
    };

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
            setUser(currentUser);
            setLoading(false);
        });
        return () => {
            unsubscribe();
        }
    }, []);

    useEffect(() => {
        if (isAuthModalOpen && !hasShownModalAlert.current) {
            Swal.fire("Oops!", "Please log in to access this page.", "error");
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
        loading,
        googleSignIn,
        isAuthModalOpen,
        setIsAuthModalOpen
    };

    return (
        <AuthContext.Provider value={authData}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;