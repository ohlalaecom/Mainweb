import React, { useState, useEffect, useMemo } from 'react';
import Link from 'next/link';
import { message } from 'antd';
import { useRouter } from 'next/navigation';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useGetProducts from '~/hooks/useGetProducts';

const ModulePaymentOrderSummary = ({ ecomerce, shipping, triggerAction }) => {
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getStrapiProducts, products } = useGetProducts();

    const [orderData, setOrderData] = useState(null);
    const [orderDetails, setOrderDetails] = useState([]);
    const [isChecked, setIsChecked] = useState(false); // State for checkbox
    const [isSubmitting, setIsSubmitting] = useState(false); // To track submission state
    const [userId, setUserId] = useState(null); // State to store userId
    // Effect hook to watch for the triggerAction state change
    useEffect(() => {
        if (triggerAction) {
            handleCheckboxChange(); // Call the function when triggered
        }
    }, [triggerAction]);
    // Get cart products
    function getCartProducts() {
        if (cartItems.length > 0) {
            const query = {
                filters: {
                    id: {
                        $in: cartItems.map((item) => item.id),
                    },
                },
            };
            getStrapiProducts(query);
        }
    }

    useEffect(() => {
        getCartProducts();
    }, [cartItems]);

    useEffect(() => {
        // Fetch user details from localStorage
        const userData = JSON.parse(localStorage.getItem('userData'));
        if (userData && userData.id) {
            setUserId(userData.id); // Set the userId from localStorage
        } else {
            handleRedirectToLogin(); // Handle the case where userData is not available
        }
    }, []);

    const cartProducts = useMemo(() => {
        if (cartItems.length === 0) return [];
        return products.map((product) => {
            return {
                id: product.id,
                title: product.attributes.title || 'Untitled Product',
                slug: product.attributes.slug || 'untitled-product',
                thumbnailImage: product.attributes.thumbnail || null,
                price: product.attributes.price || 0,
                sale_price: product.attributes.sale_price || 0,
                quantity:
                    cartItems.find((item) => item.id === product.id)
                        ?.quantity ?? 0,
                description: product.attributes.description || 'No description', // Fetch description
            };
        });
    }, [products, cartItems]);

    const amount = useMemo(() => {
        if (cartProducts && cartProducts.length > 0) {
            return calculateAmount(cartProducts);
        }
        return 0;
    }, [cartProducts]);

    const listItemsView = useMemo(() => {
        if (cartProducts && cartProducts.length > 0) {
            return cartProducts.map((item) => (
                <Link href="/" key={item.id}>
                    <strong>
                        {item.title}
                        <span>x{item.quantity}</span>
                    </strong>
                    <small>${item.quantity * item.price}</small>
                </Link>
            ));
        } else {
            return <p>No Product.</p>;
        }
    }, [cartProducts]);

    const totalView = useMemo(() => {
        const totalAmount = shipping ? parseInt(amount) + 20 : parseInt(amount);
        return (
            <figure className="ps-block__total">
                <h3>
                    Total
                    <strong>${totalAmount}.00</strong>
                </h3>
            </figure>
        );
    }, [amount, shipping]);

    const shippingView = useMemo(() => {
        if (shipping === true) {
            return (
                <figure>
                    <figcaption>
                        <strong>Shipping Fee</strong>
                        <small>$20.00</small>
                    </figcaption>
                </figure>
            );
        }
        return null;
    }, [shipping]);

    // Function to submit order data to Strapi and order details
    const submitOrderData = async () => {
        if (isSubmitting || !userId) return; // Prevent multiple submissions if userId is not available

        setIsSubmitting(true); // Set submitting state to true to prevent re-triggering

        // Generate a unique invoice number for each order
        const invoiceNo = `OH-LALA-${userId}-${new Date().getDate()}${new Date().getMonth() + 1}${new Date().getFullYear().toString().slice(-2)}-${Math.floor(Math.random() * 10000)}`;

        // Create Order
        const orderPayload = {
            data: {
                Invoice_No: invoiceNo,
                OrderDate: new Date().toISOString(),
                users_permissions_user: userId,
                description: 'Order Description', // Customize the description
            },
        };

        try {
            // POST Request to create order
            const orderResponse = await axios.post(
                'https://admin.jacobs-electronics.com/api/orders',
                orderPayload,
                {
                    headers: {
                        'Content-Type': 'application/json',
                    },
                }
            );

            const order = orderResponse.data.data;  // Access data from the response correctly

            if (order.id) {
                // Create Order Details using order.id
                const orderDetailsPromises = cartProducts.map(async (product) => {
                    const orderDetailPayload = {
                        data: {
                            OrderDate: new Date().toISOString(),
                            Description: 'Product description', // Customize
                            Invoice_No: orderPayload.data.Invoice_No,
                            Product_ID: product.id,
                            Quantity: product.quantity,
                            Total: product.quantity * product.price,
                            Grand_Total: product.quantity * product.sale_price,
                            order: order.id, // Linking to the correct order
                        },
                    };

                    // POST Request to create order detail
                    await axios.post(
                        'https://admin.jacobs-electronics.com/api/order-details',
                        orderDetailPayload,
                        {
                            headers: {
                                'Content-Type': 'application/json',
                            },
                        }
                    );
                });

                // Wait for all order details to be inserted
                await Promise.all(orderDetailsPromises);

                message.success('Order submitted successfully!');
            }
        } catch (error) {
            console.error('Error submitting order data:', error);
            message.error('Error submitting order data');
        } finally {
            setIsSubmitting(false); // Reset submitting state after the process is finished
            setIsChecked(false); // Reset checkbox state after successful submission
        }
    };


    // Handle checkbox change directly triggering submission logic
    const handleCheckboxChange = () => {
        // Only submit order when checkbox is checked and not submitting
        if (!isChecked && !isSubmitting) {
            submitOrderData();
        }
        setIsChecked(!isChecked); // Toggle checkbox state
    };

    return (
        <div className="ps-block--checkout-order">
            <div className="ps-block__content">
                <figure>
                    <figcaption>
                        <strong>Product</strong>
                        <strong>total</strong>
                    </figcaption>
                </figure>
                <figure className="ps-block__items">{listItemsView}</figure>
                <figure>
                    <figcaption>
                        <strong>Subtotal</strong>
                        <small>${amount}</small>
                    </figcaption>
                </figure>
                {shippingView}
                {totalView}
                {/* <div style={{ marginTop: '20px' }}>
                    <input
                        type="checkbox"
                        id="confirmOrder"
                        checked={isChecked}
                        onChange={handleCheckboxChange}
                        disabled={isSubmitting} // Disable checkbox while submitting
                    />
                    <label htmlFor="confirmOrder" style={{ marginLeft: '8px' }}>
                        Confirm Order
                    </label>
                </div> */}
            </div>
        </div>
    );
};

export default ModulePaymentOrderSummary;

