import React, { useContext, useEffect, useState } from 'react';
import { X, Mail, Lock, User, Image } from 'lucide-react';
import { FcGoogle } from "react-icons/fc";
import { FiEye, FiEyeOff } from "react-icons/fi";
import Swal from 'sweetalert2';
import logo from '../assets/idea.png';
import { AuthContext } from '../provider/AuthProvider';
import { updateProfile } from "firebase/auth";
import { useNavigate } from 'react-router';
import animationData from '../assets/lotties/Animation.json'; // 
import Lottie from 'lottie-react';


const AuthModal = ({ isOpen, onClose }) => {
    const [showLoginPassword, setShowLoginPassword] = useState(false);
    const [showRegPassword, setShowRegPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [isLogin, setIsLogin] = useState(true);

    const [loginEmail, setLoginEmail] = useState('');
    const [loginPassword, setLoginPassword] = useState('');
    const [regEmail, setRegEmail] = useState('');
    const [regPassword, setRegPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [fullName, setFullName] = useState('');
    const [photoURL, setPhotoURL] = useState('');

    const { createUser, setUser, logIn, googleSignIn } = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {
        document.body.style.overflow = isOpen ? 'hidden' : '';
        return () => { document.body.style.overflow = ''; };
    }, [isOpen]);

    if (!isOpen) return null;

    const handleClose = () => {
        const redirectPath = '/';
        onClose();
        navigate(redirectPath);
    };

    const getFriendlyError = (code) => {
        switch (code) {
            case 'auth/invalid-credential':
            case 'auth/user-not-found':
            case 'auth/wrong-password':
                return "Invalid email or password. Please try again.";
            case 'auth/too-many-requests':
                return "Too many login attempts. Please try again later.";
            case 'auth/invalid-email':
                return "Please enter a valid email address.";
            default:
                return "Login failed. Please check your details and try again.";
        }
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        if (!loginEmail || !loginPassword) {
            Swal.fire("Error", "Please enter email and password.", "error");
            return;
        }

        logIn(loginEmail, loginPassword)
            .then((result) => {
                const user = result.user;
                console.log(user);
                Swal.fire("Success", "Login successful!", "success");
                onClose();
            })
            .catch((error) => {
                const friendlyMsg = getFriendlyError(error.code);
                Swal.fire("Error", friendlyMsg, "error");
            });
    };

    const handleGoogleLogin = async () => {
        try {
            const result = await googleSignIn();
            const user = result.user;
            setUser(user);
            Swal.fire("Success", "Google login successful!", "success");
            onClose();
        } catch (error) {
            Swal.fire("Error", "Google login failed. Please try again.", "error");
            console.error(error);
        }
    };

    const passwordValidation = (pwd) => {
        const hasUppercase = /[A-Z]/.test(pwd);
        const hasLowercase = /[a-z]/.test(pwd);
        const hasMinLength = pwd.length >= 6;
        return hasUppercase && hasLowercase && hasMinLength;
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        if (!regEmail || !regPassword || !fullName || !photoURL || !confirmPassword) {
            Swal.fire("Error", "Please fill all required fields.", "error");
            return;
        }
        if (regPassword !== confirmPassword) {
            Swal.fire("Error", "Passwords do not match.", "error");
            return;
        }
        if (!passwordValidation(regPassword)) {
            Swal.fire("Error", "Password must have an uppercase, a lowercase, and be at least 6 characters long.", "error");
            return;
        }

        createUser(regEmail, regPassword)
            .then(async (result) => {
                const user = result.user;

                try {
                    await updateProfile(user, {
                        displayName: fullName,
                        photoURL: photoURL
                    });

                    setUser({
                        ...user,
                        displayName: fullName,
                        photoURL: photoURL
                    });

                    Swal.fire("Success", "Registration successful!", "success");
                    onClose();
                } catch {
                    Swal.fire("Error", "Profile update failed. Please try again.", "error");
                }
            })
            .catch((error) => {
                Swal.fire("Error", error.message, "error");
            });
    };

    return (
        <div className="fixed inset-0 z-50 backdrop-blur-xs bg-black/60 flex items-center justify-center px-4">
            <div className="bg-white rounded-lg shadow-2xl w-full md:max-w-6xl overflow-hidden relative flex flex-col sm:flex-row">
                <div className="w-full relative sm:w-2/3 h-52 sm:h-auto bg-orange-200 hidden sm:flex flex-col items-center justify-center">
                    <Lottie animationData={animationData} loop={true} className="w-full max-w-md" />
                    <div className='absolute inset-0 flex flex-col justify-center items-center text-white pointer-events-none'>
                        <img src={logo} alt="Logo" className="h-12 md:h-14 lg:h-16" />
                        <div className="text-white space-y-2 text-center">
                            <h1 className="text-2xl md:text-3xl tracking-widest text-orange-500 logo-text">Suggesto</h1>
                            <p className="text-xs md:text-sm font-extralight tracking-widest">PRODUCT RECO. SYSTEM</p>
                        </div>
                    </div>
                </div>

                <div className="w-full sm:w-1/2 bg-gradient-to-br from-yellow-500 to-orange-500 p-8 relative">
                    <button className="absolute top-4 right-4 text-white hover:text-orange-500 cursor-pointer" onClick={handleClose}>
                        <X size={24} />
                    </button>
                    <h2 className="text-white text-center tracking-wide text-2xl md:text-3xl mb-1">
                        Account <span className="font-extrabold">{isLogin ? 'Login' : 'Register'}</span>
                    </h2>
                    <p className="text-white text-center text-sm mb-4">
                        {isLogin
                            ? <>Login to our website, or <span className="underline cursor-pointer" onClick={() => setIsLogin(false)}>REGISTER</span></>
                            : <>Register to our website, or <span className="underline cursor-pointer" onClick={() => setIsLogin(true)}>LOGIN</span></>
                        }
                    </p>

                    <button onClick={handleGoogleLogin} className="bg-gray-100 rounded-full w-full py-2 mb-4 font-medium hover:bg-white cursor-pointer flex items-center justify-center gap-2">
                        <FcGoogle size={24} />   <span className='text-gray-800 tracking-wide'>Continue with Google</span>
                    </button>

                    {isLogin ? (
                        <>
                            <div className="flex items-center mb-4">
                                <hr className="flex-grow border-white" />
                                <span className="text-white mx-2 text-sm tracking-wide">OR SIGN IN</span>
                                <hr className="flex-grow border-white" />
                            </div>
                            <form className="space-y-3" onSubmit={handleLogin}>
                                <div className="relative mb-4">
                                    <Mail className="absolute left-4 top-3 text-gray-400" size={18} />
                                    <input type="email" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} placeholder="Email Address" className="w-full pl-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500" />
                                </div>
                                <div className="relative mb-2">
                                    <Lock className="absolute left-4 top-3 text-gray-400" size={18} />
                                    <input
                                        type={showLoginPassword ? "text" : "password"}
                                        value={loginPassword}
                                        onChange={(e) => setLoginPassword(e.target.value)}
                                        placeholder="Password"
                                        className="w-full pl-10 pr-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500"
                                    />
                                    <div
                                        className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                                        onClick={() => setShowLoginPassword((prev) => !prev)}
                                    >
                                        {showLoginPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                    </div>
                                </div>

                                <div className="text-right text-sm text-white underline cursor-pointer hover:text-green-200">
                                    Forgot password?
                                </div>
                                <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-2 rounded-full drop-shadow-md cursor-pointer hover:opacity-75">
                                    LOGIN NOW
                                </button>
                            </form>
                        </>
                    ) : (
                        <form className="space-y-3" onSubmit={handleRegister}>
                            <div className="flex items-center mb-4">
                                <hr className="flex-grow border-white" />
                                <span className="text-white mx-2 text-sm tracking-wide">OR SIGN UP</span>
                                <hr className="flex-grow border-white" />
                            </div>
                            <div className="relative mb-4">
                                <User className="absolute left-4 top-3 text-gray-500" size={18} />
                                <input type="text" value={fullName} onChange={(e) => setFullName(e.target.value)} placeholder="Full Name" className="w-full pl-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500" />
                            </div>
                            <div className="relative mb-4">
                                <Mail className="absolute left-4 top-3 text-gray-500" size={18} />
                                <input type="email" value={regEmail} onChange={(e) => setRegEmail(e.target.value)} placeholder="Email Address" className="w-full pl-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500" />
                            </div>
                            <div className="relative mb-4">
                                <Image className="absolute left-4 top-3 text-gray-500" size={18} />
                                <input type="text" value={photoURL} onChange={(e) => setPhotoURL(e.target.value)} placeholder="Photo URL" className="w-full pl-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500" />
                            </div>
                            <div className="relative mb-4">
                                <Lock className="absolute left-4 top-3 text-gray-500" size={18} />
                                <input
                                    type={showRegPassword ? "text" : "password"}
                                    value={regPassword}
                                    onChange={(e) => setRegPassword(e.target.value)}
                                    placeholder="Password"
                                    className="w-full pl-10 pr-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500"
                                />
                                <div
                                    className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                                    onClick={() => setShowRegPassword((prev) => !prev)}
                                >
                                    {showRegPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </div>
                            </div>

                            <div className="relative mb-2">
                                <Lock className="absolute left-4 top-3 text-gray-500" size={18} />
                                <input
                                    type={showConfirmPassword ? "text" : "password"}
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                    placeholder="Confirm Password"
                                    className="w-full pl-10 pr-10 p-2 rounded-full bg-white text-gray-600 placeholder:text-gray-500"
                                />
                                <div
                                    className="absolute right-4 top-3 text-gray-500 cursor-pointer"
                                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                                >
                                    {showConfirmPassword ? <FiEyeOff size={18} /> : <FiEye size={18} />}
                                </div>
                            </div>

                            <div className="flex items-start gap-2 text-sm text-white pl-2">
                                <input type="checkbox" required className="mt-1" />
                                <label>I agree to the <span className="underline cursor-pointer">Terms and Conditions</span>.</label>
                            </div>
                            <button type="submit" className="w-full bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-bold py-2 rounded-full drop-shadow-md cursor-pointer hover:opacity-75">
                                REGISTER NOW
                            </button>
                        </form>
                    )}

                    <p className="text-xs text-white mt-4 text-center">
                        By continuing, you agree to our <span className="underline cursor-pointer">Terms & Conditions</span>. <br />
                        Please use a valid email and strong password to ensure account security.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AuthModal;