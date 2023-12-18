import { Stack, Typography } from "@mui/material";
import { PaginationControls } from "src/data/PaginationConstants";
import { CreateCustomPaginationActions } from "../CreateCustomPaginationActions";

type PurchaseHistoryPaginationControlsProps = PaginationControls & {
    setPage: React.Dispatch<React.SetStateAction<number>>
};
function PurchaseHistoryPaginationControls({ 
    page,
    limit, 
    totalItems, 
    nextPage, 
    maxPage, 
    previousPage, 
    setPage 
}: PurchaseHistoryPaginationControlsProps) {
    const CustomPaginationActions = CreateCustomPaginationActions({
        previousPage,
        nextPage,
        maxPage,
        setPage,
    })({ page });
    const startIndex = page * limit + 1;
    const endIndex = Math.min((page + 1) * limit, totalItems);

    return (
        <Stack direction="column" alignItems="center" >
            <Typography>{startIndex}-{endIndex} of {totalItems}</Typography>
            {CustomPaginationActions}
        </Stack>
    );
}
export default PurchaseHistoryPaginationControls;