'use client'; // Mark this as a client component

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import FormCheckoutInformation from './modules/FormCheckoutInformation';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';
import axios from 'axios';

const Checkout = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [isMounted, setIsMounted] = useState(false);
    const router = useRouter();


    const [triggerAction, setTriggerAction] = useState(false);

    // Function to trigger the action in B.js
    const handleActionInB = () => {
        setTriggerAction(true); // Set trigger to true, indicating the action needs to be run
    };


    // useEffect for component mounting and checking authentication
    useEffect(() => {
        setIsMounted(true); // Ensure component is mounted
        if (isMounted) {
            checkAuthentication();
        }
    }, [isMounted]);

    // Check authentication and handle redirection if not authenticated
    const checkAuthentication = async () => {
        const user = localStorage.getItem('userData'); // Check if the user is stored in localStorage

        if (user) {

            setIsAuthenticated(true);

            setIsLoading(false);
        } else {
            console.log("idi else stage");
            try {
                console.log("else lo try ");
                const response = await axios.get(
                    'http://157.230.29.110:1337/api/auth/local',
                    { withCredentials: true }
                );

                if (response.data?.user) {

                    localStorage.setItem('user', JSON.stringify(response.data.user)); // Save user info
                    setIsAuthenticated(true);
                } else {
                    console.log("idi final else ");
                    redirectToLogin();
                }
            } catch (error) {

                console.error('Error checking authentication:', error);
                redirectToLogin();
            } finally {
                setIsLoading(false);
            }
        }
    };

    // Redirect the user to the login page with a redirect URL after successful login
    const redirectToLogin = () => {

        const redirectUrl = encodeURIComponent('/account/checkout'); // Save the current URL account/checkout
        router.push(`/account/login?redirect=${redirectUrl}`); // Redirect to login with redirect URL 
    };

    // useEffect for handling redirection after authentication
    useEffect(() => {
        if (isAuthenticated) {

            const queryParams = new URLSearchParams(window.location.search);
            const redirectTo = queryParams.get('redirect') || '/'; // Default to home if no redirect parameter exists
            const url = new URL(window.location.href);
            url.searchParams.delete('redirect'); // Remove the redirect parameter from the URL

            window.history.pushState({}, '', url);

            router.push("/account/checkout"); // Redirect user after successful login

        }
    }, [isAuthenticated, router]);

    if (!isMounted) return null; // Prevent rendering while the component is mounting

    // Show loading state while checking authentication
    if (isLoading) {
        return (
            <div className="ps-checkout-loading">
                <p>Loading...</p>
            </div>
        );
    }

    // If not authenticated, return null and prevent rendering the checkout page
    if (!isAuthenticated) {
        return null;
    }

    // Return the checkout page content if authenticated
    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h2>Checkout Information</h2>
                </div>
                <div className="ps-section__content">
                    <div className="ps-form--checkout">
                        <div className="ps-form__content">
                            <div className="row">
                                <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                                    <FormCheckoutInformation onSubmit={handleActionInB} />
                                </div>
                                <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 ps-block--checkout-order">
                                    <div className="ps-form__orders">
                                        <h3>Your Order</h3>
                                        <ModulePaymentOrderSummary triggerAction={triggerAction} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Checkout;
