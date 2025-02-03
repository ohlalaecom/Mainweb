import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    wishlistItems: [],
    compareItems: [],
    cartItems: [],
};

export const ecommerce = createSlice({
    name: 'ecommerce',
    initialState,
    reducers: {
        reset: () => initialState,
        showMessage: (state, action) => {
            return {
                state: true,
            };
        },
        changeCartItems: (state, action) => {
            return {
                ...state,
                cartItems: action.payload,
            };
        },
        changeWishlistItems: (state, action) => {
            return {
                ...state,
                wishlistItems: action.payload,
            };
        },
        changeCompareItems: (state, action) => {
            return {
                ...state,
                compareItems: action.payload,
            };
        },
        // Add these reducers for quantity handling
        increaseItemQty: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find((item) => item.id === itemId);
            if (cartItem) {
                cartItem.quantity += 1;
            }
        },
        decreaseItemQty: (state, action) => {
            const itemId = action.payload;
            const cartItem = state.cartItems.find((item) => item.id === itemId);
            if (cartItem && cartItem.quantity > 1) {
                cartItem.quantity -= 1;
            }
        },
    },
});

export const {
    reset,
    changeCartItems,
    changeWishlistItems,
    changeCompareItems,
    increaseItemQty, // Export new actions
    decreaseItemQty, // Export new actions
} = ecommerce.actions;

export default ecommerce.reducer;
