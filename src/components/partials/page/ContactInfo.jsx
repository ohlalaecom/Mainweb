import React from 'react';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    {/* Contact Directly */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <a href="mailto:contact@jacobs-electronics.com">
                                    contact@jacobs-electronics.com
                                </a>
                                <span>00357-992 00 991</span>
                            </p>
                        </div>
                    </div>

                    {/* Store Address */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Store Address</h4>
                            <p>
                                <span>
                                    Lavriou 2/16, Post Code: 8560, Peyia, Cyprus
                                </span>
                            </p>
                        </div>
                    </div>

                    {/* Work With Us */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Send your CV to our email:</span>
                                <a href="mailto:career@jacobs-electronics.com">
                                    career@jacobs-electronics.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Customer Service */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Customer Service</h4>
                            <p>
                                <a href="mailto:customercare@jacobs-electronics.com">
                                    customercare@jacobs-electronics.com
                                </a>
                            </p>
                        </div>
                    </div>

                    {/* Vendor Support */}
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Vendor Support</h4>
                            <p>
                                <a href="mailto:vendorsupport@jacobs-electronics.com">
                                    vendorsupport@jacobs-electronics.com
                                </a>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
