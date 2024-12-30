'use client';
import React from 'react';
import { Form, Input, notification, Button, Modal } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { setUser, userChangeIsLoggedIn } from '~/redux/features/userSlide'; // Import Redux actions
import './login.css';

export default function Login() {
    const Router = useRouter();
    const dispatch = useDispatch(); // Dispatch to update the Redux store
    const [loading, setLoading] = React.useState(false); // For loading state
    const [isModalVisible, setIsModalVisible] = React.useState(false); // For success modal

    const handleLogin = async (values) => {
        const { username, password } = values;
        setLoading(true); // Set loading state to true while waiting for API response

        try {
            // Sending login credentials to the API
            const response = await axios.post(
                'https://strapi-app-tntk.onrender.com/api/auth/local',
                { identifier: username, password }
            );

            if (response.status === 200) {
                // Successfully logged in

                // Assuming the response contains user data
                const userData = response.data.user;

                // Store user data and update login state in Redux
                dispatch(setUser(userData));
                dispatch(userChangeIsLoggedIn({ isLoggedIn: true, user: userData }));

                // Display success notification
                notification.success({
                    message: 'Login Successful!',
                    description: 'You are now logged in.',
                });

                // Redirect to home page
                Router.push('/');
            }
        } catch (error) {
            console.error(error);

            // Display error notification on failure
            notification.error({
                message: 'Login Failed',
                description: error.response?.data?.error?.message || 'Invalid credentials. Please try again.',
            });
        } finally {
            setLoading(false); // Reset loading state after the response
        }
    };

    return (
        <div className="ps-my-account">
            <div className="container">
                <Form className="ps-form--account" onFinish={handleLogin}>
                    <ul className="ps-tab-list">
                        <li className="active" style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <a href={'/account/login'}>Login</a>
                        </li>
                        <li style={{ marginLeft: "auto", marginRight: "auto" }}>
                            <a href={'/account/register'}>Register</a>
                        </li>
                    </ul>
                    <div className="ps-form__content">
                        <h5 className="ps-form-title">Log In to Your Account</h5>
                        <div className="form-group">
                            <Form.Item
                                name="username"
                                rules={[{ required: true, message: 'Please input your email or username!' }]}>
                                <Input
                                    className="form-control"
                                    type="email"
                                    placeholder="Username or email address"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group">
                            <Form.Item
                                name="password"
                                rules={[{ required: true, message: 'Please input your password!' }]}>
                                <Input
                                    className="form-control"
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                        </div>
                        <div className="form-group submit">
                            <Button
                                type="submit"
                                className="ps-btn ps-btn--fullwidth"
                                htmlType="submit"
                                style={{height: "59px"}}
                                loading={loading} >
                                {loading ? 'Logging In...' : ''}
                                Login
                            </Button>
                        </div>
                    </div>
                </Form>
            </div>

            {/* Success Modal */}
            <Modal
                title="Login Successful"
                visible={isModalVisible}
                onOk={() => Router.push('/')}
                onCancel={() => setIsModalVisible(false)}
            >
                <p>You are successfully logged in!</p>
            </Modal>
        </div>
    );
}
