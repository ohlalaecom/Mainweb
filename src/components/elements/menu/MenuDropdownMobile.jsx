import React from 'react';
import Link from 'next/link';
import { Menu } from 'antd';

const { SubMenu } = Menu;

const MenuDropdownMobile = ({ menuData }) => {
    return (
        <SubMenu
            key={menuData.text}
            title={
                menuData.type === 'dynamic' ? (
                    <Link
                        href={`${menuData.url}/[pid]`}
                        as={`${menuData.url}/${menuData.endPoint}`}>
                        {menuData.text}
                    </Link>
                ) : (
                    <Link href={menuData.url} as={menuData.alias}>
                        {menuData.text}
                    </Link>
                )
            }>
            {menuData.subMenu && (
                <ul className={menuData.subClass}>
                    {menuData.subMenu.map((subMenuItem, index) => (
                        <MenuDropdownMobile
                            menuData={subMenuItem}
                            key={index}
                        />
                    ))}
                </ul>
            )}
        </SubMenu>
    );
};

export default MenuDropdownMobile;
