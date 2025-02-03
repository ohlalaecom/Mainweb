'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, notification, Button } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation'; // Next.js hooks
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, userChangeIsLoggedIn } from '~/redux/features/userSlide';
import './login.css';

export default function Login() {
    const router = useRouter();
    const dispatch = useDispatch();
    const [loading, setLoading] = useState(false);
    const [authenticated, setAuthenticated] = useState(false);
    const searchParams = useSearchParams();
    const redirectUrl = searchParams.get('redirect') || '/';

    useEffect(() => {
        const user = localStorage.getItem('userData');
        setAuthenticated(!!user); // If user data exists, authenticated = true
    }, []);

    const fetchLatestUserData = async (token) => {
        try {
            const response = await axios.get(
                'https://strapi-app-tntk.onrender.com/api/users/me?populate=address,contact_1,contact_2,dob',
                {
                    headers: { Authorization: `Bearer ${token}` },
                }
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
                'https://strapi-app-tntk.onrender.com/api/auth/local',
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
                    className: "successmessage",
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
                description: error.response?.data?.error?.message || 'Invalid credentials. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                {!authenticated ? (
                    <Form className="ps-form--account" onFinish={handleLogin}>
                        <ul className="ps-tab-list">
                            <li className="active">
                                <span>Login</span>
                            </li>
                            <li>
                                <span className="ps-tab-link" onClick={() => router.push('/account/register')}>
                                    Register
                                </span>
                            </li>
                        </ul>
                        <div className="ps-form__content">
                            <h5 className="ps-form-title">Log In to Your Account</h5>
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your email or username!' }]}
                            >
                                <Input className="form-control" placeholder="Username or email address" />
                            </Form.Item>
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}
                            >
                                <Input type="password" className="form-control" placeholder="Password" />
                            </Form.Item>
                            <Button
                                type="primary"
                                htmlType="submit"
                                className="ps-btn ps-btn--fullwidth"
                                style={{ height:"55px" }}
                                loading={loading}
                            >
                                {loading ? 'Logging In...' : 'Login'}
                            </Button>
                            <div className="ps-login-links">
                                <a href="/forgot-password">Forgot Password?</a>
                            </div>
                        </div>
                    </Form>
                ) : (
                    <div>
                        <h4>You are already logged in.</h4>
                        <Button type="link" onClick={() => router.push('/')}>
                            Go to Homepage
                        </Button>
                    </div>
                )}
            </div>
        </div>
    );
}
