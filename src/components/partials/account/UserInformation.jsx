import React from 'react';
import { useSelector } from 'react-redux'; // Import to access Redux state
import Link from 'next/link';
import FormChangeUserInformation from '~/components/shared/FormChangeUserInformation';

const UserInformation = () => {
    const { user, isLoggedIn } = useSelector((state) => state.user); // Get user info and login status from Redux

    const accountLinks = [
        {
            text: 'Account Information',
            url: '/account/user-information',
            icon: 'icon-user',
            active: true,
        },
        {
            text: 'Notifications',
            url: '/account/notifications',
            icon: 'icon-alarm-ringing',
        },
        {
            text: 'Invoices',
            url: '/account/invoices',
            icon: 'icon-papers',
        },
        {
            text: 'Address',
            url: '/account/addresses',
            icon: 'icon-map-marker',
        },
        {
            text: 'Recent Viewed Product',
            url: '/account/recent-viewed-product',
            icon: 'icon-store',
        },
        {
            text: 'Wishlist',
            url: '/account/wishlist',
            icon: 'icon-heart',
        },
    ];

    // Account links view
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
                    {/* Sidebar Section */}
                    <div className="col-lg-3">
                        <div className="ps-section__left">
                            <aside className="ps-widget--account-dashboard">
                                <div className="ps-widget__header">
                                    <img src="/static/img/users/3.jpg" alt="User" />
                                    <figure>
                                        <figcaption>
                                            {isLoggedIn && user ? `Hello, ${user.username}` : 'Hello, Guest'}
                                        </figcaption>
                                        <p>{isLoggedIn && user ? user.email : 'Not logged in'}</p>
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

                    {/* Main Content Section */}
                    <div className="col-lg-9">
                        <div className="ps-page__content">
                            <FormChangeUserInformation />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default UserInformation;
