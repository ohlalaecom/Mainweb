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
            text: 'About Us',
        },
    ];

    return (
        <PageContainer footer={<FooterDefault />} title="About Us">
            <div className="ps-page--single">
                <img src="/static/img/bg/about-us2.jpg" className="text-center" alt="" />
                <BreadCrumb breacrumb={breadCrumb} />
                <div className="container mt-5">
                    <h2 className="text-center mb-4">About Us</h2>
                    <p className="text-muted text-justify">
                        Oh-lala.co is the online division of <strong>Computer SOS</strong>, a trusted computer store in Cyprus.
                        Specializing in new and refurbished computers, laptops, and printers, Oh-lala.co offers a seamless shopping
                        experience both online and offline. In addition to sales, we provide expert computer maintenance, repairs,
                        upgrades, and virus protection services. 
                    </p>
<hr/>
                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h3 className="text-primary">Our Locations</h3>
                            <ul className="list-unstyled">
                                <li><strong>Chloraka Paphos:</strong> Located in Chloraka Paphos, Cyprus</li>
                                <li><strong>Emba:</strong> Located in Makariou III Ave, Emba, Cyprus</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-primary">Contact Us</h3>
                            <ul className="list-unstyled">
                                <li><strong>Chloraka Paphos:</strong> <a href="tel:+35726272134">(00357) 26 272 134</a></li>
                                <li><strong>Emba:</strong> <a href="tel:+35799246699">+357 99 246699</a></li>
                            </ul>
                        </div>
                    </div>
                </div>

                {/* <OurTeam />
                <AboutAwards /> */}
            </div>
            <Newletters layout="container" />
        </PageContainer>
    );
}
