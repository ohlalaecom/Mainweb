// import React from 'react';
// import { useSelector } from 'react-redux';
// import Link from 'next/link';
// import AccountQuickLinksMobile from './AccountQuickLinksMobile';

// const MobileHeaderActions = ({ auth }) => {
//     const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
//     const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

//     return (
//         <div className="navigation__right">
//             <Link href="/account/shopping-cart" className="header__extra">
//                 <i className="icon-bag2" />
//                 <span>
//                     <i>{cartItems ? cartItems.length : 0}</i>
//                 </span>
//             </Link>

//             {isLoggedIn && Boolean(isLoggedIn) === true ? (
//                 <AccountQuickLinksMobile />
//             ) : (
//                 <div className="header__extra">
//                     <Link href="/account/login" legacyBehavior>
//                         <i className="icon-user" />
//                     </Link>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default MobileHeaderActions;
import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import { Dropdown, Menu } from 'antd';
import AccountQuickLinksMobile from './AccountQuickLinksMobile';

const MobileHeaderActions = () => {
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const isLoggedIn = useSelector(({ user }) => user.isLoggedIn);

    const guestMenu = (
        <Menu>
            <Menu.Item key="/account/login">
                <Link href="/account/login">Login</Link>
            </Menu.Item>
            <Menu.Item key="/account/register">
                <Link href="/account/register">Register</Link>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className="navigation__right">
            <Link href="/account/shopping-cart" className="header__extra">
                <i className="icon-bag2" />
                <span>
                    <i>{cartItems ? cartItems.length : 0}</i>
                </span>
            </Link>

            {isLoggedIn ? (
                <AccountQuickLinksMobile />
            ) : (
                <Dropdown overlay={guestMenu} placement="bottomLeft">
                    <a href="#" className="header__extra ps-user--mobile">
                        <i className="icon-user" />
                    </a>
                </Dropdown>
            )}
        </div>
    );
};

export default MobileHeaderActions;
