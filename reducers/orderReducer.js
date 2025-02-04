// orderReducer.js

const initialState = {
    orders: [], // List of all orders
};

const orderReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD_ORDER':
            return {
                ...state,
                orders: [...state.orders, action.payload],
            };

    
        default:
            return state;
    }
};

export default orderReducer;
