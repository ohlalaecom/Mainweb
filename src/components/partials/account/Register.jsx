'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false); // For success modal
    const [isClient, setIsClient] = useState(false); // Client-side check
    const [user, setUser] = useState(null);
    
    const router = useRouter(); // Declare the router here

    useEffect(() => {
        // Check if the code is running on the client side
        setIsClient(true);
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            // Strapi API endpoint for Customers
            const response = await axios.post('https://strapi-app-tntk.onrender.com/api/customers', {
                data: {
                    Email: values.Email,
                    password: values.password,
                },
            });

            if (response.status === 200 || response.status === 201) {
                message.success('Registration successful!');
                setIsModalVisible(true); // Show modal upon successful registration
            } else {
                message.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error(error);
            message.error('An error occurred during registration.');
        } finally {
            setLoading(false);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        // After successful registration, log the user in and redirect
        setUser({ email: 'user@example.com' }); // Simulate setting user info
        if (router) {
            router.push('/'); // Redirect to home after login
        }
    };

    if (!isClient) {
        return null; // Render nothing on the server side
    }

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form
                    className="ps-form--account"
                    onFinish={handleSubmit}
                >
                    <ul className="ps-tab-list">
                        <li>
                            <a href={'/account/login'}>Login</a>
                        </li>
                        <li className="active">
                            <a href={'/account/register'}>Register</a>
                        </li>
                    </ul>
                    <div className="ps-tab active" id="register">
                        <div className="ps-form__content">
                            <h5>Register An Account</h5>
                            <div className="form-group">
                                <Form.Item
                                    name="Email"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your email!',
                                            type: 'email',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-control"
                                        type="email"
                                        placeholder="Email address"
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group form-forgot">
                                <Form.Item
                                    name="password"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your password!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="form-control"
                                        type="password"
                                        placeholder="Password..."
                                    />
                                </Form.Item>
                            </div>
                            <div className="form-group submit">
                                <button
                                    type="submit"
                                    className="ps-btn ps-btn--fullwidth"
                                    disabled={loading}
                                >
                                    {loading ? 'Registering...' : 'Register'}
                                </button>
                            </div>
                        </div>
                    </div>
                </Form>
            </div>

            {/* Success Modal */}
            <Modal
                title="Registration Successful"
                visible={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <p>Your registration was successful. You will now be logged in.</p>
            </Modal>
        </div>
    );
}
