import React from 'react';
import './footer1.css';

const FooterCopyright = () => (
    <div className="ps-footer__copyright">
        <p>&copy; 2025 Ohlala Ecommerce. All Rights Reserved. Powered by <a href="https://ipcoresolutionsindia.com" target="_blank" style={{textDecoration: "none", color: "inherit"}}>IP Core Solutions India Pvt. Ltd.</a></p>

        <p>
            <span>We Using Safe Payment For:</span>
            <a href="#">
                <img src="/static/img/payment-method/1.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/2.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/3.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/4.jpg" alt="Martfury" />
            </a>
            <a href="#">
                <img src="/static/img/payment-method/5.jpg" alt="Martfury" />
            </a>
        </p>
    </div>
);

export default FooterCopyright;
