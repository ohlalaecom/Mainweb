'use client';
import React, { useState, useEffect } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useRouter, useSearchParams } from 'next/navigation';
import axios from 'axios';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import '~/components/partials/account/reset-password.css';

export default function ResetPassword() {
    const router = useRouter();
    const searchParams = useSearchParams();
    const [loading, setLoading] = useState(false);
    const [token, setToken] = useState('');

    useEffect(() => {
        const tokenParam = searchParams.get('token');
        if (tokenParam) {
            setToken(tokenParam);
        } else {
            notification.error({
                message: 'Invalid Reset Link',
                description: 'The password reset link is invalid or expired.',
            });
            router.push('/account/login');
        }
    }, [searchParams, router]);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Reset Password',
        },
    ];

    const handleSubmit = async (values) => {
        if (values.password !== values.confirmPassword) {
            notification.error({
                message: 'Password Mismatch',
                description: 'Passwords do not match. Please try again.',
            });
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('/api/reset-password', {
                token,
                password: values.password,
            });

            if (response.data.success) {
                notification.success({
                    message: 'Password Reset Successful',
                    description: 'Your password has been reset. You can now log in with your new password.',
                });
                router.push('/account/login');
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message || 'Failed to reset password.',
                });
            }
        } catch (error) {
            console.error('Reset password error:', error);
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer footer={<FooterDefault />} title="Reset Password">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="reset-password-container">
                    <div className="reset-password-card">
                        <h2 className="reset-password-title">Reset Your Password</h2>
                        <p style={{ textAlign: 'center', marginBottom: 30, color: '#666' }}>
                            Enter your new password below.
                        </p>

                        <Form layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                name="password"
                                label="New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your new password!',
                                    },
                                    {
                                        min: 6,
                                        message: 'Password must be at least 6 characters long.',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Enter new password" size="large" />
                            </Form.Item>

                            <Form.Item
                                name="confirmPassword"
                                label="Confirm New Password"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please confirm your new password!',
                                    },
                                ]}
                            >
                                <Input.Password placeholder="Confirm new password" size="large" />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="reset-password-btn"
                            >
                                {loading ? 'Resetting...' : 'Reset Password'}
                            </Button>

                            <div className="reset-password-footer">
                                <a href="/account/login">Back to Login</a>
                            </div>
                        </Form>
                    </div>
                </div>
                <Newletters layout="container" />
            </div>
        </PageContainer>
    );
}