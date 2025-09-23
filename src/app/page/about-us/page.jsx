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
            <div className="ps-page--single" >
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
                <div className="container mt-5" style={{ width: "80%", margin: "0 auto" }}>
                    <h2 className="text-center mb-4">About Us</h2>
                    <div class="p-5 p-5" style={{ width: "90%", margin: "auto", border: "1px #ccc solid" }}>
                        <p className="text-muted text-justify" style={{ width: "80%", margin: "0 auto" }}>
                            Jacobs Electronics (jacobs-electronics.com) is a trusted computer store in Cyprus, specializing in both new and refurbished computers, laptops, and printers. We are committed to delivering a seamless shopping experience, whether online or in-store. Beyond sales, we provide expert services including computer maintenance, repairs, upgrades, and advanced virus protection solutions.
                        </p>
                        <hr />
                        <div
                            className="row mt-4"
                            style={{ width: "80%", margin: "0 auto" }}
                        >
                            <div className="col-md-6">
                                <h3 className="text-primary">Our Location</h3>
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Address:</strong> Lavriou 2/16
                                    </li>
                                    <li>
                                        <strong>Post Code:</strong> 8560
                                    </li>
                                    <li>
                                        <strong>Area:</strong> Peyia
                                    </li>
                                    <li>
                                        <strong>Country:</strong> Cyprus
                                    </li>
                                </ul>
                            </div>

                            <div className="col-md-6">
                                <h3 className="text-primary">Contact Us</h3>
                                <ul className="list-unstyled">
                                    <li>
                                        <strong>Phone:</strong>{" "}
                                        <a href="tel:+35799200991">00357-992 00 991</a>
                                    </li>
                                    <li>
                                        <strong>Email:</strong>{" "}
                                        <a href="mailto:contact@jacobs-electronics.com">
                                            contact@jacobs-electronics.com
                                        </a>
                                    </li>
                                </ul>
                            </div>
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
