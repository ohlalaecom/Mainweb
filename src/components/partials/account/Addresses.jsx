// 'use client';

// import React, { useEffect, useState } from 'react';
// import Link from 'next/link';
// import axios from 'axios';

// export default function Addresses() {
//     const [addresses, setAddresses] = useState([]);
//     const [userId, setUserId] = useState(null);
//     const [userEmail, setUserEmail] = useState(null);

//     const accountLinks = [
//         { text: 'Account Information', url: '/account/user-information', icon: 'icon-user', active: true },
//         // { text: 'Notifications', url: '/account/notifications', icon: 'icon-alarm-ringing' },
//         // { text: 'Invoices', url: '/account/invoices', icon: 'icon-papers' },
//         { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
//         // { text: 'Recent Viewed Product', url: '/account/recent-viewed-product', icon: 'icon-store' },
//         // { text: 'Wishlist', url: '/account/wishlist', icon: 'icon-heart' },
//     ];

//     // Get user ID from localStorage
//     useEffect(() => {
//         const userData = localStorage.getItem('userData');
//         if (userData) {
//             try {
//                 const parsed = JSON.parse(userData);
//                 if (parsed?.id) {
//                     console.log("User ID from localStorage:", parsed.id);
//                     setUserId(parsed.id);
//                     setUserEmail(parsed.email);
//                 }
//             } catch (err) {
//                 console.error('Error parsing userData:', err);
//             }
//         }
//     }, []);

//     // Fetch addresses for this user
//     useEffect(() => {
//         if (!userId) return;

//         async function fetchAddresses() {
//             try {
//                 const response = await axios.get(
//                     `https://admin.jacobs-electronics.com/api/cust-addresses?filters[users_permissions_user][id][$eq]=${userId}`,
//                     { withCredentials: true }
//                 );

//                 console.log('Fetched address data:', response.data);

//                 const fetchedData = response.data?.data || [];

//                 const normalizedAddresses = fetchedData.map((item) => ({
//                     id: item.id,
//                     ...item.attributes,
//                 }));

//                 setAddresses(normalizedAddresses);
//             } catch (error) {
//                 console.error('Error fetching addresses:', error);
//             }
//         }

//         fetchAddresses();
//     }, [userId]);

//     // Renders a single address block
//     const renderAddress = (address, index) => (
//         <figure key={index} className="ps-block--address mb-4">
//             <figcaption>Address {index + 1}</figcaption>
//             <div className="ps-block__content">
//                 <p>{address?.Address}</p>
//                 <p>{address?.Area}</p>
//                 <p>{address?.City}, {address?.Postal_Code}</p>
//                 <p>{address?.Country}</p>
//                 <Link href={`/account/edit-address/${address.id}`}>Edit</Link>
//             </div>
//         </figure>
//     );

//     return (
//         <section className="ps-my-account ps-page--account">
//             <div className="container">
//                 <div className="row">
//                     {/* Sidebar */}
//                     <div className="col-lg-4">
//                         <div className="ps-section__left">
//                             <aside className="ps-widget--account-dashboard">
//                                 <div className="ps-widget__header">
//                                     <img src="/static/img/users/3.jpg" />
//                                     <figure>
//                                         <figcaption>Hello</figcaption>
//                                         <p>{userEmail}</p>
//                                     </figure>
//                                 </div>
//                                 <div className="ps-widget__content">
//                                     <ul>
//                                         {accountLinks.map((link) => (
//                                             <li key={link.text} className={link.active ? 'active' : ''}>
//                                                 <Link href={link.url}>
//                                                     <i className={link.icon} />
//                                                     {link.text}
//                                                 </Link>
//                                             </li>
//                                         ))}
//                                         <li>
//                                             {/* <Link href="/account/my-account">
//                                                 <i className="icon-power-switch" />
//                                                 Logout
//                                             </Link> */}
//                                         </li>
//                                     </ul>
//                                 </div>
//                             </aside>
//                         </div>
//                     </div>

//                     {/* Address Content */}
//                     <div className="col-lg-8">
//                         <div className="ps-section--account-setting">
//                             <div className="ps-section__content">
//                                 {addresses.length > 0 ? (
//                                     <div className="row">
//                                         {addresses.map((address, idx) => (
//                                             <div className="col-md-6 col-12" key={idx}>
//                                                 {renderAddress(address, idx)}
//                                             </div>
//                                         ))}
//                                     </div>
//                                 ) : (
//                                     <p>You have not added any addresses yet.</p>
//                                 )}
//                             </div>
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </section>
//     );
// }
'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import axios from 'axios';

export default function Addresses() {
    const [addresses, setAddresses] = useState([]);
    const [userId, setUserId] = useState(null);
    const [userEmail, setUserEmail] = useState(null);

    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
    ];

    // Get user ID from localStorage
    useEffect(() => {
        const userData = localStorage.getItem('userData');
        if (userData) {
            try {
                const parsed = JSON.parse(userData);
                if (parsed?.id) {
                    setUserId(parsed.id);
                    setUserEmail(parsed.email);
                }
            } catch (err) {
                console.error('Error parsing userData:', err);
            }
        }
    }, []);

    // Fetch addresses for this user
    useEffect(() => {
        if (!userId) return;

        async function fetchAddresses() {
            try {
                const response = await axios.get(
                    `https://admin.jacobs-electronics.com/api/cust-addresses?filters[users_permissions_user][id][$eq]=${userId}`,
                    { withCredentials: true }
                );

                const fetchedData = response.data?.data || [];
                const normalizedAddresses = fetchedData.map((item) => ({
                    id: item.id,
                    ...item.attributes,
                }));

                setAddresses(normalizedAddresses);
            } catch (error) {
                console.error('Error fetching addresses:', error);
            }
        }

        fetchAddresses();
    }, [userId]);

    // Delete address with confirmation
    const handleDelete = async (id) => {
        const confirmed = window.confirm(
            'Are you sure you want to delete this address?'
        );
        if (!confirmed) return;

        try {
            const token = localStorage.getItem('authToken'); // or whatever you saved it as
            await axios.delete(
                `https://admin.jacobs-electronics.com/api/cust-addresses/${id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            // Remove from state
            setAddresses((prev) => prev.filter((addr) => addr.id !== id));
        } catch (error) {
            console.error('Error deleting address:', error);
            alert('Failed to delete address. Please try again.');
        }
    };

    // Render address block
    const renderAddress = (address, index) => (
        <figure key={index} className="ps-block--address mb-4">
            <figcaption>Address {index + 1}</figcaption>
            <div className="ps-block__content">
                <p>{address?.Address}</p>
                <p>{address?.Area}</p>
                <p>
                    {address?.City}, {address?.Postal_Code}
                </p>
                <p>{address?.Country}</p>
                <div style={{ display: 'flex', gap: '10px', marginTop: '8px' }}>
                    <Link href={`/account/edit-address/${address.id}`}>
                        Edit
                    </Link>
                    <button
                        onClick={() => handleDelete(address.id)}
                        style={{
                            background: 'red',
                            color: 'white',
                            border: 'none',
                            padding: '4px 8px',
                            cursor: 'pointer',
                            borderRadius: '4px',
                        }}>
                        Delete
                    </button>
                </div>
            </div>
        </figure>
    );

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-4">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" />
                                    <figure>
                                        <figcaption>Hello</figcaption>
                                        <p>{userEmail}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul>
                                        {accountLinks.map((link) => (
                                            <li
                                                key={link.text}
                                                className={
                                                    link.active ? 'active' : ''
                                                }>
                                                <Link href={link.url}>
                                                    <i className={link.icon} />
                                                    {link.text}
                                                </Link>
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* Address Content */}
                    <div className="col-lg-8">
                        <div className="ps-section--account-setting">
                            <div className="ps-section__content">
                                {addresses.length > 0 ? (
                                    <div className="row">
                                        {addresses.map((address, idx) => (
                                            <div
                                                className="col-md-6 col-12"
                                                key={idx}>
                                                {renderAddress(address, idx)}
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <p>You have not added any addresses yet.</p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}