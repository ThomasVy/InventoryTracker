export type ModifyingItemFuncs = {
    decreaseQuantity: () => void;
    increaseQuantity: () => void;
    removeAllQuantity: () => void;
    setPrice: (newPrice: number) => void;
}