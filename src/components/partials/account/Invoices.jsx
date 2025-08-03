import React from 'react';
import AccountMenuSidebar from './modules/AccountMenuSidebar';
import TableInvoices from './modules/TableInvoices';

export default function Invoices() {
   const accountLinks = [
        { text: 'Account Information', url: '/account/user-information', icon: 'icon-user', active: true },
        // { text: 'Notifications', url: '/account/notifications', icon: 'icon-alarm-ringing' },
        // { text: 'Invoices', url: '/account/invoices', icon: 'icon-papers' },
        { text: 'Address', url: '/account/addresses', icon: 'icon-map-marker' },
        // { text: 'Recent Viewed Product', url: '/account/recent-viewed-product', icon: 'icon-store' },
        // { text: 'Wishlist', url: '/account/wishlist', icon: 'icon-heart' },
    ];

    return (
        <section className="ps-my-account ps-page--account">
            <div className="container">
                <div className="row">
                    <div className="col-lg-4">
                        <div className="ps-page__left">
                            <AccountMenuSidebar data={accountLinks} />
                        </div>
                    </div>
                    <div className="col-lg-8">
                        <div className="ps-page__content">
                            <div className="ps-section--account-setting">
                                <div className="ps-section__header">
                                    <h3>Invoices</h3>
                                </div>
                                <div className="ps-section__content">
                                    <TableInvoices />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
