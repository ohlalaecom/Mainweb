import React from 'react';

const ContactInfo = () => (
    <div className="ps-contact-info">
        <div className="container">
            <div className="ps-section__header">
                <h3>Contact Us For Any Questions</h3>
            </div>
            <div className="ps-section__content">
                <div className="row">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Contact Directly</h4>
                            <p>
                                <a href="mailto:contact@martfury.com">
                                    contact@jacobs-electronics.com
                                </a>
                                <span>+357 26 272134</span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Store Address</h4>
                            <p>
                                <span>
                                    Makariou III Ave 160, Emba 8221, Cyprus.
                                </span>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Work With Us</h4>
                            <p>
                                <span>Send your CV to our email:</span>
                                <a href="#">career@jacobs-electronics.com</a>
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Customer Service</h4>
                            <p>
                                <a href="#">customercare@jacobs-electronics.com</a>
                                {/* <span>(800) 843-2446</span> */}
                            </p>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        {/* <div className="ps-block--contact-info">
                            <h4>Media Relations</h4>
                            <p>
                                <a href="#">media@martfury.com</a>
                                <span>(801) 947-3564</span>
                            </p>
                        </div> */}
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div className="ps-block--contact-info">
                            <h4>Vendor Support</h4>
                            <p>
                                <a href="#">vendorsupport@jacobs-electronics.com</a>
                                {/* <span>(801) 947-3100</span> */}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default ContactInfo;
