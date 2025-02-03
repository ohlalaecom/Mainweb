'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function Return() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'Return & Exchange' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Return & Exchange Policy">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Return & Exchange Policy</h2>
                    <h3 className="text-success mt-4">1. Introduction</h3>
                    <p>At <strong>Oh-lala.co</strong>, we want you to be completely satisfied with your purchase. If you're not happy with your order, we're here to help. This Return & Exchange Policy outlines the steps to return or exchange your items.</p>

                    <h3 className="text-success mt-4">2. Eligibility for Returns</h3>
                    <p>You can return your item within <strong>30 days</strong> from the date of receipt, under the following conditions:</p>
                    <ul>
                        <li>The item must be unused and in its original condition, with tags and packaging intact.</li>
                        <li>Items must be returned in their original packaging (including any protective seals, if applicable).</li>
                        <li>Non-returnable items include personal care items, gift cards, and items marked as final sale.</li>
                    </ul>

                    <h3 className="text-success mt-4">3. How to Return an Item</h3>
                    <p>To return an item, please follow these steps:</p>
                    <ul>
                        <li>Contact our customer support team via <strong>email</strong> or <strong>phone</strong> to initiate a return.</li>
                        <li>Provide your order number, item(s) to return, and the reason for the return.</li>
                        <li>Once the return is approved, you will receive a return authorization and shipping instructions.</li>
                        <li>Pack the item securely in its original packaging, along with the return form provided by our support team.</li>
                        <li>Ship the return item to the designated address. You will be responsible for return shipping costs, unless the return is due to a defective or incorrect item.</li>
                    </ul>

                    <h3 className="text-success mt-4">4. Exchange Policy</h3>
                    <p>If you would like to exchange an item for a different size, color, or model, please follow the same process as a return. Once we receive your return, we will send you the exchange item, subject to availability.</p>

                    <h3 className="text-success mt-4">5. Refund Process</h3>
                    <p>Refunds will be issued to the original payment method within <strong>7-10 business days</strong> after the returned item is received and inspected. Please note that it may take additional time for the refund to appear in your account depending on your payment provider.</p>

                    <h3 className="text-success mt-4">6. Damaged or Defective Items</h3>
                    <p>If you receive a damaged or defective item, please contact our customer support team immediately. We will arrange a return and provide a full refund or replacement at no additional cost to you.</p>

                    <h3 className="text-success mt-4">7. Non-Returnable Items</h3>
                    <p>We cannot accept returns for the following items:</p>
                    <ul>
                        <li>Gift cards</li>
                        <li>Personal care products</li>
                        <li>Items marked as non-returnable at checkout or on the product page</li>
                    </ul>

                    <h3 className="text-success mt-4">8. Return Shipping Costs</h3>
                    <p>Return shipping costs are the responsibility of the customer, except in cases where the return is due to a defect or error on our part. We recommend using a trackable shipping service to ensure your return reaches us.</p>

                    <h3 className="text-success mt-4">9. Late Returns</h3>
                    <p>Items returned after the <strong>30-day return window</strong> will not be accepted. If a return is approved beyond the standard return window, a restocking fee may apply.</p>

                    <h3 className="text-success mt-4">10. Contact Us</h3>
                    <p>If you have any questions or need assistance with your return or exchange, please reach out to our customer support team:</p>
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
