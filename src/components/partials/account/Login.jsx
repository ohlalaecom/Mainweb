'use client';
import React, { useState } from 'react';
import Link from 'next/link';
import { Form, Input, notification, Button } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';

export default function Login() {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null); // To store user details
    const Router = useRouter();

    const handleLogin = async (values) => {
        const { Email, password } = values;

        try {
            // Replace with your Strapi login API URL
            const response = await axios.post('https://strapi-app-tntk.onrender.com/api/auth', {
                identifier: Email, // 'identifier' is used for email or username
                password: password,
            });

            if (response.status === 200) {
                // Assuming the response contains the user data
                const { user } = response.data;
                setUser(user);
                setIsLoggedIn(true);
                notification.success({
                    message: 'Login Successful!',
                    description: 'You have successfully logged in.',
                });
            }
        } catch (error) {
            console.log(error);
            notification.error({
            
                message: 'Login Failed',
                description: 'Invalid credentials. Please try again.',
            });
        }
    };

    const handleLogout = () => {
        setIsLoggedIn(false);
        setUser(null);
        notification.success({
            message: 'Logged Out',
            description: 'You have successfully logged out.',
        });
        Router.push('/account/login'); // Redirect to login page
    };

    if (isLoggedIn) {
        // If logged in, show user details and logout button
        return (
            <div className="ps-my-account">
                <div className="container">
                    <div className="ps-form--account">
                        <div className="ps-form__content">
                            <h5>Welcome, {user.email}</h5> {/* Assuming the user object has an 'email' field */}
                            <Button
                                type="primary"
                                onClick={handleLogout}
                                className="ps-btn ps-btn--fullwidth"
                            >
                                Logout
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form className="ps-form--account" onFinish={handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active">
                            <Link href={'/account/login'}>Login</Link>
                        </li>
                        <li>
                            <Link href={'/account/register'}>Register</Link>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="sign-in">
                        <div className="ps-form__content">
                            <h5>Log In Your Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="username"
                                    rules={[{ required: true, message: 'Please input your email or username!' }]}
                                >
                                    <Input
                                        className="form-control"
                                        type="text"
                                        placeholder="Username or email address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[{ required: true, message: 'Please input your password!' }]}
                                >
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group">
                                <div className="ps-checkbox">
                                    <input
                                        className="form-control"
                                        type="checkbox"
                                        id="remember-me"
                                        name="remember-me"
                                    />
                                    <label htmlFor="remember-me">Remember me</label>
                                </div>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                >
                                    Login
                                </button>
                            </div>
                        </div>
                        <div className="ps-form__footer">
                            <p>Connect with:</p>
                            <ul className="ps-list--social">
                                <li>
                                    <a
                                        className="facebook"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-facebook" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="google"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-google-plus" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="twitter"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-twitter" />
                                    </a>
                                </li>
                                <li>
                                    <a
                                        className="instagram"
                                        href="#"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <i className="fa fa-instagram" />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>
                </Form>
            </div>
        </div>
    );
}
