import { Box, MenuItem, Stack, TextField, Typography } from "@mui/material";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { useNavigate, useParams } from "react-router-dom";
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
import LoadingComponent from "src/components/LoadingComponent";
import ErrorComponent from "src/components/ErrorComponent";

type EditInventoryItemPageProps = {
};
function EditInventoryItemPage({ }: EditInventoryItemPageProps) {
    const params = useParams();
    const navigate = useNavigate();
    const [inventoryItemState, setInventoryItemState] = useState<InventoryItemDetails>();
    const [isDirty, setIsDirty] = useState(false);
    const itemId = params.id;
    
    if (itemId == null) return <NotFound />;
    const { isLoading,
        isError,
        error,
        data } = useGetInventoryItem(itemId, { staleTime: Infinity, retry: 0, enabled: itemId != null });

    useEffect(() => {
        setInventoryItemState(data);
    }, [data]);
    if (isLoading) return <LoadingComponent />;
    if (isError) return <ErrorComponent error={error} />;
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

    const { tag, name, stock, cost, type, owner, reference } = inventoryItemState;
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
                    <Box display="flex" alignItems="center">
                        <TextField
                            label="Tag"
                            name="tag"
                            value={tag}
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        />
                    </Box>
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
                            select
                            required
                            label="Product Type"
                            value={type}
                            name="type"
                            onChange={handleChange}
                            sx={{ width: "24ch" }}
                        >
                            <MenuItem value="Poster">Poster</MenuItem>
                            <MenuItem value="Keychain">Keychain</MenuItem>
                            <MenuItem value="Other">Other</MenuItem>
                        </TextField>
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