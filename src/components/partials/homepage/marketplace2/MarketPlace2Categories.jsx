import React from 'react';
import Link from 'next/link';

const MarketPlace2Categories = () => (
    <div className="ps-home-categories">
        <div className="container">
            <div className="ps-section__header">
                <h3>Top Categories Of The Month</h3>
            </div>
            <div className="ps-section__content">
                <div className="row align-content-lg-stretch">
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/5.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div className="ps-block__content">
                                <h4>Electronics</h4>
                                <ul>
                                    <li>
                                        <Link href={'/shop'}>
                                            TV Televisions
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Air Conditioners
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Washing Machines
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Audio & Theaters
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Audio & Theaters
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Office Electronics
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/1.jpg"
                                    alt="martfury"
                                />
                            </div>
                          
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/9.jpg"
                                    alt="martfury"
                                />
                            </div>
                            <div className="ps-block__content">
                                <h4>Computers</h4>
                                <ul>
                                    <li>
                                        <Link href={'/shop'}>Desktop PC</Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>Laptop</Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>PC Gaming</Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            Storage & Memory
                                        </Link>
                                    </li>
                                    <li>
                                        <Link href={'/shop'}>
                                            PC Components
                                        </Link>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/2.jpg"
                                    alt="martfury"
                                />
                            </div>
                          
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/10.jpg"
                                    alt="martfury"
                                />
                            </div>
                         
                        </div>
                    </div>
                    <div className="col-xl-4 col-lg-4 col-md-4 col-sm-6 col-12">
                        <div
                            className="ps-block--category-2"
                            data-mh="categories">
                            <div className="ps-block__thumbnail">
                                <img
                                    src="/static/img/categories/shop/6.jpg"
                                    alt="martfury"
                                />
                            </div>
                           
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
);

export default MarketPlace2Categories;
