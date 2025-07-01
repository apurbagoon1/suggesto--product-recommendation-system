import React, { useState, useContext, useEffect } from 'react';
import { X } from 'lucide-react';
import Swal from 'sweetalert2'; // ✅ SweetAlert2
import { getAuth, signOut, updateProfile } from 'firebase/auth';
import { AuthContext } from '../provider/AuthProvider';

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, setUser } = useContext(AuthContext);

    const [editMode, setEditMode] = useState(false);
    const [name, setName] = useState(user?.displayName || '');
    const [photoURL, setPhotoURL] = useState(user?.photoURL || '');

    useEffect(() => {
        setName(user?.displayName || '');
        setPhotoURL(user?.photoURL || '');
    }, [user]);

    if (!isOpen) return null;

    const handleLogout = async () => {
        try {
            await signOut(getAuth());
            Swal.fire("Success", "Logged out successfully.", "success");
            onClose();
        } catch {
            Swal.fire("Error", "Logout failed.", "error");
        }
    };

    const handleUpdateProfile = async () => {
        try {
            const currentUser = getAuth().currentUser;

            await updateProfile(currentUser, {
                displayName: name,
                photoURL: photoURL,
            });

            setUser({ ...currentUser });

            Swal.fire("Success", "Profile updated!", "success");
            setEditMode(false);
        } catch (error) {
            Swal.fire("Error", "Failed to update profile.", "error");
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex justify-end items-start px-6 pt-20">
            <div className="bg-gradient-to-br from-yellow-500 to-orange-600 rounded-lg p-8 mr-10 text-center shadow-lg relative w-[90%] sm:w-[400px]">
                <button onClick={onClose} className="absolute top-4 right-4 text-gray-100 hover:text-orange-300 cursor-pointer">
                    <X size={24} />
                </button>

                <div className='flex flex-col items-center justify-center'>
                    <div className="avatar mb-2">
                        <div className="w-28 rounded-full ring-2 ring-white">
                            <img src={photoURL} alt="User" />
                        </div>
                    </div>
                    <div className=''>
                        <h2 className="text-2xl font-bold text-gray-900">{name}</h2>
                        <p className='text-lg'>{user?.email}</p>
                    </div>
                </div>

                <div className='space-y-2 my-4 text-left'>
                    <h3 className="text-lg font-bold text-gray-800 border-b border-orange-300 pb-1">Personal Information</h3>

                    <div>
                        <h5 className="text-sm font-medium text-gray-900">Name:</h5>
                        {editMode ? (
                            <input
                                type="text"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="w-full mt-1 rounded-lg px-3 py-1 text-sm text-gray-800"
                            />
                        ) : (
                            <p className="bg-black/20 text-white px-3 py-1 rounded-lg">{name}</p>
                        )}
                    </div>

                    <div>
                        <h5 className="text-sm font-medium text-gray-900">Photo URL:</h5>
                        {editMode ? (
                            <input
                                type="text"
                                value={photoURL}
                                onChange={(e) => setPhotoURL(e.target.value)}
                                className="w-full mt-1 rounded-lg px-3 py-1 text-sm text-gray-800 break-all"
                            />
                        ) : (
                            <p className="bg-black/20 text-white px-3 py-1 rounded-lg break-all">{photoURL}</p>
                        )}
                    </div>
                </div>

                <div className="flex items-center justify-between mt-5">
                    {editMode ? (
                        <button
                            onClick={handleUpdateProfile}
                            className="border border-white text-white hover:scale-105 hover:bg-white hover:text-orange-500 px-6 py-2 cursor-pointer rounded-lg"
                        >
                            Update Profile
                        </button>
                    ) : (
                        <button
                            onClick={() => setEditMode(true)}
                            className="border border-white text-white hover:scale-105 hover:bg-white hover:text-orange-500 px-6 py-2 cursor-pointer rounded-lg"
                        >
                            Edit Profile
                        </button>
                    )}
                    <span className="text-white">..OR..</span>
                    <button
                        onClick={handleLogout}
                        className="border border-white text-white hover:scale-105 hover:bg-white hover:text-orange-500 px-6 py-2 cursor-pointer rounded-lg"
                    >
                        Log Out
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ProfileModal;