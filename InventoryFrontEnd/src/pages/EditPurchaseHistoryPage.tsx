import { Button, CircularProgress, Stack, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import RenderListOfItems from "src/components/Purchase/RenderListOfItems";
import { useGetIndividualPurchaseOrder } from "src/hooks/usePurchaseRequests";
import NotFound from "./NotFound";
import { useEffect, useState } from "react";
import { PurchaseOrder } from "src/data/PurchaseConstants";
import { showToast } from "src/utilities/toast";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ConfirmationDialog from "src/components/ConfirmationDialog";
import { PURCHASE_HISTORY_LINK } from "src/data/LinkConstants";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from "dayjs";

function EditPurchaseHistoryPage() {
    const params = useParams();
    const [isDirty, setIsDirty] = useState(false);
    const [purchaseHistoryState, setPurchaseHistoryState] = useState<PurchaseOrder>();
    const [openCancelModal, setOpenCancelModal] = useState(false);
    const navigate = useNavigate();
    if (!params.purchaseId) return <NotFound />;
    const purchaseId = parseInt(params.purchaseId);
    if (isNaN(purchaseId)) return <NotFound />;

    const { data, error, isError, isLoading,
        statusCode
    } = useGetIndividualPurchaseOrder(purchaseId, { staleTime: Infinity, retry: 0 });

    useEffect(() => {
        if (!data) return;
        setPurchaseHistoryState({ ...data, date: dayjs(data.date) });
    }, [data]);

    if (isLoading) return <CircularProgress />;
    if (statusCode == 404) return <NotFound />;
    if (isError) return <pre>{error}</pre>;
    if (!purchaseHistoryState) return <NotFound />;

    const items = purchaseHistoryState.items;
    const modifyPurchaseState = (modifyFunc: (prevState: PurchaseOrder | undefined) => PurchaseOrder | undefined) => {
        setIsDirty(true);
        setPurchaseHistoryState(modifyFunc);
    };
    const modifyItemFunctions = (id: number) => {
        return {
            decreaseQuantity: () => {
                modifyPurchaseState(
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
                modifyPurchaseState((prevState) => {
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
                modifyPurchaseState((prevState) => {
                    if (!prevState) return prevState;
                    return { ...prevState, items: prevState.items.filter(item => item.id !== id) };
                })
            },
            setPrice: (newPrice: number) => {
                modifyPurchaseState((prevState) => {
                    if (!prevState) return prevState;
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
        modifyPurchaseState((prevState) => {
            if (!prevState) return prevState;
            if (prevState.items.find((item) => item.id === id)) {
                showToast(`Item already exists in purchase order id=${id}`);
                return prevState;
            }
            return {
                ...prevState,
                items: [...prevState.items, { id: id, quantity: 1, price: price }]
            }
        });
    }
    const handleBack = () => {
        if (isDirty) {
            setOpenCancelModal(true)
        }
        else {
            navigate(PURCHASE_HISTORY_LINK.link);
        }
    }
    const handleDateChange = (value: dayjs.Dayjs | null) => {
        if (value === null) return;

        modifyPurchaseState(
            (prevState) => {
                return { ...prevState, date: value };
            }
        );
    }
    return (
        <>
            <Stack gap={2} >
                <Typography variant="h4"> Purchase #{purchaseId} </Typography>
                {/* <Typography variant="h6" color="text.secondary">{format(date, "PP") : "No date"}</Typography> */}
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DatePicker label="Basic date picker"
                        value={purchaseHistoryState.date}
                        format="MMM DD, YYYY"
                        onChange={handleDateChange}
                    />
                </LocalizationProvider>
                <RenderListOfItems
                    items={items}
                    modifyItemFuncs={modifyItemFunctions}
                    addFunc={addFunc}
                />
                <Stack direction="row" gap={4} justifyContent="space-between">
                    <Button
                        color="error"
                        component="label"
                        variant="contained"
                        endIcon={<ArrowBackIcon />}
                        onClick={handleBack}
                    >
                        Back
                    </Button>
                    <ConfirmationDialog
                        title="Cancel your changes?"
                        open={openCancelModal}
                        setOpen={setOpenCancelModal}
                        onConfirm={() => navigate(PURCHASE_HISTORY_LINK.link)}
                    >
                        Are you sure you want to cancel your changes?
                    </ConfirmationDialog>
                    <Button variant="contained">Save</Button>
                </Stack>
            </Stack>
        </>
    )
}

export default EditPurchaseHistoryPage