import { Box, Button, CircularProgress, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
import { z } from "zod";
import NotFound from "./NotFound";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import CurrencyInput from "src/components/CurrencyInput";
import { useEffect, useState } from "react";
import { InventoryItemDetails } from "src/data/InventoryConstants";
import SaveEditInventoryItemButton from '../components/EditInventoryItem/SaveEditInventoryItemButton';
import ConfirmationButton from "src/components/ConfirmationButton";
import { INVENTORY_LINK } from "src/data/LinkConstants";
import DeleteInventoryItemButton from "src/components/EditInventoryItem/DeleteInventoryItemButton";
import WholeNumberInput from "src/components/WholeNumberInput";

type EditInventoryItemPageProps = {
};
function EditInventoryItemPage({ }: EditInventoryItemPageProps) {
    const params = useParams();
    const navigate = useNavigate();
    const [inventoryItemState, setInventoryItemState] = useState<InventoryItemDetails>();
    const [isDirty, setIsDirty] = useState(false);
    const itemIdZodResult = z.coerce.number().positive().safeParse(params.id);
    if (!itemIdZodResult.success) return <NotFound />;
    const itemId = itemIdZodResult.data;
    const { isLoading,
        refetch,
        isError,
        error,
        data } = useGetInventoryItem(itemId, { staleTime: Infinity, retry: 0, enabled: itemIdZodResult.success });

    useEffect(() => {
        setInventoryItemState(data);
    }, [data]);

    if (isLoading) return <CircularProgress />;
    if (isError) return <pre>{error}</pre>;
    if (!inventoryItemState) return <NotFound />;

    const updateState = (name: string) => {
        return (value: unknown) => {
            setInventoryItemState((prevState) => {
                if (prevState == null) return prevState;
                setIsDirty(true);
                return { ...prevState, [name]: value };
            }
            );
        }
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        updateState(name)(value);
    }

    const { name, stock, cost, type, owner, reference } = inventoryItemState;
    return (
        <>
            <Stack justifyContent="flex-end" gap={3}>
                <Stack direction="row" >
                    <ConfirmationButton
                        buttonInfo={
                            {
                                type: "Normal",
                                props: {
                                    color: "warning",
                                    variant: "contained",
                                    endIcon: < ArrowBackIcon />
                                }
                            }
                        }
                        dialogTitle="Cancel your changes?"
                        dialogContent="Are you sure you want to cancel your changes?"
                        onConfirm={() => navigate(INVENTORY_LINK.link)}
                        shouldConfirmationDialogOpen={() => isDirty}
                    >
                        Inventory
                    </ConfirmationButton>
                </Stack>
                <Typography variant="h3">Edit Inventory Item {itemId}</Typography>
                <Stack gap={2} >
                    <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                            label="Product Name"
                            name="name"
                            value={name}
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        />
                        <CurrencyInput
                            label="Cost"
                            value={cost}
                            onChange={updateState("cost")}
                            sx={{ width: "24ch" }}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                            label="Type"
                            name="type"
                            value={type}
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        />
                        <WholeNumberInput
                            label="Stock"
                            sx={{ width: "24ch" }}
                            value={stock}
                            onChange={updateState("stock")}
                        />
                    </Box>
                    <Box display="flex" alignItems="center" gap={2}>
                        <TextField
                            label="Reference"
                            name="reference"
                            value={reference}
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        />
                        <TextField
                            label="Owner"
                            name="owner"
                            value={owner}
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        />
                    </Box>
                </Stack>
                <Box display="flex" justifyContent="space-between">
                    <DeleteInventoryItemButton id={itemId}/>
                    <SaveEditInventoryItemButton id={itemId} isDirty={isDirty} inventoryState={inventoryItemState} />
                </Box>
            </Stack>
        </>
    );
}
export default EditInventoryItemPage;