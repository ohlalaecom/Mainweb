import React, { useEffect, useMemo } from 'react';
import { useSelector } from 'react-redux';
import Link from 'next/link';
import useEcomerce from '~/hooks/useEcomerce';
import { calculateAmount } from '~/utilities/ecomerce-helpers';
import useGetProducts from '~/hooks/useGetProducts';
import { getStrapiImageURL } from '~/services/strapiServices/image/getStrapiImageService';

const MiniCart = () => {
    const { removeItem } = useEcomerce();
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getStrapiProducts, products } = useGetProducts();

    // Remove item from cart
    const handleRemoveItem = (e, productId) => {
        e.preventDefault();
        removeItem({ id: productId }, cartItems, 'cart');
    };

    // Fetch products for the cart
    useEffect(() => {
        if (cartItems.length > 0) {
            const query = {
                filters: {
                    id: {
                        $in: cartItems.map((item) => item.id),
                    },
                },
            };
            getStrapiProducts(query);
        }
    }, [cartItems]);

    // Map products with fallback image handling
    const cartProducts = useMemo(() => {
        if (!products || products.length === 0) return [];
        return products.map((product) => {
            const thumbnail =
                product.attributes.thumbnail &&
                getStrapiImageURL(product.attributes.thumbnail);

            return {
                id: product.id,
                title: product.attributes.title || 'Untitled Product',
                slug: product.attributes.slug || 'untitled-product',
                thumbnailImage: thumbnail || 'https://via.placeholder.com/400', // Fallback image
                price: product.attributes.price || 0,
                quantity:
                    cartItems.find((item) => item.id === product.id)?.quantity ?? 0,
            };
        });
    }, [products, cartItems]);

    // Calculate total amount
    const cartAmount = useMemo(() => calculateAmount(cartProducts), [cartProducts]);

    return (
        <div className="ps-cart--mini">
            <a className="header__extra" href="#">
                <i className="icon-bag2" />
                <span>
                    <i>{cartProducts.length}</i>
                </span>
            </a>
            <div className="ps-cart__content">
                {cartProducts.length > 0 ? (
                    <>
                        <div className="ps-cart__items">
                            {cartProducts.map((product) => (
                                <div key={product.id} className="product-item">
                                    <img
                                        src={product.thumbnailImage}
                                        alt={product.title}
                                        style={{
                                            width: '100px',
                                            height: '100px',
                                            objectFit: 'cover',
                                        }}
                                        onError={(e) => {
                                            e.target.src =
                                                'https://via.placeholder.com/400'; // Final fallback
                                        }}
                                    />
                                    <h3>{product.title}</h3>
                                    <p>Price: ${product.price}</p>
                                    <p>Quantity: {product.quantity}</p>
                                    <button
                                        className="remove-item"
                                        onClick={(e) => handleRemoveItem(e, product.id)}>
                                        Remove
                                    </button>
                                </div>
                            ))}
                        </div>
                        <div className="ps-cart__footer">
                            <h3>
                                Sub Total: <strong>${cartAmount}</strong>
                            </h3>
                            <figure>
                                <Link href="/account/shopping-cart" className="ps-btn">
                                    View Cart
                                </Link>
                                <Link href="/account/checkout" className="ps-btn">
                                    Checkout
                                </Link>
                            </figure>
                        </div>
                    </>
                ) : (
                    <div className="ps-cart__items">
                        <span>No products in cart</span>
                    </div>
                )}
            </div>
        </div>
    );
};

export default MiniCart;
