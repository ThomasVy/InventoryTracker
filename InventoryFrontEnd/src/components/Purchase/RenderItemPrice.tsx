import { FunctionComponent, useEffect, useRef, useState } from "react";
import RenderNormalPrice from "./RenderNormalPrice";
import RenderEditPrice from "./RenderEditPrice";

interface RenderItemPriceProps {
  price: number;
  setPrice: (newPrice: number) => void;
}

export type Mode = "Edit" | "Normal";
const RenderItemPrice: FunctionComponent<RenderItemPriceProps> = ({
  price,
  setPrice,
}) => {
  const [mode, setMode] = useState<Mode>("Normal");

  const normalModePriceTextRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (mode == "Normal")
    {
      setWidth(normalModePriceTextRef.current?.offsetWidth);
    }
  }, [mode]);

  if (mode === "Normal") {
    return <RenderNormalPrice ref={normalModePriceTextRef} totalPrice={price} setMode={setMode} />;
  } else {
    return <RenderEditPrice totalPrice={price} setTotalPrice={setPrice} setMode={setMode} editBoxWidth={width}/>
  }
};

export default RenderItemPrice;
