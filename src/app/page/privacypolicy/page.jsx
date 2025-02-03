'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function PrivacyPolicy() {
    const breadCrumb = [
        { text: 'Home', url: '/' },
        { text: 'Privacy Policy' },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="Privacy Policy">
            <div className="ps-page--single">
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">Privacy Policy</h2>
                    <h3 className="text-success mt-4">1. Introduction</h3>
                    <p>Your privacy is important to us. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit <strong>Oh-lala.co</strong>. By using our website, you agree to the terms outlined in this policy.</p>
                    
                    <h3 className="text-success mt-4">2. Information We Collect</h3>
                    <h4>Personal Information</h4>
                    <p>We collect information you provide directly, including:</p>
                    <ul>
                        <li>Name</li>
                        <li>Email address</li>
                        <li>Phone number</li>
                        <li>Billing and shipping address</li>
                        <li>Payment details (processed securely via third-party providers)</li>
                    </ul>
                    
                    <h4>Non-Personal Information</h4>
                    <p>We may also collect data such as:</p>
                    <ul>
                        <li>IP address</li>
                        <li>Browser type and device information</li>
                        <li>Browsing behavior and analytics</li>
                        <li>Cookies and tracking technologies</li>
                    </ul>
                    
                    <h3 className="text-success mt-4">3. How We Use Your Information</h3>
                    <p>We use your information to:</p>
                    <ul>
                        <li>Process and fulfill orders</li>
                        <li>Enhance customer experience</li>
                        <li>Provide customer support</li>
                        <li>Send marketing emails (opt-out available)</li>
                        <li>Ensure security and prevent fraud</li>
                    </ul>
                    
                    <h3 className="text-success mt-4">4. Data Sharing & Third-Party Services</h3>
                    <p>We do not sell your personal data. However, we may share information with:</p>
                    <ul>
                        <li>Payment processors for secure transactions</li>
                        <li>Shipping providers for delivery services</li>
                        <li>Marketing and analytics partners</li>
                        <li>Legal authorities if required</li>
                    </ul>
                    
                    <h3 className="text-success mt-4">5. International Data Transfers</h3>
                    <p>As an international e-commerce website, we may store and process data in different countries. By using our services, you consent to data transfers in compliance with applicable regulations.</p>
                    
                    <h3 className="text-success mt-4">6. Your Rights & Choices</h3>
                    <p>Depending on your location, you may have rights under GDPR, CCPA, or other laws, including:</p>
                    <ul>
                        <li>Right to access, correct, or delete your data</li>
                        <li>Right to opt out of marketing</li>
                        <li>Right to data portability</li>
                        <li>Right to file a complaint with regulatory authorities</li>
                    </ul>
                    
                    <h3 className="text-success mt-4">7. Data Security</h3>
                    <p>We implement security measures such as encryption, secure payment gateways, and restricted access to protect your data. However, no transmission is 100% secure.</p>
                    
                    <h3 className="text-success mt-4">8. Cookies & Tracking Technologies</h3>
                    <p>We use cookies to improve user experience, track website activity, and personalize content. You can manage cookies in your browser settings.</p>
                    
                    <h3 className="text-success mt-4">9. Updates to This Policy</h3>
                    <p>We may update this policy periodically. Any changes will be reflected on this page with an updated "Last Updated" date.</p>
                    
                    <h3 className="text-success mt-4">10. Contact Us</h3>
                    <p>If you have any questions about this Privacy Policy, please contact us:</p>
                    <ul className="list-unstyled">
                        <li><strong>Email:</strong> contact@oh-lala.co</li>
                        <li><strong>Phone:</strong> +357 26 272134</li>
                        <li><strong>Address:</strong> Makariou III Ave 160, Emba 8221, Cyprus</li>
                    </ul>
                </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
