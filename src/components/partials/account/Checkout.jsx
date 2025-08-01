'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import axios from 'axios';

const Checkout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [triggerAction, setTriggerAction] = useState(false);
    const router = useRouter();

    // Trigger callback for order summary update
    const handleActionInB = () => {
        setTriggerAction(true);
    };

    // Check if user is authenticated
    const checkAuthentication = async () => {
        try {
            const userData = localStorage.getItem('userData');

            if (userData) {
                setIsAuthenticated(true);
            } else {
                // Try server-based auth check (fallback)
                const response = await axios.get('https://admin.jacobs-electronics.com/api/auth/local', {
                    withCredentials: true
                });

                if (response.data?.user) {
                    localStorage.setItem('userData', JSON.stringify(response.data.user));
                    setIsAuthenticated(true);
                } else {
                    redirectToLogin();
                }
            }
        } catch (error) {
            console.error('Auth error:', error);
            redirectToLogin();
        } finally {
            setIsLoading(false);
        }
    };

    // Redirect to login page with intended return URL
    const redirectToLogin = () => {
        const redirectUrl = encodeURIComponent('/account/checkout');
        router.push(`/account/login?redirect=${redirectUrl}`);
    };

    // On mount, check authentication
    useEffect(() => {
        checkAuthentication();
    }, []);

    // Once authenticated, clean up `redirect` from URL
    useEffect(() => {
        if (isAuthenticated) {
            const url = new URL(window.location.href);
            if (url.searchParams.has('redirect')) {
                url.searchParams.delete('redirect');
                window.history.replaceState({}, '', url.toString());
            }
        }
    }, [isAuthenticated]);

    // While loading
    if (isLoading) {
        return (
            <div className="ps-checkout-loading" style={{ textAlign: 'center', padding: '60px 0' }}>
                <p>Loading...</p>
            </div>
        );
    }

    // Block rendering if not authenticated
    if (!isAuthenticated) return null;

    // Render checkout layout
return (
    <div className="ps-checkout ps-section--shopping" style={{ backgroundColor: '#f7f9fc', paddingTop: 30, paddingBottom: 60 }}>
        <div className="container">
            <div className="ps-section__header" style={{ marginBottom: 10 }}>
                <h2 style={{ fontSize: '28px', fontWeight: '600', marginBottom: 0, paddingBottom: 0 }}>Checkout Information</h2>
            </div>

            <div className="ps-section__content">
                <div className="ps-form--checkout">
                    <div className="ps-form__content">
                        <div className="row">
                            {/* Left Column */}
                            <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                <div
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 12,
                                        padding: '24px',
                                        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    <FormCheckoutInformation onSubmit={handleActionInB} />
                                </div>
                            </div>

                            {/* Right Column */}
                            <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12">
                                <div
                                    className="ps-form__orders"
                                    style={{
                                        background: '#fff',
                                        border: '1px solid #e0e0e0',
                                        borderRadius: 12,
                                        padding: '24px',
                                        boxShadow: '0 1px 6px rgba(0, 0, 0, 0.05)',
                                    }}
                                >
                                    <h3 style={{ fontSize: '22px', fontWeight: '500', marginBottom: 20 }}>Your Order</h3>
                                    <ModulePaymentOrderSummary triggerAction={triggerAction} />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
)

};

export default Checkout;
