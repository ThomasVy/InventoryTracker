import { createContext, useState, ReactNode } from "react";
import ShoppingCartDrawer from "src/components/ShoppingCart/ShoppingCartDrawer";
import { showToast } from "src/utilities/toast";
import { PurchaseItemDetails } from "src/data/PurchaseConstants";


interface ShoppingCartState {
  getItemQuantity: (id: string) => number;
  increaseCartQuantity: (id: string) => void;
  addToCart: (id: string, individualPrice: number) => void;
  decreaseCartQuantity: (id: string) => void;
  removeFromCart: (id: string) => void;
  clearShoppingCart: () => void;
  setItemPrice: (id: string, newPrice: number) => void;
  openCart: () => void;
  closeCart: () => void;
  totalItemsInCart: number;
  shoppingCart: PurchaseItemDetails[];
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
  const [shoppingCart, setShoppingCart] = useState<PurchaseItemDetails[]>([]);

  const openCart = () => setIsOpen(true);
  const closeCart = () => setIsOpen(false);
  const totalItemsInCart = shoppingCart.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const clearShoppingCart = () => setShoppingCart([]);
  const getItemQuantity = (id: string) => {
    return shoppingCart.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: string) => {
    setShoppingCart((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const eachItemPrice = item.price/item.quantity;
          return { ...item, quantity: item.quantity + 1, price: item.price+eachItemPrice};
        }
        return item;
      });
    });
  };
  const addToCart = (id: string, price: number) => {
    setShoppingCart((prevItems) => {
      if (!prevItems.find((item) => item.id === id)) {
        return [...prevItems, { id, quantity: 1, price }];
      }
      showToast(`There is already an item in cart with id=${id}`);
      return prevItems;
    });
  };
  const decreaseCartQuantity = (id: string) => {
    setShoppingCart((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          const eachItemPrice = item.price/item.quantity;
          return {
            ...item,
            quantity: item.quantity - 1,
            price: item.price - eachItemPrice
          };
        }
        return item;
      });
    });
  };
  const removeFromCart = (id: string) => {
    setShoppingCart((prevItems) => {
      return prevItems.filter((item) => item.id !== id);
    });
  };
  const setItemPrice = (id: string, newPrice: number) => {
      setShoppingCart((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, price: newPrice };
          }
          return item;
        })
      );
  };

  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        totalItemsInCart,
        setItemPrice,
        addToCart,
        clearShoppingCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        shoppingCart
      }}
    >
      {children}
      <ShoppingCartDrawer isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
