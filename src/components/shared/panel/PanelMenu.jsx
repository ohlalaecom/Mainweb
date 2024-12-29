import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Spin } from 'antd';
import Link from 'next/link';

const { SubMenu } = Menu;

class PanelMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [],
            categories: [], // Store fetched categories
            loading: true, // Track loading state
        };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4'];
    }

    // Fetch categories from the API
    fetchCategories = async () => {
        try {
            const response = await fetch('https://strapi-app-tntk.onrender.com/api/product-categories');
            const data = await response.json();
            if (data && data.data) {
                const transformedCategories = data.data.map((category) => ({
                    id: category.id,
                    text: this.formatSlugToText(category.attributes.slug),
                    slug: category.attributes.slug,
                    subMenu: category.attributes.subcategories || [], // Assuming subcategories exist
                }));
                this.setState({ categories: transformedCategories, loading: false });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.setState({ loading: false });
        }
    };

    // Convert slugs to user-friendly text
    formatSlugToText = (slug) => {
        return slug.replace(/-/g, ' ').replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Handle open keys for the Menu
    onOpenChange = (openKeys) => {
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [],
            });
        }
    };

    // Fetch categories when the component mounts
    componentDidMount() {
        this.fetchCategories();
    }

    render() {
        const { categories, loading } = this.state;

        if (loading) {
            return <Spin size="large" />;
        }

        return (
            <Menu
                mode="inline"
                openKeys={this.state.openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2">
                {categories.map((item) => {
                    if (item.subMenu.length > 0) {
                        return (
                            <SubMenu
                                key={item.text}
                                title={<Link href={`/shop?category=${item.slug}`}>{item.text}</Link>}>
                                {item.subMenu.map((subItem) => (
                                    <Menu.Item key={subItem.text}>
                                        <Link href={`/shop?subcategory=${subItem.slug}`}>
                                            {this.formatSlugToText(subItem.slug)}
                                        </Link>
                                    </Menu.Item>
                                ))}
                            </SubMenu>
                        );
                    } else {
                        return (
                            <Menu.Item key={item.text}>
                                <Link href={`/shop?category=${item.slug}`}>{item.text}</Link>
                            </Menu.Item>
                        );
                    }
                })}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => {
    return state.setting;
};

export default connect(mapStateToProps)(PanelMenu);
