import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Menu, Spin } from 'antd';
import Link from 'next/link';

const { SubMenu } = Menu;

class PanelMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            openKeys: [], // Tracks which menu is open
            categories: [], // Categories data
            loading: true, // Initial loading state
            products: {}, // Cached products
            fetchingProducts: null, // Category being fetched
        };
        this.rootSubmenuKeys = ['sub1', 'sub2', 'sub4']; // Properly initializing the root submenu keys
    }

    // Fetch categories on component mount
    componentDidMount() {
        this.fetchCategories();
    }

    // Fetch categories from the API
    fetchCategories = async () => {
        try {
            const response = await fetch('https://admin.jacobs-electronics.com/api/product-categories');
            const data = await response.json();
            if (data?.data) {
                const transformedCategories = data.data.map((category) => ({
                    id: category.id,
                    text: this.formatSlugToText(category.attributes.slug),
                    slug: category.attributes.slug,
                    subMenu: category.attributes.subcategories || [],
                }));
                this.setState({ categories: transformedCategories, loading: false });
            }
        } catch (error) {
            console.error('Error fetching categories:', error);
            this.setState({ loading: false });
        }
    };

    // Fetch products for a given category
    fetchProducts = async (categoryId) => {
        // Skip if the category is already loaded or is currently being fetched
        if (this.state.products[categoryId] || this.state.fetchingProducts === categoryId) return;

        // Mark the category as being fetched
        this.setState({ fetchingProducts: categoryId });

        try {
            const url = `https://admin.jacobs-electronics.com/api/products?filters[category][id]=${categoryId}`;
            const response = await fetch(url);
            const data = await response.json();

            if (data?.data) {
                const products = data.data.map((product) => ({
                    id: product.id,
                    text: product.attributes.title,
                    slug: product.attributes.slug,
                }));

                this.setState((prevState) => ({
                    products: { ...prevState.products, [categoryId]: products },
                    fetchingProducts: null,
                    openKeys: [...prevState.openKeys, categoryId.toString()], // Keep this category open after loading
                }));
            }
        } catch (error) {
            console.error('Error fetching products:', error);
            this.setState({ fetchingProducts: null });
        }
    };

    // Convert slugs to user-friendly text
    formatSlugToText = (slug) => {
        return slug
            .replace(/-/g, ' ')
            .replace(/\b\w/g, (char) => char.toUpperCase());
    };

    // Handle open/close of submenus
    onOpenChange = (openKeys) => {
        // Ensure that openKeys is valid
        const latestOpenKey = openKeys.find(
            (key) => this.state.openKeys.indexOf(key) === -1
        );
        if (latestOpenKey && this.rootSubmenuKeys.indexOf(latestOpenKey) === -1) {
            this.setState({ openKeys });
        } else {
            this.setState({
                openKeys: latestOpenKey ? [latestOpenKey] : [], // Close all other submenus
            });
        }
    };

    render() {
        const { categories, loading, products, fetchingProducts, openKeys } = this.state;

        if (loading) {
            return <Spin size="large" />;
        }

        return (
            <Menu
                mode="inline"
                openKeys={openKeys}
                onOpenChange={this.onOpenChange}
                className="menu--mobile-2"
            >
                {categories.map((category) => {
                    const productItems = products[category.id] || [];
                    return (
                        <SubMenu
                            key={category.id.toString()}
                            title={
                                <div
                                    onClick={() => !products[category.id] && this.fetchProducts(category.id)}
                                    style={{ cursor: 'pointer' }}
                                >
                                    <Link href={`/category/${category.slug}`} legacyBehavior>
                                        {category.text}
                                    </Link>
                                </div>
                            }
                        >
                            {fetchingProducts === category.id ? (
                                <Menu.Item key="loading">
                                    <Spin size="small" />
                                </Menu.Item>
                            ) : (
                                productItems.map((product) => (
                                    <Menu.Item key={product.id.toString()}>
                                        <Link href={`/product/${product.slug}`} legacyBehavior>
                                            {product.text}
                                        </Link>
                                    </Menu.Item>
                                ))
                            )}
                        </SubMenu>
                    );
                })}
            </Menu>
        );
    }
}

const mapStateToProps = (state) => state.setting;

export default connect(mapStateToProps)(PanelMenu);
