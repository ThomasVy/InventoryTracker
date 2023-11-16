import { FunctionComponent, useEffect, useRef, useState } from "react";
import EditShoppingCartItemPrice from "./EditShoppingCartItemPrice";
import NormalShoppingCartItemPrice from "./NormalShoppingCartItemPrice";

interface ShoppingCartItemPriceProps {
  price: number;
  quantity: number;
  setPrice: (newPrice: number) => void;
}

export type Mode = "Edit" | "Normal";
const ShoppingCartItemPrice: FunctionComponent<ShoppingCartItemPriceProps> = ({
  price,
  quantity,
  setPrice,
}) => {
  const [mode, setMode] = useState<Mode>("Normal");
  const totalPrice = quantity * price;

  const normalModePriceTextRef = useRef(null);
  const [width, setWidth] = useState(0);

  const setTotalPrice = (newTotalPrice : number) => {
    const newIndividualPrice = newTotalPrice / quantity;
    setPrice(newIndividualPrice);
  }

  useEffect(() => {
    if (mode == "Normal")
    {
      setWidth(normalModePriceTextRef.current?.offsetWidth);
    }
  }, [mode]);

  if (mode === "Normal") {
    return <NormalShoppingCartItemPrice ref={normalModePriceTextRef} totalPrice={totalPrice} setMode={setMode} />;
  } else {
    return <EditShoppingCartItemPrice totalPrice={totalPrice} setTotalPrice={setTotalPrice} setMode={setMode} editBoxWidth={width}/>
  }
};

export default ShoppingCartItemPrice;
