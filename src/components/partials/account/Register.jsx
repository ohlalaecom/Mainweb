// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Form, Input, message, Modal } from 'antd';
// // import axios from 'axios';

// // export default function Register() {
// //     const [loading, setLoading] = useState(false);
// //     const [isModalVisible, setIsModalVisible] = useState(false); // For success modal
// //     const [isClient, setIsClient] = useState(false); // Client-side check
// //     const [user, setUser] = useState(null);

// //     const router = useRouter(); // Declare the router here

// //     useEffect(() => {
// //         // Check if the code is running on the client side
// //         setIsClient(true);
// //     }, []);

// //     const handleSubmit = async (values) => {
// //         setLoading(true);
// //         try {
// //             // Strapi API endpoint for Customers
// //             const response = await axios.post('https://admin.jacobs-electronics.com/api/customers', {
// //                 data: {
// //                     email: values.Email,
// //                     password: values.password,
// //                 },
// //             });

// //             if (response.status === 200 || response.status === 201) {
// //                 message.success('Registration successful!');
// //                 setIsModalVisible(true); // Show modal upon successful registration
// //             } else {
// //                 message.error('Registration failed. Please try again.');
// //             }
// //         } catch (error) {
// //             console.error(error);
// //             message.error('An error occurred during registration.');
// //         } finally {
// //             setLoading(false);
// //         }
// //     };

// //     const handleOk = () => {
// //         setIsModalVisible(false);
// //         // After successful registration, log the user in and redirect
// //         setUser({ email: 'user@example.com' }); // Simulate setting user info
// //         if (router) {
// //             router.push('/'); // Redirect to home after login
// //         }
// //     };

// //     if (!isClient) {
// //         return null; // Render nothing on the server side
// //     }

// //     return (
// //         <div className="ps-my-account">
// //             <div className="container">
// //                 <Form
// //                     className="ps-form--account"
// //                     onFinish={handleSubmit}
// //                 >
// //                     <ul className="ps-tab-list">
// //                         <li>
// //                             <a href={'/account/login'}>Login</a>
// //                         </li>
// //                         <li className="active">
// //                             <a href={'/account/register'}>Register</a>
// //                         </li>
// //                     </ul>
// //                     <div className="ps-tab active" id="register">
// //                         <div className="ps-form__content">
// //                             <h5>Register An Account</h5>
// //                             <div className="form-group">
// //                                 <Form.Item
// //                                     name="Email"
// //                                     rules={[
// //                                         {
// //                                             required: true,
// //                                             message: 'Please input your email!',
// //                                             type: 'email',
// //                                         },
// //                                     ]}
// //                                 >
// //                                     <Input
// //                                         className="form-control"
// //                                         type="email"
// //                                         placeholder="Email address"
// //                                     />
// //                                 </Form.Item>
// //                             </div>
// //                             <div className="form-group form-forgot">
// //                                 <Form.Item
// //                                     name="password"
// //                                     rules={[
// //                                         {
// //                                             required: true,
// //                                             message: 'Please input your password!',
// //                                         },
// //                                     ]}
// //                                 >
// //                                     <Input
// //                                         className="form-control"
// //                                         type="password"
// //                                         placeholder="Password..."
// //                                     />
// //                                 </Form.Item>
// //                             </div>
// //                             <div className="form-group submit">
// //                                 <button
// //                                     type="submit"
// //                                     className="ps-btn ps-btn--fullwidth"
// //                                     disabled={loading}
// //                                 >
// //                                     {loading ? 'Registering...' : 'Register'}
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </Form>
// //             </div>

// //             {/* Success Modal */}
// //             <Modal
// //                 title="Registration Successful"
// //                 visible={isModalVisible}
// //                 onOk={handleOk}
// //                 onCancel={() => setIsModalVisible(false)}
// //             >
// //                 <p>Your registration was successful. You will now be logged in.</p>
// //             </Modal>
// //         </div>
// //     );
// // }
// // 'use client';
// // import React, { useState, useEffect } from 'react';
// // import { useRouter } from 'next/navigation';
// // import { Form, Input, message, Modal } from 'antd';
// // import axios from 'axios';

// // export default function Register() {
// //     const [loading, setLoading] = useState(false);
// //     const [isModalVisible, setIsModalVisible] = useState(false); // For success modal
// //     const [isClient, setIsClient] = useState(false); // Client-side check
// //     const [user, setUser] = useState(null);

// //     const router = useRouter(); // Declare the router here

// //     useEffect(() => {
// //         // Check if the code is running on the client side
// //         setIsClient(true);
// //     }, []);

// //     const handleSubmit = async (values) => {
// //         setLoading(true);
// //         try {
// //             console.log('Registering user...');
// //             const response = await axios.post(
// //                 'https://admin.jacobs-electronics.com/api/auth/local/register',
// //                 {
// //                     username: values.Email, // Use email as the username
// //                     email: values.Email,
// //                     password: values.password,
// //                 }
// //             );

// //             if (response.status === 200 || response.status === 201) {
// //                 console.log('Registration successful:', response.data);
// //                 message.success('Registration successful!');
// //                 setIsModalVisible(true); // Show modal upon successful registration
// //             } else {
// //                 console.error('Unexpected response:', response);
// //                 message.error('Registration failed. Please try again.');
// //             }
// //         } catch (error) {
// //             console.error('Registration error:', error.response?.data || error.message);
// //             message.error(
// //                 error.response?.data?.message || 'An error occurred during registration.'
// //             );
// //         } finally {
// //             setLoading(false);
// //         }
// //     };



// //     const handleOk = () => {
// //         setIsModalVisible(false);
// //         // After successful registration, log the user in and redirect
// //         if (router) {
// //             router.push('/'); // Redirect to home after registration
// //         }
// //     };

// //     if (!isClient) {
// //         return null; // Render nothing on the server side
// //     }

// //     return (
// //         <div className="ps-my-account">
// //             <div className="container">
// //                 <Form className="ps-form--account" onFinish={handleSubmit}>
// //                     <ul className="ps-tab-list">
// //                         <li>
// //                             <a href={'/account/login'}>Login</a>
// //                         </li>
// //                         <li className="active">
// //                             <a href={'/account/register'}>Register</a>
// //                         </li>
// //                     </ul>
// //                     <div className="ps-tab active" id="register">
// //                         <div className="ps-form__content">
// //                             <h5>Register An Account</h5>
// //                             <div className="form-group">
// //                                 <Form.Item
// //                                     name="Email"
// //                                     rules={[
// //                                         {
// //                                             required: true,
// //                                             message: 'Please input your email!',
// //                                             type: 'email',
// //                                         },
// //                                     ]}
// //                                 >
// //                                     <Input
// //                                         className="form-control"
// //                                         type="email"
// //                                         placeholder="Email address"
// //                                     />
// //                                 </Form.Item>
// //                             </div>
// //                             <div className="form-group form-forgot">
// //                                 <Form.Item
// //                                     name="password"
// //                                     rules={[
// //                                         {
// //                                             required: true,
// //                                             message: 'Please input your password!',
// //                                         },
// //                                     ]}
// //                                 >
// //                                     <Input
// //                                         className="form-control"
// //                                         type="password"
// //                                         placeholder="Password..."
// //                                     />
// //                                 </Form.Item>
// //                             </div>
// //                             <div className="form-group submit">
// //                                 <button
// //                                     type="submit"
// //                                     className="ps-btn ps-btn--fullwidth"
// //                                     disabled={loading}
// //                                 >
// //                                     {loading ? 'Registering...' : 'Register'}
// //                                 </button>
// //                             </div>
// //                         </div>
// //                     </div>
// //                 </Form>
// //             </div>

// //             {/* Success Modal */}
// //             <Modal
// //                 title="Registration Successful"
// //                 visible={isModalVisible}
// //                 onOk={handleOk}
// //                 onCancel={() => setIsModalVisible(false)}
// //             >
// //                 <p>Your registration was successful. You will now be redirected.</p>
// //             </Modal>
// //         </div>
// //     );
// // }

// 'use client';
// import React, { useState, useEffect } from 'react';
// import { useRouter } from 'next/navigation';
// import { Form, Input, message, Modal } from 'antd';
// import axios from 'axios';

// export default function Register() {
//     const [loading, setLoading] = useState(false);
//     const [isModalVisible, setIsModalVisible] = useState(false); // For success modal
//     const [isClient, setIsClient] = useState(false); // Client-side check
//     const [user, setUser] = useState(null);

//     const router = useRouter(); // Declare the router here

//     useEffect(() => {
//         // Check if the code is running on the client side
//         setIsClient(true);
//     }, []);

//     const handleSubmit = async (values) => {
//         setLoading(true);
//         try {
//             // Split email into username (before @) and domain (after @)
//             const [beforeAt, afterAt] = values.Email.split('@');
//             const username = beforeAt; // You can also use `${beforeAt}_${afterAt}` if needed

//             const response = await axios.post(
//                 'https://admin.jacobs-electronics.com/api/auth/local/register',
//                 {
//                     username,
//                     email: values.Email,
//                     password: values.password,
//                 }
//             );

//             if (response.status === 200 || response.status === 201) {
//                 message.success('Registration successful!');
//                 setIsModalVisible(true); // Show modal upon successful registration
//             } else {
//                 console.error('Unexpected response:', response);
//                 message.error('Registration failed. Please try again.');
//             }
//         } catch (error) {
//             console.error(
//                 'Registration error:',
//                 error.response?.data || error.message
//             );
//             message.error(
//                 error.response?.data?.message ||
//                     'An error occurred during registration.'
//             );
//         } finally {
//             setLoading(false);
//         }
//     };

//     const handleOk = () => {
//         setIsModalVisible(false);
//         // After successful registration, log the user in and redirect
//         if (router) {
//             router.push('/'); // Redirect to home after registration
//         }
//     };

//     if (!isClient) {
//         return null; // Render nothing on the server side
//     }

//     return (
//         <div className="ps-my-account">
//             <div className="container">
//                 <Form className="ps-form--account" onFinish={handleSubmit}>
//                     <ul className="ps-tab-list">
//                         <li>
//                             <a href={'/account/login'}>Login</a>
//                         </li>
//                         <li className="active">
//                             <a href={'/account/register'}>Register</a>
//                         </li>
//                     </ul>
//                     <div className="ps-tab active" id="register">
//                         <div className="ps-form__content">
//                             <h5>Register An Account</h5>
//                             <div className="form-group">
//                                 <Form.Item
//                                     name="Email"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message: 'Please input your email!',
//                                             type: 'email',
//                                         },
//                                     ]}>
//                                     <Input
//                                         className="form-control"
//                                         type="email"
//                                         placeholder="Email address"
//                                     />
//                                 </Form.Item>
//                             </div>
//                             <div className="form-group form-forgot">
//                                 <Form.Item
//                                     name="password"
//                                     rules={[
//                                         {
//                                             required: true,
//                                             message:
//                                                 'Please input your password!',
//                                         },
//                                     ]}>
//                                     <Input
//                                         className="form-control"
//                                         type="password"
//                                         placeholder="Password..."
//                                     />
//                                 </Form.Item>
//                             </div>
//                             <div className="form-group submit">
//                                 <button
//                                     type="submit"
//                                     className="ps-btn ps-btn--fullwidth"
//                                     disabled={loading}>
//                                     {loading ? 'Registering...' : 'Register'}
//                                 </button>
//                             </div>
//                         </div>
//                     </div>
//                 </Form>
//             </div>

//             {/* Success Modal */}
//             <Modal
//                 title="Registration Successful"
//                 visible={isModalVisible}
//                 onOk={handleOk}
//                 onCancel={() => setIsModalVisible(false)}>
//                 <p>
//                     Your registration was successful. You will now be
//                     redirected.
//                 </p>
//             </Modal>
//         </div>
//     );
// }

'use client';
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Form, Input, message, Modal } from 'antd';
import axios from 'axios';
import './register.css';

export default function Register() {
    const [loading, setLoading] = useState(false);
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [isClient, setIsClient] = useState(false);

    const router = useRouter();

    useEffect(() => {
        setIsClient(true);
    }, []);

    const handleSubmit = async (values) => {
        setLoading(true);
        try {
            const [beforeAt] = values.email.split('@');
            const username = beforeAt;

            const response = await axios.post(
                'https://admin.jacobs-electronics.com/api/auth/local/register',
                {
                    username,
                    email: values.email,
                    password: values.password,
                }
            );

            if (response.status === 200 || response.status === 201) {
                console.log('Sending registration email with credentials to ' + values.email + ', username: ' + username + ', password: ' + values.password);
                console.log('Email will be sent via Strapi when configured.');
                message.success('Registration successful!');
                setIsModalVisible(true);
            } else {
                message.error('Registration failed. Please try again.');
            }
        } catch (error) {
            console.error('Registration error:', error.response?.data || error.message);
            message.error(
                error.response?.data?.message || 'An error occurred during registration.'
            );
        } finally {
            setLoading(false);
        }
    };

    const handleOk = () => {
        setIsModalVisible(false);
        router.push('/');
    };

    if (!isClient) return null;

    return (
        <div className="register-container">
            <div className="register-card">
                <div className="register-tabs">
                    <span onClick={() => router.push('/account/login')} className="inactive-tab">Login</span>
                    <span className="active-tab">Register</span>
                </div>

                <h2 className="register-title">Create Your Account</h2>

                <Form layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        name="email"
                        label="Email Address"
                        rules={[
                            { required: true, message: 'Please input your email!', type: 'email' },
                        ]}
                    >
                        <Input placeholder="Enter your email" size="large" />
                    </Form.Item>

                    <Form.Item
                        name="password"
                        label="Password"
                        rules={[
                            { required: true, message: 'Please input your password!' },
                        ]}
                    >
                        <Input.Password placeholder="Enter your password" size="large" />
                    </Form.Item>

                    <button
                        type="submit"
                        className="ps-btn ps-btn--fullwidth register-btn"
                        disabled={loading}
                    >
                        {loading ? 'Registering...' : 'Register'}
                    </button>
                </Form>
            </div>

            <Modal
                title="Registration Successful"
                open={isModalVisible}
                onOk={handleOk}
                onCancel={() => setIsModalVisible(false)}
            >
                <p>Your registration was successful. You will now be redirected.</p>
            </Modal>
        </div>
    );
}
