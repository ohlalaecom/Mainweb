import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModulePaymentOrderSummary from '~/components/partials/account/modules/ModulePaymentOrderSummary';

const Shipping = () => {
    const [userData, setUserData] = useState(null);
    const [selectedAddress, setSelectedAddress] = useState(null);

    useEffect(() => {

        
        // Retrieve user data from localStorage
        const storedData = localStorage.getItem('userData');
        if (storedData) {
            setUserData(JSON.parse(storedData));
        }

        // Retrieve the selected address from localStorage
        const storedAddress = localStorage.getItem('selectedAddress');
        if (storedAddress) {
            setSelectedAddress(JSON.parse(storedAddress));
        }
    }, []);

    // Fallback data in case `userData` or `selectedAddress` is not available
    const defaultData = {
        contact: 'test@gmail.com',
        shippingMethod: 'International Shipping',
        shippingCost: '$20.00',
    };

    const contact = userData?.email || defaultData.contact;
    const shippingMethod = userData?.shippingMethod || defaultData.shippingMethod;
    const shippingCost = userData?.shippingCost || defaultData.shippingCost;

    return (
        <div className="ps-checkout ps-section--shopping">
            <div className="container">
                <div className="ps-section__header">
                    <h2 style={{ fontSize: '36px' }}>Shipping Information</h2>
                </div>
                <div className="ps-section__content">
                    <div className="row">
                        <div className="col-xl-8 col-lg-8 col-md-12 col-sm-12">
                            <div className="ps-block--shipping">
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>Contact</small>
                                        <p>{contact}</p>
                                        <Link href="/account/checkout">
                                            Change
                                        </Link>
                                    </figure>
                                    <figure>
                                        <small>Ship to</small>
                                        <p>
                                            {selectedAddress
                                                ? `${selectedAddress.attributes.Address}, ${selectedAddress.attributes.Area}, ${selectedAddress.attributes.City}, ${selectedAddress.attributes.Country}, Postal Code: ${selectedAddress.attributes.Postal_Code}`
                                                : 'No address selected'}
                                        </p>
                                        <Link href="/account/checkout">
                                            Change
                                        </Link>
                                    </figure>
                                </div>
                                <h4>Shipping Method</h4>
                                <div className="ps-block__panel">
                                    <figure>
                                        <small>{shippingMethod}</small>
                                        <strong>{shippingCost}</strong>
                                    </figure>
                                </div>
                                <div className="ps-block__footer">
                                    <Link href="/account/checkout">
                                        <i className="icon-arrow-left mr-2" />
                                        Return to information
                                    </Link>
                                    <Link
                                        href="/account/payment"
                                        className="ps-btn">
                                        Continue to payment
                                    </Link>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12  ps-block--checkout-order">
                            <div className="ps-form__orders">
                                <ModulePaymentOrderSummary shipping={true} />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Shipping;
