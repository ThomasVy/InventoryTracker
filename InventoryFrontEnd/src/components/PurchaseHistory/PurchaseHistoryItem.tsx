import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { format } from "date-fns";
import { useGetInventoryItem } from "src/hooks/useInventoryRequests";
import DisplayItem from "./DisplayItem";
import { formatCurrency } from "src/utilities/formatCurrency";

interface Item {
  itemId: number;
  quantity: number;
  individualPrice: number;
}

interface PurchaseHistoryItemProps {
  id: number;
  date: string;
  items: Item[];
}

const PurchaseHistoryItem: FunctionComponent<PurchaseHistoryItemProps> = ({
  id,
  date,
  items,
}) => {
  const displayFirstItem = () => {
    const firstItemInOrder = items.at(0);
    if (!firstItemInOrder) return <b> Error: No Items in Order </b>;

    return (
      <>
        <DisplayItem
          id={firstItemInOrder.itemId}
          individualPrice={firstItemInOrder.individualPrice}
          quantity={firstItemInOrder.quantity}
        />
      </>
    );
  };
  const displayTextForMoreItems = () => {
    const numberOfOtherItems = items.length - 1;
    if (numberOfOtherItems <= 0) return null;

    return (
      <>
        <Typography marginBottom={1} variant="body2">
          +<b style={{ fontSize: 16 }}>{numberOfOtherItems}</b> other item(s)...
        </Typography>
      </>
    );
  };

  const dateObj = new Date(date);
  return (
    <>
      <Card
        variant="outlined"
        sx={{
          width: 3 / 4,
          maxWidth: "md",
        }}
      >
        <CardActionArea onClick={() => alert(id)}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Order ID: <b>{id}</b>
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Purchased On: <b>{format(dateObj, "PP")}</b>
            </Typography>
            {displayFirstItem()}
            {displayTextForMoreItems()}
            <Divider />
            <Stack
              direction="row-reverse"
              marginTop={1}
              justifyContent="space-between"
              alignItems="center"
            >
              <Typography variant="h6">
                {formatCurrency(
                  items.reduce(
                    (total, item) =>
                      (total += item.quantity * item.individualPrice),
                    0
                  )
                )}
              </Typography>
            </Stack>
          </CardContent>
        </CardActionArea>
      </Card>
    </>
  );
};

export default PurchaseHistoryItem;
