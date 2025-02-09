import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import ModuleEcomerceCartItems from '~/components/ecomerce/modules/ModuleEcomerceCartItems';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';

const ShoppingCart = ({ source }) => {
    const [cartItems, setCartItems] = useState(null);

    useEffect(() => {
        if (source && source.length > 0) {
            setCartItems(source);
        }
    }, [source]);

    return (
        <div className="ps-section--shopping ps-shopping-cart">
            <div className="container">
                <div className="ps-section__header">
                    <h2>Shopping Cart</h2>
                </div>
                <div className="ps-section__content">
                    <ModuleEcomerceCartItems cartItems={cartItems} />

                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'}>
                            <i className="icon-arrow-left mr-2" />
                            Back to Shop
                        </Link>
                    </div>
                </div>
                <div className="ps-section__footer">
                    <div className="row justify-content-end">
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ModuleCartSummary source={cartItems} />
                            <Link
                                href="/account/checkout"
                                className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ShoppingCart;
