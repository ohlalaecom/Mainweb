import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';

const UserInformation = () => {
    const { isLoggedIn } = useSelector((state) => state.user); // You can remove user if not using Redux for user
    const [userData, setUserData] = useState(null);

    useEffect(() => {
        const fetchStrapiUser = async () => {
            const token = typeof window !== 'undefined' && localStorage.getItem('token');

            if (!token) return;

            try {
                const response = await axios.get('https://admin.jacobs-electronics.com/api/users/me', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });
                setUserData(response.data);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchStrapiUser();
    }, []);

    const accountLinks = [
        { text: 'Account Information', url: '/account/user-information', icon: 'icon-user', active: true },
        { text: 'Notifications', url: '/account/notifications', icon: 'icon-alarm-ringing' },
        { text: 'Invoices', url: '/account/invoices', icon: 'icon-papers' },
        { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
        { text: 'Recent Viewed Product', url: '/account/recent-viewed-product', icon: 'icon-store' },
        { text: 'Wishlist', url: '/account/wishlist', icon: 'icon-heart' },
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
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" alt="User" />
                                    <figure>
                                        <figcaption>
                                            {isLoggedIn && userData ? `Hello, ${userData.username}` : 'Hello, Guest'}
                                        </figcaption>
                                        <p>{isLoggedIn && userData ? userData.email : 'Not logged in'}</p>
                                    </figure>
                                </div>
                                <div className="ps-widget__content">
                                    <ul className="ps-list--user-links">
                                        {accountLinkView}
                                        <li>
                                            <Link href="/account/logout">
                                                <i className="icon-power-switch" />
                                                Logout
                                            </Link>
                                        </li>
                                    </ul>
                                </div>
                            </aside>
                        </div>
                    </div>

                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation user={userData} />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
