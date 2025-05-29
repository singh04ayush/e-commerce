import React, { useContext, useEffect, useState } from 'react';
import { ShopContext } from '../context/ShopContext';
import Title from '../components/Title';
import axios from 'axios';
import { toast } from 'react-toastify';

const Profile = () => {
    const { backendUrl, token, navigate } = useContext(ShopContext);
    const [userData, setUserData] = useState({
        name: '',
        email: '',
        billingInfo: {
            firstName: '',
            lastName: '',
            street: '',
            city: '',
            state: '',
            zipcode: '',
            country: '',
            phone: ''
        }
    });
    const [isLoading, setIsLoading] = useState(true);
    const [isSaving, setIsSaving] = useState(false);

    useEffect(() => {
        // Redirect to login if not authenticated
        if (!token) {
            navigate('/login');
            return;
        }

        // Fetch user profile data
        const fetchUserProfile = async () => {
            try {
                setIsLoading(true);
                const response = await axios.post(
                    `${backendUrl}/api/user/profile`,
                    {},
                    { headers: { token } }
                );

                if (response.data.success) {
                    setUserData({
                        ...response.data.user,
                        billingInfo: response.data.user.billingInfo || {
                            firstName: '',
                            lastName: '',
                            street: '',
                            city: '',
                            state: '',
                            zipcode: '',
                            country: '',
                            phone: ''
                        }
                    });
                } else {
                    toast.error(response.data.message || 'Failed to load profile');
                }
            } catch (error) {
                console.error('Error fetching profile:', error);
                toast.error('Failed to load profile. Please try again.');
            } finally {
                setIsLoading(false);
            }
        };

        fetchUserProfile();
    }, [token, backendUrl, navigate]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setUserData({ ...userData, [name]: value });
    };

    const handleBillingInfoChange = (e) => {
        const { name, value } = e.target;
        setUserData({
            ...userData,
            billingInfo: {
                ...userData.billingInfo,
                [name]: value
            }
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            setIsSaving(true);
            const response = await axios.post(
                `${backendUrl}/api/user/profile/update`,
                {
                    name: userData.name,
                    billingInfo: userData.billingInfo
                },
                { headers: { token } }
            );

            if (response.data.success) {
                toast.success('Profile updated successfully');
            } else {
                toast.error(response.data.message || 'Failed to update profile');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Failed to update profile. Please try again.');
        } finally {
            setIsSaving(false);
        }
    };

    if (isLoading) {
        return (
            <div className="border-t pt-16 min-h-[60vh] flex items-center justify-center">
                <p className="text-gray-600">Loading profile...</p>
            </div>
        );
    }

    return (
        <div className="border-t pt-16 pb-16">
            <div className="text-2xl mb-8">
                <Title text1={'MY'} text2={'PROFILE'} />
            </div>

            <div className="max-w-3xl mx-auto mb-10">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">Current Billing Information</h2>

                    {Object.values(userData.billingInfo).some(value => value) ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Contact</h3>
                                <p className="text-gray-600">
                                    {userData.billingInfo.firstName} {userData.billingInfo.lastName}
                                </p>
                                <p className="text-gray-600">{userData.billingInfo.phone || 'No phone number'}</p>
                                <p className="text-gray-600">{userData.email}</p>
                            </div>

                            <div>
                                <h3 className="font-medium text-gray-700 mb-2">Address</h3>
                                {userData.billingInfo.street ? (
                                    <>
                                        <p className="text-gray-600">{userData.billingInfo.street}</p>
                                        <p className="text-gray-600">
                                            {userData.billingInfo.city}{userData.billingInfo.city && userData.billingInfo.state ? ', ' : ''}
                                            {userData.billingInfo.state} {userData.billingInfo.zipcode}
                                        </p>
                                        <p className="text-gray-600">{userData.billingInfo.country}</p>
                                    </>
                                ) : (
                                    <p className="text-gray-600">No address information</p>
                                )}
                            </div>
                        </div>
                    ) : (
                        <p className="text-gray-600 italic">No billing information has been added yet.</p>
                    )}
                </div>
            </div>

            <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
                <div className="bg-gray-50 p-6 rounded-lg shadow-sm mb-8">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">Account Information</h2>
                    <div className="mb-4">
                        <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                            Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={userData.name}
                            onChange={handleInputChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={userData.email}
                            className="w-full p-2 border border-gray-300 rounded bg-gray-100 cursor-not-allowed"
                            disabled
                        />
                        <p className="text-xs text-gray-500 mt-1">Email cannot be changed</p>
                    </div>
                </div>

                <div className="bg-gray-50 p-6 rounded-lg shadow-sm">
                    <h2 className="text-xl font-medium text-gray-800 mb-4">Billing Information</h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700 mb-1">
                                First Name
                            </label>
                            <input
                                type="text"
                                id="firstName"
                                name="firstName"
                                value={userData.billingInfo.firstName}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700 mb-1">
                                Last Name
                            </label>
                            <input
                                type="text"
                                id="lastName"
                                name="lastName"
                                value={userData.billingInfo.lastName}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                    </div>

                    <div className="mb-4">
                        <label htmlFor="street" className="block text-sm font-medium text-gray-700 mb-1">
                            Street Address
                        </label>
                        <input
                            type="text"
                            id="street"
                            name="street"
                            value={userData.billingInfo.street}
                            onChange={handleBillingInfoChange}
                            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                        />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
                        <div>
                            <label htmlFor="city" className="block text-sm font-medium text-gray-700 mb-1">
                                City
                            </label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                value={userData.billingInfo.city}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="state" className="block text-sm font-medium text-gray-700 mb-1">
                                State/Province
                            </label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                value={userData.billingInfo.state}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="zipcode" className="block text-sm font-medium text-gray-700 mb-1">
                                Postal Code
                            </label>
                            <input
                                type="text"
                                id="zipcode"
                                name="zipcode"
                                value={userData.billingInfo.zipcode}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <label htmlFor="country" className="block text-sm font-medium text-gray-700 mb-1">
                                Country
                            </label>
                            <input
                                type="text"
                                id="country"
                                name="country"
                                value={userData.billingInfo.country}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                        <div>
                            <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                id="phone"
                                name="phone"
                                value={userData.billingInfo.phone}
                                onChange={handleBillingInfoChange}
                                className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-gray-200"
                            />
                        </div>
                    </div>
                </div>

                <div className="mt-6 flex justify-end">
                    <button
                        type="submit"
                        disabled={isSaving}
                        className="px-6 py-2 bg-gray-800 text-white rounded hover:bg-gray-700 transition-colors duration-300 disabled:bg-gray-400"
                    >
                        {isSaving ? 'Saving...' : 'Save Changes'}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Profile;