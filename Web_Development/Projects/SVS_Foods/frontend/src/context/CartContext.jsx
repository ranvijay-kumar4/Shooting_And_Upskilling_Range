import React, { createContext, useReducer, useEffect, useContext } from 'react';

const CartContext = createContext(null);

const CART_STORAGE_KEY = 'svs_foods_cart';

const cartReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_ITEM': {
      const existingItemIndex = state.items.findIndex(
        item => item.menuItem === action.payload._id
      );

      let newItems;
      if (existingItemIndex > -1) {
        newItems = state.items.map((item, index) =>
          index === existingItemIndex
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        newItems = [
          ...state.items,
          {
            menuItem: action.payload._id,
            name: action.payload.name,
            price: action.payload.price,
            image: action.payload.imageUrl,
            quantity: 1
          }
        ];
      }

      return {
        ...state,
        items: newItems,
        totalAmount: calculateTotal(newItems)
      };
    }

    case 'REMOVE_ITEM': {
      const newItems = state.items.filter(
        item => item.menuItem !== action.payload
      );
      return {
        ...state,
        items: newItems,
        totalAmount: calculateTotal(newItems)
      };
    }

    case 'UPDATE_QTY': {
      const { itemId, quantity } = action.payload;
      if (quantity < 1) return state;

      const newItems = state.items.map(item =>
        item.menuItem === itemId ? { ...item, quantity: parseInt(quantity, 10) } : item
      );

      return {
        ...state,
        items: newItems,
        totalAmount: calculateTotal(newItems)
      };
    }

    case 'CLEAR_CART':
      return {
        items: [],
        totalAmount: 0
      };

    default:
      return state;
  }
};

const calculateTotal = (items) => {
  return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
};

export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(cartReducer, { items: [], totalAmount: 0 }, () => {
    // Load initial cart state from localStorage
    try {
      const localData = localStorage.getItem(CART_STORAGE_KEY);
      if (localData) {
        const parsed = JSON.parse(localData);
        return {
          items: parsed.items || [],
          totalAmount: parsed.totalAmount || 0
        };
      }
    } catch (e) {
      console.error('Failed to parse cart local storage:', e);
    }
    return { items: [], totalAmount: 0 };
  });

  // Sync cart state with localStorage
  useEffect(() => {
    localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(state));
  }, [state]);

  const addItem = (item) => dispatch({ type: 'ADD_ITEM', payload: item });
  const removeItem = (itemId) => dispatch({ type: 'REMOVE_ITEM', payload: itemId });
  const updateQty = (itemId, quantity) => dispatch({ type: 'UPDATE_QTY', payload: { itemId, quantity } });
  const clearCart = () => dispatch({ type: 'CLEAR_CART' });

  return (
    <CartContext.Provider value={{
      cart: state,
      addItem,
      removeItem,
      updateQty,
      clearCart
    }}>
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
