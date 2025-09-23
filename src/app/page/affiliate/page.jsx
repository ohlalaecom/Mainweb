'use client';
import React from 'react';
import BreadCrumb from '~/components/elements/BreadCrumb';
import OurTeam from '~/components/partials/page/about-us/OurTeam';
import AboutAwards from '~/components/partials/page/about-us/AboutAwards';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';
import PageContainer from '~/components/layouts/PageContainer';

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Affiliates',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Affiliates">
            <div className="ps-page--single">
                 <img
                    src="/static/img/bg/about-us2.jpg"
                    alt=""
                    style={{
                        width: "100%",
                        height: "50vh",
                        objectFit: "cover"
                    }}
                />
                <BreadCrumb breacrumb={breadCrumb} />

                <div className="container mt-5">
                    <h2 className="text-center mb-4">Affiliate Program</h2>
                    <div class="p-5 p-5" style={{ width: "90%", margin: "auto", border: "1px #ccc solid" }}>
                    <p className="text-muted text-justify">
                        Join the <strong>jacobs-electronics.com Affiliate Program</strong> and earn commissions by promoting high-quality
                        computers, laptops, and accessories. Whether you're a blogger, influencer, or tech enthusiast,
                        you can monetize your audience with ease.
                    </p>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h3 className="text-primary">Why Join?</h3>
                            <ul className="list-unstyled">
                                <li>✔ <strong>Competitive Commissions:</strong> Earn on every successful referral.</li>
                                <li>✔ <strong>Easy Tracking:</strong> Access real-time reports and analytics.</li>
                                <li>✔ <strong>Marketing Support:</strong> Get banners, ads, and promotional material.</li>
                                <li>✔ <strong>Trusted Brand:</strong> Partner with a well-established tech store.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-primary">How to Join?</h3>
                            <ul className="list-unstyled">
                                <li>📌 <strong>Step 1:</strong> Sign up for our affiliate program.</li>
                                <li>📌 <strong>Step 2:</strong> Get your unique affiliate link.</li>
                                <li>📌 <strong>Step 3:</strong> Share the link with your audience.</li>
                                <li>📌 <strong>Step 4:</strong> Earn commissions on every sale!</li>
                            </ul>
                            <div className="text-center mt-3">
                                <a href="/affiliate-signup" className="btn btn-primary btn-lg">Join Now</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}

