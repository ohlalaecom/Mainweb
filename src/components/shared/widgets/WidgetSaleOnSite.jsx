import React from 'react';
import Link from 'next/link';

const WidgetSaleOnSite = () => {
    return (
        <aside className="widget widget_sell-on-site">
            <p>
                <i className="icon-store" /> sell on Oh-lala?
                <Link href="/account/register">Register Now !</Link>
            </p>
        </aside>
    );
};

export default WidgetSaleOnSite;
