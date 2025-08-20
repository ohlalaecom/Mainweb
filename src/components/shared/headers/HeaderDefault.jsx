// import React, { useEffect } from 'react';
// import Logo from '~/components/elements/common/Logo';
// import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
// import DesktopNavigation from '~/components/shared/navigation/DesktopNavigation';
// import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
// import { stickyHeader } from '~/utilities/common-helpers';
// import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';

// const HeaderDefault = () => {
//     useEffect(() => {
//         if (process.browser) {
//             window.addEventListener('scroll', stickyHeader);
//         }
//     }, []);

//     return (
//         <header
//             className="header header--1"
//             data-sticky="true"
//             id="headerSticky">
//             <div className="header__top">
//                 <div className="ps-container">
//                     <div className="header__left">
//                         <Logo />
//                         <MenuCategoriesDropdown />
//                     </div>
//                     <div className="header__center">
//                         {/* <SearchHeader /> */}
//                     </div>
//                     <div className="header__right">
//                         <HeaderActions />
//                     </div>
//                 </div>
//             </div>
//             <DesktopNavigation />
//         </header>
//     );
// };

// export default HeaderDefault;
import React, { useEffect } from 'react';
import Logo from '~/components/elements/common/Logo';
import SearchHeader from '~/components/shared/headers/modules/SearchHeader';
import DesktopNavigation from '~/components/shared/navigation/DesktopNavigation';
import HeaderActions from '~/components/shared/headers/modules/HeaderActions';
import { stickyHeader } from '~/utilities/common-helpers';
import MenuCategoriesDropdown from '~/components/shared/menus/MenuCategoriesDropdown';

const HeaderDefault = () => {
    useEffect(() => {
        if (process.browser) {
            window.addEventListener('scroll', stickyHeader);
        }
    }, []);

    return (
        <>
        <style jsx global>{`

    /* After scroll */
    #headerSticky.header--sticky {
        background-color: #008b3e !important;
        transition: background-color 0.3s ease;
    }
    #headerSticky.header--sticky .header__top,
    #headerSticky.header--sticky .navigation {
        background-color: #008b3e !important; /* force green */
    }
    #headerSticky.header--sticky a,
    #headerSticky.header--sticky span,
    #headerSticky.header--sticky i {
        color: #fff !important;
    }
`}</style>
        <header
            className="header header--1"
            data-sticky="true"
            id="headerSticky">
            <div className="header__top">
                <div className="ps-container">
                    <div className="header__left">
                        <Logo />
                        <MenuCategoriesDropdown />
                    </div>
                    <div className="header__center">
                        {/* <SearchHeader /> */}
                    </div>
                    <div className="header__right">
                        <HeaderActions />
                    </div>
                </div>
            </div>
            <DesktopNavigation />
        </header>
        </>
    );
};

export default HeaderDefault;
