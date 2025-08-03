import React from 'react';
import Link from 'next/link';
import { Dropdown, Menu } from 'antd';
import { userChangeIsLoggedIn } from '~/redux/features/userSlide';
import { useDispatch } from 'react-redux';

// const accountLinks = [
//     {
//         text: 'Account Information',
//         url: '/account/user-information',
//     },
//     {
//         text: 'Notifications',
//         url: '/account/notifications',
//     },
//     {
//         text: 'Invoices',
//         url: '/account/invoices',
//     },
//     {
//         text: 'Address',
//         url: '/account/addresses',
//     },
//     {
//         text: 'Recent Viewed Product',
//         url: '/account/recent-viewed-product',
//     },
//     {
//         text: 'Wishlist',
//         url: '/account/wishlist',
//     },
// ];

 const accountLinks = [
        { text: 'Account Information', url: '/account/user-information', icon: 'icon-user', active: true },
        // { text: 'Notifications', url: '/account/notifications', icon: 'icon-alarm-ringing' },
        // { text: 'Invoices', url: '/account/invoices', icon: 'icon-papers' },
        { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
        // { text: 'Recent Viewed Product', url: '/account/recent-viewed-product', icon: 'icon-store' },
        // { text: 'Wishlist', url: '/account/wishlist', icon: 'icon-heart' },
    ];

export default function AccountQuickLinks() {
    const dispatch = useDispatch();
    const handleLogout = (e) => {
        dispatch(userChangeIsLoggedIn(false));
    };

    const menu = (
        <Menu>
            {accountLinks.map((link) => (
                <Menu.Item key={link.url}>
                    <Link href={link.url}>{link.text}</Link>
                </Menu.Item>
            ))}

            {/* <Menu.Item>
                <a href="#" onClick={handleLogout}>
                    Logout
                </a>
            </Menu.Item> */}
        </Menu>
    );

    return (
        <Dropdown overlay={menu} placement="bottomLeft">
            <a href="#" className="header__extra ps-user--mobile">
                <i className="icon-user" />
            </a>
        </Dropdown>
    );
}
