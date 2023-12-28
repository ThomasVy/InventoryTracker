import {
  Card,
  CardActionArea,
  CardContent,
  CircularProgress,
  Divider,
  Stack,
  Typography,
} from "@mui/material";
import { FunctionComponent } from "react";
import { format } from "date-fns";
import DisplayConstItem from "../Purchase/DisplayConstItem";
import { formatCurrency } from "src/utilities/formatCurrency";
import { Link as RouterLink } from 'react-router-dom';
import { GetPurchaseEditLink } from "src/data/LinkConstants";
import { useGetIndividualPurchaseOrder } from "src/hooks/usePurchaseRequests";

interface PurchaseHistoryItemProps {
  id: string;
}

const PurchaseHistoryItem: FunctionComponent<PurchaseHistoryItemProps> = ({
  id }) => {
  const {
    data,
    error,
    isError,
    isLoading,
    statusCode
  } = useGetIndividualPurchaseOrder(id);
  
  if (isLoading) return <CircularProgress />;
  if (isError) return <pre>{error}</pre>;
  if (statusCode == 403 || !data) return <h3>Item does not exist</h3>;
  const date = new Date(data.date);
  const items = data.items;
  const displayFirstItem = () => {
    const firstItemInOrder = items.at(0);
    if (!firstItemInOrder) return <b> Error: No Items in Order </b>;
    return (
      <>
        <DisplayConstItem
          id={firstItemInOrder.id}
          quantity={firstItemInOrder.quantity}
          price={firstItemInOrder.price}
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
  return (
    <>
      <Card
        variant="outlined"
      >
        <CardActionArea component={RouterLink} to={GetPurchaseEditLink(id)}>
          <CardContent>
            <Typography sx={{ fontSize: 16 }} gutterBottom>
              Purchase ID: <b>{id}</b>
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Purchase Date: <b>{date ? format(date, "PP") : "No date"}</b>
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
                      (total += item.price),
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
