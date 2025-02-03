'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function Shipping() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'Shipping' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Shipping Information">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Shipping Information</h2>
                    <h3 className="text-success mt-4">1. Shipping Policy Overview</h3>
                    <p>At <strong>Oh-lala.co</strong>, we are committed to delivering your products safely and in a timely manner. Our shipping policy outlines the details on how we handle orders, shipping methods, and delivery times.</p>

                    <h3 className="text-success mt-4">2. Shipping Methods</h3>
                    <p>We offer various shipping methods to cater to your needs. Available shipping options will be presented at checkout. The methods include:</p>
                    <ul>
                        <li>Standard Shipping</li>
                        <li>Expedited Shipping</li>
                        <li>Same-day Delivery (where available)</li>
                    </ul>

                    <h3 className="text-success mt-4">3. Shipping Costs</h3>
                    <p>Shipping costs are calculated based on the delivery location, shipping method, and the weight of the items in your order. Shipping fees will be clearly displayed during the checkout process.</p>

                    <h3 className="text-success mt-4">4. Order Processing Time</h3>
                    <p>Orders are typically processed within 1-2 business days, depending on the volume of orders and product availability. You will be notified once your order has been dispatched.</p>

                    <h3 className="text-success mt-4">5. Delivery Time</h3>
                    <p>Estimated delivery times are as follows:</p>
                    <ul>
                        <li>Standard Shipping: 5-7 business days</li>
                        <li>Expedited Shipping: 2-3 business days</li>
                        <li>Same-day Delivery: Available in select areas</li>
                    </ul>
                    <p>Please note that delivery times may vary based on your location, weather conditions, and other factors outside of our control.</p>

                    <h3 className="text-success mt-4">6. Shipping Restrictions</h3>
                    <p>We currently ship to the following countries:</p>
                    <ul>
                        <li>United States</li>
                        <li>United Kingdom</li>
                        <li>European Union</li>
                        <li>Australia</li>
                        <li>Canada</li>
                    </ul>
                    <p>Unfortunately, we are unable to ship to certain locations at this time. For international shipping inquiries, please contact our support team.</p>

                    <h3 className="text-success mt-4">7. Tracking Your Order</h3>
                    <p>Once your order is shipped, you will receive an email with tracking information. You can track your order on the carrier's website or by visiting your account page on <strong>Oh-lala.co</strong>.</p>

                    <h3 className="text-success mt-4">8. Shipping Issues</h3>
                    <p>If you encounter any issues with your shipment, including delays, lost packages, or damaged goods, please contact our customer service team at:</p>
                    <ul className="list-unstyled">
                        <li><strong>Email:</strong> support@oh-lala.co</li>
                        <li><strong>Phone:</strong> +357 26 272134</li>
                    </ul>

                    <h3 className="text-success mt-4">9. International Shipping</h3>
                    <p>If you are located outside of our primary shipping areas, additional duties and taxes may apply, which are the responsibility of the customer. Please check with local authorities for applicable fees before making a purchase.</p>

                    <h3 className="text-success mt-4">10. Returns and Exchanges</h3>
                    <p>If you are not satisfied with your order, please refer to our Returns and Exchanges policy for information on how to return or exchange your items.</p>

                    <h3 className="text-success mt-4">11. Contact Us</h3>
                    <p>If you have any questions regarding shipping, please contact us:</p>
                    <ul className="list-unstyled">
                        <li><strong>Email:</strong> support@oh-lala.co</li>
                        <li><strong>Phone:</strong> +357 26 272134</li>
                    </ul>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
