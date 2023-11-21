import { Box, Stack } from "@mui/material";
import { FunctionComponent } from "react";

interface Item {
    itemId :number;
    quantity: number;
    individualPrice :number;
}

interface PurchaseHistoryItemProps {
    id: number,
    date: string,
    items: Item[]
}
 
const PurchaseHistoryItem: FunctionComponent<PurchaseHistoryItemProps> = ({id, date, items}) => {
    return (
        <>
            <Stack direction="row" gap={5} alignItems="space-around">
                <Box>
                    {id}
                </Box>
                <Box>
                    {date}
                </Box>
                <Box>
                    {items.map(item => item.itemId)}
                </Box>
            </Stack>
        </>
      );
}
 
export default PurchaseHistoryItem;