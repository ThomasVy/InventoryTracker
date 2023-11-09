import { createContext, useState, ReactNode, useMemo } from "react";
import ShoppingCartDrawer from "src/components/ShoppingCartDrawer";

export interface ShoppingCartItem {
  id: number;
  quantity: number;
}

interface ShoppingCartState {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearShoppingCart: () => void;
  openCart: () => void;
  closeCart: () => void;
  totalItemsInCart: number;
  shoppingCart: ShoppingCartItem[];
}

const ShoppingCartContext = createContext<ShoppingCartState>(
  {} as ShoppingCartState
);

type ShoppingCartProviderProps = {
  children: ReactNode;
};

export const ShoppingCartProvider = ({
  children,
}: ShoppingCartProviderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [shoppingCart, setShoppingCart] = useState<ShoppingCartItem[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const totalItemsInCart = useMemo(() => {
    return shoppingCart.reduce((quantity, item) => quantity + item.quantity, 0);
  }, [shoppingCart]);
  const clearShoppingCart = () => setShoppingCart([]);
  const getItemQuantity = (id: number) => {
    return shoppingCart.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setShoppingCart((prevItems) => {
      if (!prevItems.find((item) => item.id === id)) {
        return [...prevItems, { id, quantity: 1 }];
      }
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setShoppingCart((prevItems) => {
      if (prevItems.find((item) => item.id === id)?.quantity === 1) {
        return prevItems.filter((item) => item.id !== id);
      }
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity - 1 };
        }
        return item;
      });
    });
  };
  const removeFromCart = (id: number) => {
    setShoppingCart((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        totalItemsInCart,
        shoppingCart,
        clearShoppingCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
      }}
    >
      {children}
      <ShoppingCartDrawer isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
