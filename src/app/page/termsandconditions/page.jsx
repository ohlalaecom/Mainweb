'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function TermsAndConditions() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'Terms and Conditions' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Terms and Conditions">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Terms and Conditions</h2>
                    <h3 className="text-success mt-4">1. Introduction</h3>
                    <p>Welcome to <strong>jacobs-electronics.com</strong>. These Terms and Conditions govern your use of our website and services. By accessing and using this website, you agree to be bound by these terms.</p>

                    <h3 className="text-success mt-4">2. Acceptance of Terms</h3>
                    <p>By using our website, you accept and agree to these Terms and Conditions. If you do not agree, please refrain from using the website.</p>

                    <h3 className="text-success mt-4">3. Changes to Terms</h3>
                    <p>We reserve the right to update or modify these Terms and Conditions at any time. Any changes will be reflected on this page with an updated "Last Updated" date.</p>

                    <h3 className="text-success mt-4">4. User Responsibilities</h3>
                    <p>As a user of our website, you agree to:</p>
                    <ul>
                        <li>Provide accurate information</li>
                        <li>Comply with all applicable laws and regulations</li>
                        <li>Not use the website for unlawful purposes</li>
                    </ul>

                    <h3 className="text-success mt-4">5. Product Information & Availability</h3>
                    <p>We make every effort to ensure that the product information and availability on our website is accurate. However, we do not guarantee that all products will be available at all times.</p>

                    <h3 className="text-success mt-4">6. Pricing & Payments</h3>
                    <p>Prices for products and services are listed on our website. We reserve the right to modify prices at any time. All payments are processed securely using third-party payment processors.</p>

                    <h3 className="text-success mt-4">7. Intellectual Property</h3>
                    <p>All content on our website, including text, images, logos, and trademarks, is the property of <strong>jacobs-electronics.com</strong> or its licensors and is protected by intellectual property laws.</p>

                    <h3 className="text-success mt-4">8. Limitation of Liability</h3>
                    <p>We are not liable for any damages arising from the use of our website or the inability to use it, including indirect, incidental, or consequential damages.</p>

                    <h3 className="text-success mt-4">9. Termination</h3>
                    <p>We may terminate or suspend your access to our website at any time, without notice, for conduct that we believe violates these Terms and Conditions.</p>

                    <h3 className="text-success mt-4">10. Governing Law</h3>
                    <p>These Terms and Conditions are governed by the laws of the jurisdiction where our company is based, without regard to its conflict of law principles.</p>

                    <h3 className="text-success mt-4">11. Contact Us</h3>
                    <p>If you have any questions about these Terms and Conditions, please contact us:</p>
                    <ul className="list-unstyled">
                        <li><strong>Email:</strong> contact@jacobs-electronics.com</li>
                        <li><strong>Phone:</strong> 00357- 992 00 991</li>
                        <li><strong>Address:</strong> Makariou III Ave 160, Emba 8221, Cyprus</li>
                    </ul>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
