'use client';
import React from 'react';
import dynamic from 'next/dynamic';

import BreadCrumb from '~/components/elements/BreadCrumb';
import PageContainer from '~/components/layouts/PageContainer';
import FooterDefault from '~/components/shared/footers/FooterDefault';
import Newletters from '~/components/partials/commons/Newletters';

// Dynamically import Register component, disabling SSR (server-side rendering)
const Register = dynamic(() => import('~/components/partials/account/Register'), {
    ssr: false,  // Disable server-side rendering for this component
});

export default function Page() {
    const breadCrumb = [
        {
            text: 'Home',
            url: '/',
        },
        {
            text: 'Register an account',
        },
    ];

    return (
        <>
            <PageContainer footer={<FooterDefault />} title="Register">
                <div className="ps-page--my-account">
                    <BreadCrumb breacrumb={breadCrumb} />
                    <Register /> {/* Register component will be dynamically imported here */}
                </div>
                <Newletters layout="container" />
            </PageContainer>
        </>
    );
}
