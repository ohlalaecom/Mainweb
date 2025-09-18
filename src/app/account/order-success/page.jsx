'use client';
import React from 'react';
import { useRouter } from 'next/navigation';
import { Button } from 'antd';
import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

export default function OrderSuccess() {
    const router = useRouter();

    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Order Success',
        },
    ];

    const handleOk = () => {
        router.push('/');
    };

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Order Success">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <div className="container">
                        <div className="ps-section__content">
                            <div className="row">
                                <div className="col-lg-8 offset-lg-2">
                                    <div className="ps-section__block">
                                        <div className="ps-block__header">
                                            <h3>Thank you for your order!</h3>
                                        </div>
                                        <div className="ps-block__content">
                                            <p>Your order has been placed successfully with Cash on Delivery. We will contact you soon to confirm the details.</p>
                                            <p>Order ID and other details are available in your account.</p>
                                            <div className="ps-block__footer text-center">
                                                <Button type="primary" size="large" onClick={handleOk}>
                                                    Back to Home
                                                </Button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <Newletters layout="container" />
                </div>
            </PageContainer>
        </>
    );
}