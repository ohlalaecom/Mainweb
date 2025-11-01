import React from 'react';
import { formatCurrency } from '~/utilities/product-helper';
import Link from 'next/link';
import Image from 'next/image';
import { getStrapiImageURL } from '~/services/strapiServices/image/getStrapiImageService';

export default function useProduct(product, productID) {
    // Default to EUR if no currency is provided
    let currency = product?.currency?.toUpperCase() || 'EUR';

    // Fix invalid currency codes
    if (currency === 'EURO') {
        currency = 'EUR';
    }

    const productPrice = product?.sale_price ? (
        <p className="ps-product__price sale">
            {formatCurrency(product.sale_price, currency)}
            <del className="ml-2">
                {formatCurrency(product?.price, currency)}
            </del>
        </p>
    ) : (
        <p className="ps-product__price">
            {formatCurrency(product?.price, currency)}
        </p>
    );

    const productThumbnailImage = product?.thumbnail ? (
        <Image
            src={getStrapiImageURL(product.thumbnail)}
            alt=""
            layout="responsive"
            width={200}
            height={200}
            loading="lazy"
        />
    ) : (
        <img src="https://placehold.co/400x400" alt="" loading="lazy" />
    );

    const productName = product ? (
        <a
            href={`/product/${productID}`}
            target="_blank"
            rel="noopener noreferrer"
            className="ps-product__title"
        >
            {product.title}
        </a>
    ) : (
        <p>Untitled</p>
    );

    const getBadge = () => {
        let view;
        if (product.badge) {
            view = product.badge.map((badge) => {
                if (badge.type === 'sale') {
                    return (
                        <div className="ps-product__badge">{badge.value}</div>
                    );
                } else if (badge.type === 'outStock') {
                    return (
                        <div className="ps-product__badge out-stock">
                            {badge.value}
                        </div>
                    );
                } else {
                    return (
                        <div className="ps-product__badge hot">
                            {badge.value}
                        </div>
                    );
                }
            });
        }
        if (product.sale_price) {
            const discountPercent = (
                ((product.price - product.sale_price) / product.sale_price) *
                100
            ).toFixed(0);
            return <div className="ps-product__badge">-{discountPercent}%</div>;
        }
        return view;
    };

    const productBrand = (
        <Link href={'/shop'} className="text-capitalize">
            {product?.brands?.[0]?.name ?? 'No Brand'}
        </Link>
    );

    return {
        thumbnailImage: productThumbnailImage,
        price: productPrice,
        getHeadingPrice: productPrice,
        badge: () => getBadge(product),
        brand: productBrand,
        title: productName,
        productName,
    };
}
