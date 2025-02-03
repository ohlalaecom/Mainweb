import React from 'react';
import Link from 'next/link';

const FooterWidgets = () => (
    <div className="ps-footer__widgets">
        <aside className="widget widget_footer widget_contact-us">
            <h4 className="widget-title">Contact us</h4>
            <div className="widget_content">
                <p>Call us 24/7</p>
                <h3>1800 97 97 69</h3>
                <p>
                    Address xxxxx <br />
                    <a href="mailto:contact@oh-lala.co">contact@oh-lala.co</a>
                </p>
                <ul className="ps-list--social">
                    <li>
                        <a className="facebook" href="#">
                            <i className="fa fa-facebook" />
                        </a>
                    </li>
                    <li>
                        <a className="twitter" href="#">
                            <i className="fa fa-twitter" />
                        </a>
                    </li>
                    <li>
                        <a className="google-plus" href="#">
                            <i className="fa fa-google-plus" />
                        </a>
                    </li>
                    <li>
                        <a className="instagram" href="#">
                            <i className="fa fa-instagram" />
                        </a>
                    </li>
                </ul>
            </div>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Quick links</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/privacypolicy">Privacy Policy</Link>
                </li>

                <li>
                    <Link href="/page/termsandconditions">Term & Condition</Link>
                </li>
                <li>
                    <Link href="/page/shipping">Shipping</Link>
                </li>
                <li>
                    <Link href="/page/return">Return</Link>
                </li>
                <li>
                    <Link href="/page/faqs">FAQs</Link>
                </li>
            </ul>
        </aside>
        <aside className="widget widget_footer">
            <h4 className="widget-title">Company</h4>
            <ul className="ps-list--link">
                <li>
                    <Link href="/page/about-us">About Us</Link>
                </li>
                <li>
                    <Link href="/page/affiliate">Affilate</Link>
                </li>
                <li>
                    <Link href="/page/careers">Career</Link>
                </li>
                <li>
                    <Link href="/page/contact-us">Contact</Link>
                </li>
            </ul>
        </aside>

    </div>
);

export default FooterWidgets;
