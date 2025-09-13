'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Button } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, userChangeIsLoggedIn } from '~/redux/features/userSlide';
import './login.css';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const [userEmail, setUserEmail] = useState('');
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/';

    useEffect(() => {
        const user = localStorage.getItem('userData');
        if (user) {
            setAuthenticated(true);
            try {
                const parsed = JSON.parse(user);
                setUserEmail(parsed.email || parsed.username || '');
            } catch {
                setUserEmail('');
            }
        }
    }, []);

    const fetchLatestUserData = async (token) => {
        try {
            const response = await axios.get(
                'https://admin.jacobs-electronics.com/api/users/me?populate=address,contact_1,contact_2,dob',
                { headers: { Authorization: `Bearer ${token}` } }
            );
            if (response.status === 200) {
                const userData = response.data;
                const enrichedUserData = {
                    ...userData,
                    address: userData.address || null,
                    contact_1: userData.contact_1 || null,
                    contact_2: userData.contact_2 || null,
                    dob: userData.dob || null,
                };
                dispatch(setUser(enrichedUserData));
                localStorage.setItem('userData', JSON.stringify(enrichedUserData));
                setUserEmail(enrichedUserData.email || enrichedUserData.username || '');
                return enrichedUserData;
            }
        } catch (error) {
            console.error('Error fetching user data:', error);
            notification.error({
                message: 'Error',
                description: 'Failed to fetch additional user details.',
            });
            return null;
        }
    };

    const handleLogin = async (values) => {
        setLoading(true);
        try {
            const { username, password } = values;
            const response = await axios.post(
                'https://admin.jacobs-electronics.com/api/auth/local',
                { identifier: username, password }
            );

            if (response.status === 200) {
                const token = response.data.jwt;
                const userData = response.data.user;

                localStorage.setItem('authToken', token);
                localStorage.setItem('userData', JSON.stringify(userData));
                dispatch(userChangeIsLoggedIn({ isLoggedIn: true, user: userData }));

                await fetchLatestUserData(token);

                notification.success({
                    className: 'successmessage',
                    message: 'Login Successful!',
                    description: 'You are now logged in.',
                });

                router.push(redirectUrl);
            } else {
                throw new Error('Login failed');
            }
        } catch (error) {
            console.error('Login error:', error);
            notification.error({
                message: 'Login Failed',
                description:
                    error.response?.data?.error?.message ||
                    'Invalid credentials. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem('authToken');
        localStorage.removeItem('userData');
        setAuthenticated(false);
        setUserEmail('');
        dispatch(userChangeIsLoggedIn({ isLoggedIn: false, user: null }));
        router.push('/');
    };

    return (
        <div className="login-container">
            <div className="login-card">
                {!authenticated ? (
                    <>
                        <div className="login-tabs">
                            <span className="active-tab">Login</span>
                            <span
                                className="inactive-tab"
                                onClick={() => router.push('/account/register')}
                            >
                                Register
                            </span>
                        </div>

                        <h2 className="login-title">Log In to Your Account</h2>

                        <Form layout="vertical" onFinish={handleLogin}>
                            <Form.Item
                                name="username"
                                label="Username or Email"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email or username!',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter username or email" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="password"
                                label="Password"
                                rules={[
                                    { required: true, message: 'Please input your password!' },
                                ]}
                            >
                                <Input.Password placeholder="Enter password" size="large" />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="login-btn"
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </Button>

                            <div className="login-footer">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                        </Form>
                    </>
                ) : (
                    <div className="already-logged-in">
                        <div className="welcome-bar">
                            <span>Welcome,</span>
                            <span className="username">{userEmail}</span>
                        </div>
                        <div className="button-bar">
                            <Button type="link" onClick={() => router.push('/')}>
                                Go to Homepage
                            </Button>
                            <Button type="link" onClick={handleLogout}>
                                Logout
                            </Button>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
