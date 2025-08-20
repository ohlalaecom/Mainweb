// 'use client';
// import React, { useMemo } from 'react';
// import Link from 'next/link';
// import Slider from 'react-slick';
// import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
// import { carouselFullwidth } from '~/utilities/carousel-helpers';
// import CountDownSimple from '~/components/elements/CountDownSimple';
// import DealOfDayProduct from '~/components/elements/products/DealOfDayProduct';
// import { generateTempArray } from '~/utilities/common-helpers';
// import useGetProducCollection from '~/hooks/useGetProducCollection';
// import cx from 'classnames';
// import Image from 'next/image';
// import './dealoftheday.css';

// const HomeDefaultDealOfDay = ({ collectionSlug, fullWidth = true }) => {
//     const { collectionLoading, collectionDetail } = useGetProducCollection(collectionSlug);

//     const products = useMemo(() => {
//         if (collectionLoading) return [];
//         if (!collectionDetail) return [];
//         return collectionDetail.attributes?.products?.data || [];
//     }, [collectionDetail, collectionLoading]);

//     const productContent = useMemo(() => {
//         if (collectionLoading) {
//             const skeletons = generateTempArray(6).map((item) => (
//                 <div className="col-xl-12 col-lg-10 col-sm-3 col-12" key={item}>
//                     <SkeletonProduct />
//                 </div>
//             ));
//             return <div className="row">{skeletons}</div>;
//         } else if (!products || products.length === 0) {
//             return <p>No product(s) found.</p>;
//         } else {
//             return (
//                 <Slider {...carouselFullwidth} className="ps-carousel outside">
//                     {products.map((item) => (
//                         <DealOfDayProduct product={item} key={item.id} />
//                     ))}
//                 </Slider>
//             );
//         }
//     }, [collectionLoading, products]);

//     const dealImage =
//         products.length > 0
//             ? products[0]?.attributes?.image?.data?.attributes?.url
//             : null;

//     return (
//         <div className="ps-deal-of-day">
//             <div className={cx(fullWidth ? 'ps-container' : 'container')}>
//                 <div className="ps-section__header">
//                     <div className="ps-block--countdown-deal">
//                         <div className="ps-block__left">
//                             {dealImage ? (
//                                 <Image
//                                     src={dealImage}
//                                     alt="Deal of the day"
//                                     width={500}
//                                     height={300}
//                                     priority // Ensures the image loads quickly
//                                 />
//                             ) : (
//                                 <p></p>
//                             )}
//                             <h3>Deal of the day</h3>
//                         </div>
//                         <div className="ps-block__right">
//                             <figure>
//                                 <figcaption>End in:</figcaption>
//                                 <CountDownSimple
//                                     timeTillDate="12 31 2024, 6:00 am"
//                                     timeFormat="MM DD YYYY, h:mm a"
//                                 />
//                             </figure>
//                         </div>
//                     </div>
//                     <Link href="/shop">View all</Link>
//                 </div>
//                 <div className="ps-section__content">{productContent}</div>
//             </div>
//         </div>
//     );
// };

// export default HomeDefaultDealOfDay;

'use client';
import React, { useMemo } from 'react';
import Link from 'next/link';
import Slider from 'react-slick';
import SkeletonProduct from '~/components/elements/skeletons/SkeletonProduct';
import { carouselFullwidth } from '~/utilities/carousel-helpers';
import CountDownSimple from '~/components/elements/CountDownSimple';
import DealOfDayProduct from '~/components/elements/products/DealOfDayProduct';
import { generateTempArray } from '~/utilities/common-helpers';
import useGetProducCollection from '~/hooks/useGetProducCollection';
import cx from 'classnames';
import Image from 'next/image';
import './dealoftheday.css';

const HomeDefaultDealOfDay = ({ collectionSlug, fullWidth = false }) => {
    const { collectionLoading, collectionDetail } = useGetProducCollection(collectionSlug);

    const products = useMemo(() => {
        if (collectionLoading) return [];
        if (!collectionDetail) return [];
        // Show all products from the deal of the day collection
        return collectionDetail.attributes?.products?.data || [];
    }, [collectionDetail, collectionLoading]);

    const productContent = useMemo(() => {
        if (collectionLoading) {
            const skeletons = generateTempArray(6).map((item) => (
                <div className="col-xl-6 col-lg-6 col-sm-3 col-6" key={item}>
                    <SkeletonProduct />
                </div>
            ));
            return <div className="row">{skeletons}</div>;
        } else if (!products || products.length === 0) {
            return <p>No product(s) found.</p>;
        } else {
            return (
                <Slider {...carouselFullwidth} className="ps-carousel outside">
                    {products.map((item) => (
                        <DealOfDayProduct product={item} key={item.id} />
                    ))}
                </Slider>
            );
        }
    }, [collectionLoading, products]);

    const dealImage =
        products.length > 0
            ? products[0]?.attributes?.image?.data?.attributes?.url
            : null;

    return (
        <div className="ps-deal-of-day">
            <div className={cx(fullWidth ? 'ps-container' : 'container')}>
                <div className="ps-section__header">
                    <div className="ps-block--countdown-deal">
                        <div className="ps-block__left">
                            {dealImage ? (
                                <Image
                                    src={dealImage}
                                    alt="Deal of the day"
                               
                                    priority // Ensures the image loads quickly
                                />
                            ) : (
                                <p></p>
                            )}
                            <h3>Deal of the day</h3>
                        </div>
                        <div className="ps-block__right">
                            <figure>
                                <figcaption>End in:</figcaption>
                                <CountDownSimple
                                    timeTillDate="12 31 2025, 6:00 am"
                                    timeFormat="MM DD YYYY, h:mm a"
                                />
                            </figure>
                        </div>
                    </div>
                    <Link href="/shop">View all</Link>
                </div>
                <div className="ps-section__content">{productContent}</div>
            </div>
        </div>
    );
};

export default HomeDefaultDealOfDay;
