// import React, { useMemo } from 'react';
// import Product from '~/components/elements/products/Product';
// import useGetProducCollection from '~/hooks/useGetProducCollection';

// const WidgetProductSameBrands = ({ collectionSlug }) => {
//     const { collectionLoading, collectionDetail } =
//         useGetProducCollection(collectionSlug);

//     const products = useMemo(() => {
//         if (!collectionDetail) return [];
//         return collectionDetail.attributes?.products?.data || [];
//     }, [collectionDetail]);

//     // DOM RENDERING
//     const productContent = useMemo(() => {
//         if (collectionLoading) return <p>loading...</p>;
//         if (products.length === 0) return <p>No product found.</p>;
//         return products.map((item) => <Product product={item} key={item.id} />);
//     }, [collectionLoading, products]);

//     return (
//         <aside className="widget widget_same-brand">
//             <h3>Same Brand</h3>
//             <div className="widget__content">{productContent}</div>
//         </aside>
//     );
// };

// // export default WidgetProductSameBrands;


// import React, { useMemo } from 'react';
// import Product from '~/components/elements/products/Product';
// import useGetProductByBrandSlug from '~/hooks/useGetProductByBrandSlug';

// const WidgetProductSameBrands = ({ product }) => {
//     const brandSlug = product?.attributes?.product_brand?.data?.attributes?.slug;
//     const currentProductId = product?.id;
//     const { loading, products } = useGetProductByBrandSlug(brandSlug, currentProductId);

//     const productContent = useMemo(() => {
//         if (loading) return <p>Loading...</p>;
//         if (products.length === 0) return <p>No products found.</p>;
//         return products.map((item) => <Product product={item} key={item.id} />);
//     }, [loading, products]);

//     return (
//         <aside className="widget widget_same-brand">
//             <h3>Same Brand</h3>
//             <div className="widget__content">{productContent}</div>
//         </aside>
//     );
// };

// export default WidgetProductSameBrands;

import React, { useMemo } from 'react';
import Product from '~/components/elements/products/Product';
import useGetProductByBrandSlug from '~/hooks/useGetProductByBrandSlug';

const WidgetProductSameBrands = ({ product }) => {
    const brandSlug = product?.attributes?.product_brand?.data?.attributes?.slug;
    const currentProductId = product?.id;
    const { loading, products } = useGetProductByBrandSlug(brandSlug, currentProductId);

    const productContent = useMemo(() => {
        if (loading) return <p>Loading...</p>;
        if (products.length === 0) return <p>No products found.</p>;
        return products.map((item) => (
            <div key={item.id} style={{ flex: '0 0 auto', marginRight: '15px' }}>
                <Product product={item} />
            </div>
        ));
    }, [loading, products]);

    return (
        <aside className="widget widget_same-brand">
            <h3>Same Brand</h3>
            <div
                className="widget__content"
                style={{
                    display: 'flex',
                    overflowX: 'auto',
                    paddingBottom: '10px',
                }}
            >
                {productContent}
            </div>
        </aside>
    );
};

export default WidgetProductSameBrands;