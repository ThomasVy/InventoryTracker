import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import RenderListOfItems from "src/components/Purchase/RenderListOfItems";
import { useGetIndividualPurchaseOrder } from "src/hooks/usePurchaseRequests";
import NotFound from "./NotFound";
import { format } from "date-fns";
import { useEffect, useState } from "react";
import { PurchaseOrder } from "src/data/PurchaseConstants";
import { showToast } from "src/utilities/toast";
import CancelIcon from '@mui/icons-material/Cancel';
import ConfirmationDialog from "src/components/ConfirmationDialog";

function EditPurchaseHistoryPage() {
    const params = useParams();
    const [purchaseHistoryState, setPurchaseHistoryState] = useState<PurchaseOrder>();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    if (!params.purchaseId) return <NotFound />;
    const purchaseId = parseInt(params.purchaseId);
    if (isNaN(purchaseId)) return <NotFound />;

    const { data, error, isError, isLoading,
        statusCode
    } = useGetIndividualPurchaseOrder(purchaseId, { staleTime: Infinity });

    useEffect(() => {
        setPurchaseHistoryState(data);
    }, [data]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <pre>{error}</pre>;
    if (statusCode == 403 || !purchaseHistoryState) return <h3>Item does not exist</h3>;

    const date = new Date(data.date)
    const items = purchaseHistoryState.items;
    const modifyItemFunctions = (id: number) => {
        return {
            decreaseQuantity: () => {
                setPurchaseHistoryState(
                    (prevState) => {
                        if (!prevState) {
                            return prevState;
                        }
                        if (prevState.items.find(item => item.id === id)?.quantity === 1) {
                            return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
                        } else {
                            return {
                                ...prevState,
                                items: prevState.items.map(
                                    (item) => {
                                        if (item.id === id) {
                                            const eachItemPrice = item.price / item.quantity;
                                            return { ...item, quantity: item.quantity - 1, price: item.price - eachItemPrice }
                                        }
                                        return item;
                                    })
                            }
                        }
                    });
            },
            increaseQuantity: () => {
                setPurchaseHistoryState((prevState) => {
                    if (!prevState) return prevState;
                    return {
                        ...prevState,
                        items: prevState.items.map(
                            (item) => {
                                if (item.id === id) {
                                    const eachItemPrice = item.price / item.quantity;
                                    return { ...item, quantity: item.quantity + 1, price: item.price + eachItemPrice };
                                }
                                else {
                                    return item;
                                }
                            }
                        )
                    }
                });
            },
            removeAllQuantity: () => {
                setPurchaseHistoryState((prevState) => {
                    if (!prevState) return prevState;
                    return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
                })
            },
            setPrice: (newPrice: number) => {
                setPurchaseHistoryState((prevState) => {
                    if (!prevState) return prevState;
                    console.log(newPrice);
                    return {
                        ...prevState,
                        items: prevState.items.map(
                            item => {
                                if (item.id === id) {
                                    return { ...item, price: newPrice };
                                }
                                return item;
                            }
                        )
                    };
                })
            }
        }
    }
    const addFunc = (id: number, price: number) => {
        setPurchaseHistoryState((prevState) => {
            if (!prevState) return prevState;
            if (prevState.items.find((item) => item.id === id)) {
                showToast(`Item already exists in purchase order id=${id}`);
            }
            return {
                ...prevState,
                items: [...prevState.items, { id: id, quantity: 1, price: price }]
            }
        });
    }
    return (
        <>
            <Typography variant="h4"> Purchase #{purchaseId} </Typography>
            <Typography variant="body2" color="text.secondary">{date ? format(date, "PP") : "No date"}</Typography>
            <Stack gap={2}>
                <RenderListOfItems
                    items={items}
                    modifyItemFuncs={modifyItemFunctions}
                    addFunc={addFunc}
                />
                <Stack direction="row" justifyContent="space-between">
                    <Button
                        color="error"
                        component="label"
                        variant="contained"
                        endIcon={<CancelIcon />}
                        onClick={() => setOpenCancelModal(true)}
                    >
                        Cancel
                    </Button>
                    <ConfirmationDialog
                        title="Cancel your changes?"
                        open={openCancelModal}
                        setOpen={setOpenCancelModal}
                        onConfirm={() => {}}
                    >
                        Are you sure you want to cancel your changes?
                    </ConfirmationDialog>
                    {/* <SubmitPurchaseOrderButton clearShoppingCart={clearShoppingCart} shoppingCart={shoppingCart} /> */}
                    <Button variant="contained">Save</Button>
                </Stack>
            </Stack>
        </>
    )
}

export default EditPurchaseHistoryPage