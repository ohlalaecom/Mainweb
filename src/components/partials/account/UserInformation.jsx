import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';

const UserInformation = () => {
    const [userData, setUserData] = useState(null);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchUser = async () => {
            const token = localStorage.getItem('authToken');
            if (!token) return;

            try {
                const response = await axios.get('https://admin.jacobs-electronics.com/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
                setIsLoading(false);
            } catch (error) {
                console.error('Error fetching user data:', error);
                setIsLoading(false);
            }
        };

        fetchUser();
    }, []);

    const accountLinks = [
        { text: 'Account Information', url: '/account/user-information', icon: 'icon-user', active: true },
        // { text: 'Notifications', url: '/account/notifications', icon: 'icon-alarm-ringing' },
        // { text: 'Invoices', url: '/account/invoices', icon: 'icon-papers' },
        { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
        // { text: 'Recent Viewed Product', url: '/account/recent-viewed-product', icon: 'icon-store' },
        // { text: 'Wishlist', url: '/account/wishlist', icon: 'icon-heart' },
    ];

    const accountLinkView = accountLinks.map((item) => (
        <li key={item.text} className={item.active ? 'active' : ''}>
            <Link href={item.url}>
                <i className={item.icon} />
                {item.text}
            </Link>
        </li>
    ));

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    {/* Sidebar */}
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" alt="User" />
                                    <figure>
                                        <figcaption>
                                            {isLoading ? 'Loading...' : userData ? `Hello, ${userData.username}` : 'Guest'}
                                        </figcaption>
                                        <p>{userData ? userData.email : 'Not logged in'}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinkView}
                                        <li>
                                            {/* <Link href="/account/logout">
                                                <i className="icon-power-switch" />
                                                Logout
                                            </Link> */}
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>

                    {/* Main content */}
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            {userData ? (
                                <FormChangeUserInformation user={userData} />
                            ) : (
                                <p>Please log in to view your account information.</p>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
