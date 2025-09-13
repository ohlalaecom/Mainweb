import React from 'react';
import Link from 'next/link';

const HomeDefaultTopCategories = () => (
    <div className="ps-top-categories">
        <div className="ps-container">
            <h3>Top categories of the Month</h3>
            <div className="row">
                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href={`/category/consumer-electronics`} className="ps-block__overlay" />
                        <img
                            src="/static/img/categories/1.jpg"
                            alt="Jacobs-Electronics"
                        />
                        <p>Consumer Electronics</p>
                    </div>
                </div>

                <div className="col-xl-2 col-lg-3 col-md-4 col-sm-4 col-6 ">
                    <div className="ps-block--category">
                        <Link href={`/category/computers-and-technologies`} className="ps-block__overlay" />
                        <img
                            src="/static/img/categories/3.jpg"
                            alt="Jacobs-Electronics"
                        />
                        <p>Computers & Technologies</p>
                    </div>
                </div>



            </div>
        </div>
    </div>
);

export default HomeDefaultTopCategories;
