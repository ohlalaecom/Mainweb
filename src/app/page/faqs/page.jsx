'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function FAQs() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'FAQs' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Frequently Asked Questions">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Frequently Asked Questions</h2>

                    <h3 className="text-success mt-4">1. How do I place an order?</h3>
                    <p>Placing an order is easy! Simply browse our products, select your desired item(s), add them to the cart, and proceed to checkout. Follow the prompts to complete your purchase with payment and shipping details.</p>

                    <h3 className="text-success mt-4">2. What payment methods do you accept?</h3>
                    <p>We accept various payment methods including:</p>
                    <ul>
                        <li>Credit/Debit Cards (Visa, MasterCard, American Express)</li>
                        <li>PayPal</li>
                        <li>Bank Transfers (for some regions)</li>
                    </ul>

                    <h3 className="text-success mt-4">3. How can I track my order?</h3>
                    <p>Once your order has been shipped, you will receive an email with a tracking number and link to track your package. You can also track your order directly through your account page.</p>

                    <h3 className="text-success mt-4">4. Can I change or cancel my order?</h3>
                    <p>If you need to change or cancel your order, please contact our customer support team as soon as possible. We can make adjustments if the order has not yet been processed or shipped. Unfortunately, once an order is shipped, we cannot modify or cancel it.</p>

                    <h3 className="text-success mt-4">5. How do I return an item?</h3>
                    <p>To return an item, please refer to our <a href="/return-policy">Return Policy</a> page for detailed instructions. You can contact our customer support team to initiate a return and receive a return authorization.</p>

                    <h3 className="text-success mt-4">6. Do you offer international shipping?</h3>
                    <p>Yes, we offer international shipping to most countries. Shipping fees and delivery times vary depending on the destination. You can check the shipping options at checkout based on your location.</p>

                    <h3 className="text-success mt-4">7. Are your products covered by a warranty?</h3>
                    <p>We offer a warranty on certain products. The details of the warranty will be included with the product, or you can refer to the product page for warranty information.</p>

                    <h3 className="text-success mt-4">8. Can I change the shipping address after placing my order?</h3>
                    <p>If you need to change the shipping address, please contact our customer support team as soon as possible. We can make changes if the order has not yet been shipped.</p>

                    <h3 className="text-success mt-4">9. How do I contact customer support?</h3>
                    <p>You can reach our customer support team by email at <strong>support@jacobs-electronics.com</strong> or by phone at <strong>+357 26 272134</strong>. We’re here to help!</p>

                    <h3 className="text-success mt-4">10. Do you offer gift cards?</h3>
                    <p>Yes, we offer gift cards that can be purchased directly from our website. They can be redeemed for any product in our store.</p>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
