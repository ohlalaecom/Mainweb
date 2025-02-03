import React, { useEffect, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Link from 'next/link';
import Image from 'next/image';
import useGetProducts from '~/hooks/useGetProducts';
import { getStrapiImageURL } from '~/services/strapiServices/image/getStrapiImageService';
import ModuleCartSummary from '~/components/ecomerce/modules/ModuleCartSummary';
import { increaseItemQty, decreaseItemQty } from '~/redux/features/ecommerceSlide';
import './cart.css';

export default function CartContent() {
    const dispatch = useDispatch();
    const cartItems = useSelector(({ ecomerce }) => ecomerce.cartItems);
    const { getStrapiProducts, products } = useGetProducts();

    function getCartProducts() {
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
    }

    useEffect(() => {
        getCartProducts();
    }, [cartItems]);  

    const cartProducts = useMemo(() => {
        if (cartItems.length === 0) return [];
        return products.map((product) => ({
            id: product.id,
            title: product.attributes.title || 'Untitled Product',
            slug: product.attributes.slug || 'untitled-product',
            thumbnailImage: product.attributes.thumbnail
                ? getStrapiImageURL(product.attributes.thumbnail)
                : 'https://placehold.co/400x400',
            price: product.attributes.price || 0,
            sale_price: product.attributes.sale_price || 0,
            quantity:
                cartItems.find((item) => item.id === product.id)?.quantity ?? 0,
        }));
    }, [products, cartItems]);

    function handleIncreaseItemQty(e, id) {
        e.preventDefault();
        dispatch(increaseItemQty(id));
    }

    function handleDecreaseItemQty(e, id) {
        e.preventDefault();
        dispatch(decreaseItemQty(id));
    }

    const content = useMemo(() => {
        if (cartProducts.length === 0) {
            return (
                <div className="ps-section__content">
                    <div className="alert alert-info">
                        <p className="mb-0">Your cart is currently empty.</p>
                    </div>
                    <div className="ps-section__cart-actions">
                        <Link href={'/shop'} className="ps-btn">
                            Back to Shop
                        </Link>
                    </div>
                </div>
            );
        }
        return (
            <div className="ps-section__content">
                <table className="table table-bordered">
                    <thead style={{ backgroundColor: 'lightblue' }}>
                        <tr>
                            <th>Product</th>
                            <th>Name</th>
                            <th>Price</th>
                            <th>Quantity</th>
                            <th>Total</th>
                        </tr>
                    </thead>
                    <tbody>
                        {cartProducts.map((item) => (
                            <tr key={item.id}>
                                <td>
                                    <Link href={'/product/[pid]'} as={`/product/${item.id}`}>
                                        <Image
                                            src={item.thumbnailImage}
                                            alt={item.title}
                                            width={80}
                                            height={80}
                                            className="ps-cart-item__thumbnail"
                                        />
                                    </Link>
                                </td>
                                <td>
                                    <Link href={`/product/${item.slug}`}>
                                        {item.title}
                                    </Link>
                                </td>
                                <td>${item.sale_price || item.price}</td>
                                <td>
                                    <div className="form-group--number">
                                        <button
                                            className="down"
                                            onClick={(e) =>
                                                handleDecreaseItemQty(e, item.id)
                                            }>
                                            -
                                        </button>
                                        <span>{item.quantity}</span>
                                        <button
                                            className="up"
                                            onClick={(e) =>
                                                handleIncreaseItemQty(e, item.id)
                                            }>
                                            +
                                        </button>
                                    </div>
                                </td>
                                <td>${item.quantity * (item.sale_price || item.price)}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>

                <div className="ps-section__footer">
                    <div className="row justify-space-between">
                        <div className="col-xl-8 col-lg-4 col-md-12 col-sm-12 col-12">
                            <div className="row">
                                <div className="col-lg-6">
                                    <figure>
                                        <figcaption>Coupon Discount</figcaption>
                                        <div className="form-group">
                                            <input
                                                className="form-control"
                                                type="text"
                                                placeholder="Enter coupon here..."
                                            />
                                        </div>
                                        <div className="form-group">
                                            <button className="ps-btn ps-btn--outline">
                                                Apply
                                            </button>
                                        </div>
                                    </figure>
                                </div>
                            </div>
                        </div>
                        <div className="col-xl-4 col-lg-4 col-md-12 col-sm-12 col-12">
                            <ModuleCartSummary source={cartProducts} />
                            <Link
                                href={'/account/checkout'}
                                className="ps-btn ps-btn--fullwidth">
                                Proceed to checkout
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="ps-section__cart-actions">
                    <Link href={'/shop'} className="ps-btn">
                        Back to Shop
                    </Link>
                </div>
            </div>
        );
    }, [cartProducts]);

    return <section>{content}</section>;
}
