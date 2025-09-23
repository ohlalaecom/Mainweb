import React from 'react';

const ContactMap = () => (
    <div className="ps-contact-map">
        <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3230.132740178119!2d32.371!3d34.8847!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x14e71e12b4b7d7e1%3A0xXXXXXXXXXXXXXXX!2sLavriou%202%2F16%2C%20Peyia%208560%2C%20Cyprus!5e0!3m2!1sen!2s!4v1695472000000!5m2!1sen!2s"
            width="100%"
            height={500}
            style={{ border: 0 }}
            allowFullScreen=""
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
    </div>
);

export default ContactMap;
