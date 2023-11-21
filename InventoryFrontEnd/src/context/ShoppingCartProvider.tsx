import { createContext, useState, ReactNode } from "react";
import ShoppingCartDrawer from "src/components/ShoppingCart/ShoppingCartDrawer";
import { showToast } from "src/utilities/toast";
import { PurchaseItemDetails, PurchaseOrder } from "src/data/PurchaseConstants";

export interface ShoppingCartItem {
  id: number;
  quantity: number;
  individualPrice: number;
}

interface ShoppingCartState {
  getItemQuantity: (id: number) => number;
  increaseCartQuantity: (id: number) => void;
  addToCart: (id: number, individualPrice: number) => void;
  decreaseCartQuantity: (id: number) => void;
  removeFromCart: (id: number) => void;
  clearShoppingCart: () => void;
  setItemPrice: (id: number) => (newPrice : number) => void;
  openCart: () => void;
  closeCart: () => void;
  getTotal: () => number;
  collectPurchaseOrder: () => PurchaseOrder; 
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
  const totalItemsInCart = shoppingCart.reduce(
    (quantity, item) => quantity + item.quantity,
    0
  );

  const clearShoppingCart = () => setShoppingCart([]);
  const getItemQuantity = (id: number) => {
    return shoppingCart.find((item) => item.id === id)?.quantity || 0;
  };
  const increaseCartQuantity = (id: number) => {
    setShoppingCart((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    });
  };
  const addToCart = (id: number, price: number) => {
    setShoppingCart((prevItems) => {
      if (!prevItems.find((item) => item.id === id)) {
        return [...prevItems, { id, quantity: 1, individualPrice: price }];
      }
      showToast(`There is already an item in cart with id=${id}`);
      return prevItems;
    });
  };
  const decreaseCartQuantity = (id: number) => {
    setShoppingCart((prevItems) => {
      return prevItems.map((item) => {
        if (item.id === id) {
          return {
            ...item,
            quantity: item.quantity - 1,
          };
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
  const getTotal = () => {
    return shoppingCart.reduce((total, item) => {
      return total + item.individualPrice * item.quantity;
    }, 0);
  };
  const setItemPrice = (id: number) => {
    return (newPrice: number) =>
      setShoppingCart((prevItems) =>
        prevItems.map((item) => {
          if (item.id === id) {
            return { ...item, individualPrice: newPrice };
          }
          return item;
        })
      );
  };
  const collectPurchaseOrder: () => PurchaseOrder = ()  =>  {
    const purchaseList : PurchaseItemDetails[] = shoppingCart.map((cartItem) => {
      return { itemId: cartItem.id, quantity: cartItem.quantity, individualCost: cartItem.individualPrice};
    });
    return {
      purchaseList
    };
  }
  return (
    <ShoppingCartContext.Provider
      value={{
        openCart,
        closeCart,
        totalItemsInCart,
        setItemPrice,
        addToCart,
        getTotal,
        clearShoppingCart,
        getItemQuantity,
        increaseCartQuantity,
        decreaseCartQuantity,
        removeFromCart,
        shoppingCart,
        collectPurchaseOrder
      }}
    >
      {children}
      <ShoppingCartDrawer isOpen={isOpen} />
    </ShoppingCartContext.Provider>
  );
};

export default ShoppingCartContext;
