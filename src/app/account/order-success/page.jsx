'use client';
import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Button, notification } from 'antd';
import axios from 'axios';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

export default function OrderSuccess() {
    const router = useRouter();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Success',
        },
    ];

    const handleOk = () => {
        router.push('/');
    };

    useEffect(() => {
        // Send order confirmation email when component mounts
        sendOrderConfirmationEmail();
    }, []);

    const sendOrderConfirmationEmail = async () => {
        try {
            const userData = localStorage.getItem('userData');
            const selectedAddress = localStorage.getItem('selectedAddress');

            if (!userData || !selectedAddress) {
                console.warn('User data or address not found for email');
                return;
            }

            const user = JSON.parse(userData);
            const address = JSON.parse(selectedAddress);

            const html = `
                <div style="max-width:600px;margin:0 auto;padding:20px;background:#f9fafb;border-radius:10px;font-family:Arial,sans-serif;color:#333;box-shadow:0 2px 8px rgba(0,0,0,0.1)">
                    <div style="text-align:center;margin-bottom:20px;">
                        <img src="https://jacobs-electronics.com/static/img/logo_light.png" alt="Jacobs Electronics" style="width:180px;height:auto;" />
                    </div>

                    <div style="background:#ffffff;padding:25px;border-radius:8px;">
                        <h2 style="color:#003366;">Order Confirmation</h2>
                        <p style="font-size:15px;line-height:1.6;">
                            Dear ${user.username || user.email},<br/>
                            Thank you for your order! Your order has been successfully placed and will be processed shortly.
                        </p>

                        <div style="margin:20px 0;padding:15px;background:#f1f5f9;border-radius:8px;">
                            <h3 style="margin:0 0 10px 0;color:#003366;">Order Details:</h3>
                            <p style="margin:5px 0;"><strong>Order Date:</strong> ${new Date().toLocaleDateString()}</p>
                            <p style="margin:5px 0;"><strong>Payment Method:</strong> Cash on Delivery</p>
                            <p style="margin:5px 0;"><strong>Shipping Address:</strong></p>
                            <p style="margin:5px 0;">${address.Address || ''}, ${address.Area || ''}, ${address.City || ''}, ${address.Country || ''} - ${address.Postal_Code || ''}</p>
                        </div>

                        <p style="font-size:14px;line-height:1.6;">
                            We will contact you soon to confirm the delivery details. You can track your order status in your account dashboard.
                        </p>

                        <div style="text-align:center;margin-top:25px;">
                            <a href="https://jacobs-electronics.com/account/my-account"
                               style="display:inline-block;background:#003366;color:#fff;padding:10px 20px;border-radius:5px;text-decoration:none;font-weight:bold;">
                               View Order Details
                            </a>
                        </div>

                        <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;"/>
                        <p style="font-size:12px;text-align:center;color:#777;">
                            © ${new Date().getFullYear()} Jacobs Electronics. All rights reserved.<br/>
                            Need help? Contact us at <a href="mailto:contact@jacobs-electronics.com" style="color:#003366;text-decoration:none;">contact@jacobs-electronics.com</a>
                        </p>
                    </div>
                </div>
            `;

            const emailResponse = await axios.post('/api/sendEmail', {
                to: user.email,
                subject: 'Order Confirmation - Jacobs Electronics',
                html,
            });

            if (emailResponse.data.success) {
                console.log('Order confirmation email sent successfully');
            } else {
                console.warn('Failed to send order confirmation email:', emailResponse.data.message);
            }
        } catch (error) {
            console.error('Error sending order confirmation email:', error);
        }
    };

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Order Success">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="container">
                        <div className="ps-section__content">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    <div className="ps-section__block">
                                        <div className="ps-block__header">
                                            <h3>Thank you for your order!</h3>
                                        </div>
                                        <div className="ps-block__content">
                                            <p>Your order has been placed successfully with Cash on Delivery. We will contact you soon to confirm the details.</p>
                                            <p>Order ID and other details are available in your account. A confirmation email has been sent to your registered email address.</p>
                                            <div className="ps-block__footer text-center">
                                                <Button type="primary" size="large" onClick={handleOk}>
                                                    Back to Home
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Newletters layout="container" />
                </div>
            </PageContainer>
        </>
    );
}