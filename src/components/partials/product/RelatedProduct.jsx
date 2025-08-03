// import React, { useEffect, useMemo } from 'react';
// import Slider from 'react-slick';
// import Product from '~/components/elements/products/Product';
// import { carouselStandard } from '~/utilities/carousel-helpers';
// import NextArrow from '~/components/elements/carousel/NextArrow';
// import PrevArrow from '~/components/elements/carousel/PrevArrow';
// import useGetProducts from '~/hooks/useGetProducts';
// import { DEFAULT_QUERY_GET_PRODUCTS } from '~/services/queries/productStrapiQueries';

// const RelatedProduct = ({ collectionSlug, boxed, layout }) => {
//     const { loading, products, getStrapiProducts } = useGetProducts();

//     useEffect(() => {
//         const query = {
//             ...DEFAULT_QUERY_GET_PRODUCTS,
//             filters: {
//                 product_collections: {
//                     slug: {
//                         $eq: collectionSlug,
//                     },
//                 },
//             },
//         };
//         getStrapiProducts(query);
//     }, [collectionSlug]);

//     const carouselFullwidth = {
//         dots: false,
//         infinite: !!(products && products.length > 7),
//         speed: 750,
//         slidesToShow: 7,
//         slidesToScroll: 3,
//         arrows: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         lazyload: true,
//         responsive: [
//             {
//                 breakpoint: 1750,
//                 settings: {
//                     slidesToShow: 6,
//                     slidesToScroll: 3,
//                     dots: true,
//                     arrows: false,
//                 },
//             },

//             {
//                 breakpoint: 1366,
//                 settings: {
//                     slidesToShow: 5,
//                     slidesToScroll: 2,
//                     infinite: true,
//                     dots: true,
//                     arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 1200,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 1024,
//                 settings: {
//                     slidesToShow: 4,
//                     slidesToScroll: 1,
//                     infinite: true,
//                     dots: true,
//                 },
//             },
//             {
//                 breakpoint: 768,
//                 settings: {
//                     slidesToShow: 3,
//                     slidesToScroll: 2,
//                     dots: true,
//                     arrows: false,
//                 },
//             },
//             {
//                 breakpoint: 480,
//                 settings: {
//                     slidesToShow: 2,
//                     dots: true,
//                     arrows: false,
//                 },
//             },
//         ],
//     };

//     const carouselContent = useMemo(() => {
//         if (loading) return <p>Loading...</p>;
//         if (products.length === 0) return <p>No product found.</p>;
//         return layout === 'fullwidth ' ? (
//             <Slider {...carouselFullwidth} className="ps-carousel outside">
//                 {products.map((item, index) => {
//                     if (index < 8) {
//                         return <Product product={item} key={item.id} />;
//                     }
//                 })}
//             </Slider>
//         ) : (
//             <Slider {...carouselStandard} className="ps-carousel outside">
//                 {products.map((item, index) => {
//                     if (index < 8) {
//                         return <Product product={item} key={item.id} />;
//                     }
//                 })}
//             </Slider>
//         );
//     }, []);

//     return (
//         <div
//             className={`ps-section--default ps-related-products ${
//                 boxed === true ? 'boxed' : ''
//             }`}>
//             <div className="ps-section__header">
//                 <h3>Related products</h3>
//             </div>
//             <div className="ps-section__content">{carouselContent}</div>
//         </div>
//     );
// };

// export default RelatedProduct;
import React, { useEffect, useMemo } from 'react';
import Slider from 'react-slick';
import Product from '~/components/elements/products/Product';
import { carouselStandard } from '~/utilities/carousel-helpers';
import NextArrow from '~/components/elements/carousel/NextArrow';
import PrevArrow from '~/components/elements/carousel/PrevArrow';
import useGetProducts from '~/hooks/useGetProducts';
import { DEFAULT_QUERY_GET_PRODUCTS } from '~/services/queries/productStrapiQueries';

const RelatedProduct = ({ categoryId, excludeId, boxed, layout }) => {
    const { loading, products, getStrapiProducts } = useGetProducts();

    useEffect(() => {
        if (!categoryId) return;

        const query = {
            ...DEFAULT_QUERY_GET_PRODUCTS,
            filters: {
                product_categories: {
                    id: { $eq: categoryId },
                },
                id: {
                    $ne: excludeId,
                },
            },
            populate: ['thumbnail', 'product_categories'],
            sort: ['createdAt:desc'],
        };

        getStrapiProducts(query);
    }, [categoryId, excludeId]);

    const carouselSettings = {
        dots: false,
        infinite: false,
        speed: 750,
        slidesToShow: 4,
        slidesToScroll: 1,
        arrows: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
              {
            breakpoint: 1024,
            settings: {
                slidesToShow: 3,
                slidesToScroll: 3,
                infinite: true,
                dots: true,
            },
        },
        {
            breakpoint: 600,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
                initialSlide: 2,
            },
        },
        {
            breakpoint: 480,
            settings: {
                slidesToShow: 2,
                slidesToScroll: 2,
            },
        },
        ],
    };

    const carouselContent = useMemo(() => {
        if (loading) return <p>Loading...</p>;
        if (products.length === 0) return <p>No products found.</p>;

        console.log('Related products fetched:', products);

        return (
            <Slider {...carouselSettings} className="ps-carousel outside">
                {products.slice(0, 8).map((item) => (
                    <div key={item.id} style={{ padding: '0 10px' }}>
                        <Product product={item} />
                    </div>
                ))}
            </Slider>
        );
    }, [loading, products, layout]);

    return (
        <div
            className={`ps-section--default ps-related-products ${
                boxed === true ? 'boxed' : ''
            }`}
            style={{ marginTop: '30px' }}>
            <div className="ps-section__header">
                <h3>Related products</h3>
            </div>
            <div
                className="ps-section__content"
                style={{ padding: '0 10px', overflow: 'hidden' }}>
                {carouselContent}
            </div>
        </div>
    );
};

export default RelatedProduct;