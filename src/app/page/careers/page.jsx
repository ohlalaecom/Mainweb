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
            text: 'Careers',
        },
    ];
    return (
        <PageContainer footer={<FooterDefault />} title="Careers">
            <div className="ps-page--single">
                <img src="/static/img/bg/careeres.jpg" className="text-center" alt="" />
                <BreadCrumb breacrumb={breadCrumb} />

                <div className="container mt-5">
                    <h2 className="text-center mb-4">Join Our Team</h2>
                    <p className="text-muted text-justify">
                        At <strong>Oh-lala.co</strong>, we believe in innovation, teamwork, and growth. We're always looking for
                        passionate individuals to join our team and contribute to our mission of delivering top-quality
                        technology solutions.
                    </p>

                    <div className="row mt-4">
                        <div className="col-md-6">
                            <h3 className="text-primary">Why Work With Us?</h3>
                            <ul className="list-unstyled">
                                <li>✔ <strong>Career Growth:</strong> Opportunities for learning and advancement.</li>
                                <li>✔ <strong>Work-Life Balance:</strong> Flexible work arrangements.</li>
                                <li>✔ <strong>Supportive Environment:</strong> Collaborative and inclusive workplace.</li>
                                <li>✔ <strong>Exciting Projects:</strong> Work on cutting-edge technology and solutions.</li>
                            </ul>
                        </div>
                        <div className="col-md-6">
                            <h3 className="text-primary">Current Openings</h3>
                            <ul className="list-unstyled">
                                <li>📌 <strong>Software Engineer:</strong> Develop and maintain innovative solutions.</li>
                                <li>📌 <strong>Sales Executive:</strong> Drive sales and expand our customer base.</li>
                                <li>📌 <strong>Customer Support:</strong> Assist customers with technical inquiries.</li>
                                <li>📌 <strong>Marketing Specialist:</strong> Manage digital marketing campaigns.</li>
                            </ul>
                        </div>
                    </div>


                </div>

            </div>
            <div className="container mt-5">
                <h3 className="text-center text-primary">Apply Now</h3>
                <p className="text-muted text-center">Submit your details and upload your CV to apply for a position.</p>
                <div className="row justify-content-center">
                    <div className="col-12"> {/* Changed from col-md-6 to col-12 for full width */}
                        <form action="/submit-application" method="POST" enctype="multipart/form-data">
                            <div className="mb-3">
                                <label className="form-label"><strong>Full Name</strong></label>
                                <input type="text" className="form-control" name="name" placeholder="Enter your full name" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Email Address</strong></label>
                                <input type="email" className="form-control" name="email" placeholder="Enter your email" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Phone Number</strong></label>
                                <input type="tel" className="form-control" name="phone" placeholder="Enter your phone number" required />
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Position Applying For</strong></label>
                                <select className="form-control" name="position" required>
                                    <option value="" disabled selected>Select a position</option>
                                    <option value="Software Engineer">Software Engineer</option>
                                    <option value="Sales Executive">Sales Executive</option>
                                    <option value="Customer Support">Customer Support</option>
                                    <option value="Marketing Specialist">Marketing Specialist</option>
                                </select>
                            </div>
                            <div className="mb-3">
                                <label className="form-label"><strong>Upload Your CV</strong></label>
                                <input type="file" className="form-control" name="cv" accept=".pdf,.doc,.docx" required />
                                <small className="text-muted">Accepted formats: .pdf, .doc, .docx (Max: 5MB)</small>
                            </div>
                            <div className="text-center mb-5">
                                <button type="submit" className="btn btn-success btn-lg" style={{fontSize:"18px"}}>Submit Application</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>

            <Newletters layout="container" />
        </PageContainer>
    );
}

