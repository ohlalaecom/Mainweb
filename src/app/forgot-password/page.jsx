// 'use client';
// import React, { useState } from 'react';
// import { Form, Input, Button, notification } from 'antd';
// import { useRouter } from 'next/navigation';
// import axios from 'axios';
// import BreadCrumb from '~/components/elements/BreadCrumb';
// import PageContainer from '~/components/layouts/PageContainer';
// import FooterDefault from '~/components/shared/footers/FooterDefault';
// import Newletters from '~/components/partials/commons/Newletters';
// import '~/components/partials/account/forgot-password.css';

// export default function ForgotPassword() {
//     const router = useRouter();
//     const [loading, setLoading] = useState(false);

//     const breadCrumb = [
//         {
//             text: 'Home',
//             url: '/',
//         },
//         {
//             text: 'Forgot Password',
//         },
//     ];

//     const handleSubmit = async (values) => {
//         setLoading(true);
//         try {
//             const response = await axios.post('/api/forgot-password', {
//                 email: values.email,
//             });

//             if (response.data.success) {
//                 notification.success({
//                     message: 'Reset Link Sent',
//                     description: 'Please check your email for password reset instructions.',
//                 });
//                 router.push('/account/login');
//             } else {
//                 notification.error({
//                     message: 'Error',
//                     description: response.data.message || 'Failed to send reset email.',
//                 });
//             }
//         } catch (error) {
//             console.error('Forgot password error:', error);
//             notification.error({
//                 message: 'Error',
//                 description: error.response?.data?.message || 'An error occurred. Please try again.',
//             });
//         } finally {
//             setLoading(false);
//         }
//     };

//     return (
//         <PageContainer footer={<FooterDefault />} title="Forgot Password">
//             <div className="ps-page--my-account">
//                 <BreadCrumb breacrumb={breadCrumb} />
//                 <div className="forgot-password-container">
//                     <div className="forgot-password-card">
//                         <h2 className="forgot-password-title">Forgot Your Password?</h2>
//                         <p style={{ textAlign: 'center', marginBottom: 30, color: '#666' }}>
//                             Enter your email address and we'll send you a link to reset your password.
//                         </p>

//                         <Form layout="vertical" onFinish={handleSubmit}>
//                             <Form.Item
//                                 name="email"
//                                 label="Email Address"
//                                 rules={[
//                                     {
//                                         required: true,
//                                         message: 'Please input your email!',
//                                         type: 'email',
//                                     },
//                                 ]}
//                             >
//                                 <Input placeholder="Enter your email" size="large" />
//                             </Form.Item>

//                             <Button
//                                 type="primary"
//                                 htmlType="submit"
//                                 block
//                                 size="large"
//                                 loading={loading}
//                                 className="forgot-password-btn"
//                             >
//                                 {loading ? 'Sending...' : 'Send Reset Link'}
//                             </Button>

//                             <div className="forgot-password-footer">
//                                 <a href="/account/login">Back to Login</a>
//                             </div>
//                         </Form>
//                     </div>
//                 </div>
//                 <Newletters layout="container" />
//             </div>
//         </PageContainer>
//     );
// }

'use client';
import React, { useState } from 'react';
import { Form, Input, Button, notification } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import '~/components/partials/account/forgot-password.css';

export default function ForgotPassword() {
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Forgot Password',
        },
    ];

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const response = await axios.post('/api/forgot-password', {
                email: values.email,
            });

            if (response.data.success) {
                notification.success({
                    message: 'Reset Link Sent',
                    description: 'Please check your email for password reset instructions.',
                });
                router.push('/account/login');
            } else {
                notification.error({
                    message: 'Error',
                    description: response.data.message || 'Failed to send reset email.',
                });
            }
        } catch (error) {
            console.error('Forgot password error:', error);
            notification.error({
                message: 'Error',
                description: error.response?.data?.message || 'An error occurred. Please try again.',
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <PageContainer footer={<FooterDefault />} title="Forgot Password">
            <div className="ps-page--my-account">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="forgot-password-container">
                    <div className="forgot-password-card">
                        <h2 className="forgot-password-title">Forgot Your Password?</h2>
                        <p style={{ textAlign: 'center', marginBottom: 30, color: '#666' }}>
                            Enter your email address and we'll send you a link to reset your password.
                        </p>

                        <Form layout="vertical" onFinish={handleSubmit}>
                            <Form.Item
                                name="email"
                                label="Email Address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Please input your email!',
                                        type: 'email',
                                    },
                                ]}
                            >
                                <Input placeholder="Enter your email" size="large" />
                            </Form.Item>

                            <Button
                                type="primary"
                                htmlType="submit"
                                block
                                size="large"
                                loading={loading}
                                className="forgot-password-btn"
                            >
                                {loading ? 'Sending...' : 'Send Reset Link'}
                            </Button>

                            <div className="forgot-password-footer">
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