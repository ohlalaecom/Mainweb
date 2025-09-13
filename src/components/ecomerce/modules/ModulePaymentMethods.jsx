import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { useRouter } from "next/navigation";
import axios from 'axios';
import { useCookies } from 'react-cookie';
import { useDispatch } from 'react-redux';
import {
    changeCartItems,
} from '~/redux/features/ecommerceSlide';
import "./paymentStyles.css"; // Ensure you have this file for additional styling

const ModulePaymentMethods = () => {
    const Router = useRouter();
    const [method, setMethod] = useState(3); // Default to COD
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [paymentInstance, setPaymentInstance] = useState(null);
    const [cookies, setCookie] = useCookies(['cart', 'jwt']);
    const dispatch = useDispatch();

    useEffect(() => {
        const script = document.createElement("script");
        script.src = "https://developers.mypos.com/repository/mypos-embedded-sdk.js";
        script.async = true;
        script.onload = () => {
            console.log("myPOS SDK Loaded");
            setSdkLoaded(true);
        };
        script.onerror = () => console.error("Failed to load myPOS SDK");
        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, []);

    useEffect(() => {
        if (sdkLoaded && window.MyPOSEmbedded) {
            const paymentParams = {
                sid: "000000000000010",
                ipcLanguage: "en",
                walletNumber: "61938166610",
                amount: 23.45,
                currency: "EUR",
                orderID: Math.random().toString(36).substr(2, 9),
                urlNotify: "https://yourwebsite.com/payment-notify",
                urlOk: "https://yourwebsite.com/payment-success",
                urlCancel: "https://yourwebsite.com/payment-failed",
                keyIndex: 1,
                cartItems: [
                    { article: "HP ProBook 6360b sticker", quantity: 2, price: 10, currency: "EUR" },
                    { article: "Delivery", quantity: 1, price: 3.45, currency: "EUR" }
                ]
            };

            const callbackParams = {
                isSandbox: true,
                onSuccess: (data) => {
                    console.log("Payment Successful!", data);
                    Router.push("/account/payment-success");
                },
                onError: () => {
                    console.error("Payment Failed!");
                }
            };

            window.MyPOSEmbedded.createPaymentForm("myPOS-payment-form", paymentParams, callbackParams)
                .then((payment) => {
                    setPaymentInstance(payment);
                })
                .catch((err) => console.error("Failed to initialize payment", err));
        }
    }, [sdkLoaded]);

    const handleCODSubmit = async () => {
        console.log('Creating COD order...');
        try {
            // Get cart from cookies
            const cart = cookies.cart || [];
            if (cart.length === 0) {
                console.error('Cart is empty');
                alert('Cart is empty. Please add items before placing order.');
                return;
            }

            // Get user data from localStorage
            const userDataStr = localStorage.getItem('userData');
            const userData = userDataStr ? JSON.parse(userDataStr) : null;
            if (!userData || !userData.id) {
                console.error('User not logged in or no user ID');
                alert('Please log in to place an order.');
                return;
            }

            // Get selected address from localStorage
            const selectedAddressStr = localStorage.getItem('selectedAddress');
            const selectedAddress = selectedAddressStr ? JSON.parse(selectedAddressStr) : null;
            if (!selectedAddress) {
                console.error('No address selected');
                alert('Please select a shipping address.');
                return;
            }

            // Generate Invoice_No and OrderDate
            const invoiceNo = 'INV-' + Date.now();
            const orderDate = new Date().toISOString();
            const subtotal = cart.reduce((sum, item) => sum + (item.price * item.quantity || 0), 0);
            const shippingCost = 20.00;
            const total = subtotal + shippingCost;

            // Prepare address details
            const addressDetails = selectedAddress.attributes || selectedAddress;
            const shippingDescription = `Shipping to: ${addressDetails.Address || ''}, ${addressDetails.Area || ''}, ${addressDetails.City || ''}, ${addressDetails.Country || ''}, Postal Code: ${addressDetails.Postal_Code || ''}. Payment: COD. Total: $${total}`;

            // Prepare order data for Strapi (only schema fields)
            const orderData = {
                data: {
                    Invoice_No: invoiceNo,
                    OrderDate: orderDate,
                    Description: `Order placed via COD. Subtotal: $${subtotal}, Shipping: $${shippingCost}, Total: $${total}. ${shippingDescription}`,
                    users_permissions_user: userData.id,
                    publishedAt: new Date().toISOString() // For draftAndPublish
                }
            };

            // Post to Strapi orders endpoint
            const orderResponse = await axios.post('https://admin.jacobs-electronics.com/api/orders', orderData, {
                headers: {
                    Authorization: cookies.jwt ? `Bearer ${cookies.jwt}` : '',
                    'Content-Type': 'application/json'
                }
            });

            if (orderResponse.status !== 200 && orderResponse.status !== 201) {
                throw new Error('Failed to create order');
            }

            const orderId = orderResponse.data.data.id;
            console.log('Order created successfully', orderResponse.data);

            // Create order_details for each item
          for (const item of cart) {
    const itemTotal = Number(item.price || 0) * Number(item.quantity || 0);

    const orderDetailData = {
        data: {
            OrderDate: orderDate,
            Description: `Item: ${item.name || 'Product ID ' + item.id}, Price: $${Number(item.price || 0)}, Quantity: ${Number(item.quantity)}, Total: $${itemTotal}`,
            Invoice_No: invoiceNo,
            Delivered: false,
            Product_ID: parseInt(item.id) || 0, // Ensure integer
            Quantity: parseInt(item.quantity) || 0,
            Total: parseFloat(itemTotal) || 0,
            Grand_Total: parseFloat(total) || 0,
            order: orderId,
            publishedAt: new Date().toISOString()
        }
    };

    const detailResponse = await axios.post(
        'https://admin.jacobs-electronics.com/api/order-details',
        orderDetailData,
        {
            headers: {
                Authorization: cookies.jwt ? `Bearer ${cookies.jwt}` : '',
                'Content-Type': 'application/json'
            }
        }
    );

    if (detailResponse.status !== 200 && detailResponse.status !== 201) {
        console.error('Failed to create order detail for item', item.id);
    }
}


            // Clear cart
            setCookie('cart', [], { path: '/' });
            dispatch(changeCartItems([]));
            console.log('All order details created, emails to be sent after Strapi setup');
            // Redirect to success page
            Router.push('/account/order-success');
        } catch (error) {
            console.error('Error creating COD order:', error.response?.data || error.message);
            alert('Error placing order. Check console for details.');
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentInstance) {
            console.log("Processing Payment...");
            paymentInstance.processPayment();
        } else {
            console.error("Payment instance not initialized.");
        }
    };

    useEffect(() => {
        console.log('ModulePaymentMethods rendering, method: ' + method);
    }, [method]);

    return (
        <div className="ps-block--payment-method">
            <h4>Payment Methods</h4>
            <div className="ps-block__header">
                <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
                    <Radio value={1} disabled>Visa / Master Card (Inactive for now)</Radio>
                    <Radio value={2} disabled>Paypal (Inactive for now)</Radio>
                    <Radio value={3}>Cash on Delivery</Radio>
                </Radio.Group>
            </div>
            <div className="ps-block__content">
                {method === 1 ? (
                    <div className="ps-block__tab">
                        <p>Card payment is temporarily inactive.</p>
                    </div>
                ) : method === 2 ? (
                    <div className="ps-block__tab">
                        <p>PayPal Integration Coming Soon</p>
                    </div>
                ) : method === 3 ? (
                    <div className="ps-block__tab">
                        <p>Your order will be confirmed and payment collected upon delivery.</p>
                        <div className="form-group">
                            <button className="ps-btn ps-btn--fullwidth text-white" onClick={handleCODSubmit}>
                                Place Order with COD
                            </button>
                        </div>
                    </div>
                ) : null}
            </div>
        </div>
    );
};

export default ModulePaymentMethods;
