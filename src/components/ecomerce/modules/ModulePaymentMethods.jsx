import React, { useState, useEffect } from "react";
import { Radio } from "antd";
import { useRouter } from "next/navigation";
import "./paymentStyles.css"; // Ensure you have this file for additional styling

const ModulePaymentMethods = () => {
    const Router = useRouter();
    const [method, setMethod] = useState(1);
    const [sdkLoaded, setSdkLoaded] = useState(false);
    const [paymentInstance, setPaymentInstance] = useState(null);

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

    const handleSubmit = (e) => {
        e.preventDefault();
        if (paymentInstance) {
            console.log("Processing Payment...");
            paymentInstance.processPayment();
        } else {
            console.error("Payment instance not initialized.");
        }
    };

    return (
        <>
            <h4>Payment Methods</h4>
            <div className="ps-block--payment-method">
                <div className="ps-block__header">
                    <Radio.Group onChange={(e) => setMethod(e.target.value)} value={method}>
                        <Radio value={1}>Visa / Master Card</Radio>
                        <Radio value={2}>Paypal</Radio>
                    </Radio.Group>
                </div>
                <div className="ps-block__content">
                    {method === 1 ? (
                        <div className="ps-block__tab">
                            {sdkLoaded ? <div id="myPOS-payment-form"></div> : <p>Loading payment form...</p>}
                            <div className="form-group">
                                <button className="ps-btn ps-btn--fullwidth" onClick={handleSubmit} disabled={!paymentInstance}>
                                    Pay Now
                                </button>
                            </div>
                        </div>
                    ) : (
                        <p>PayPal Integration Coming Soon</p>
                    )}
                </div>
            </div>
        </>
    );
};

export default ModulePaymentMethods;
