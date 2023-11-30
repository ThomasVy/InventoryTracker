import { Stack, Collapse, Typography } from '@mui/material'
import { formatCurrency } from 'src/utilities/formatCurrency'
import AddByIdInput from './AddByIdInput'
import RenderItem from './RenderItem'
import { TransitionGroup } from "react-transition-group";
import { ModifyingItemFuncs } from 'src/data/ItemConstants';
import { PurchaseItemDetails } from 'src/data/PurchaseConstants';

type Props = {
  items: PurchaseItemDetails[],
  modifyItemFuncs : (id: number) => ModifyingItemFuncs;
  addFunc: (id: number, price: number) => void;
} 

function RenderListOfItems({ items, modifyItemFuncs, addFunc }: Props) {
  const totalPrice = items.reduce((total, item) => total+= item.price, 0);
  return (
    <>
      <Stack direction="row" justifyContent="center">
        <AddByIdInput addFunc={addFunc} />
      </Stack>
      <Stack flexDirection="column">
        <TransitionGroup>
          {items.map((item) =>
            <Collapse key={item.id}><RenderItem {...item} modifyItemFuncs={modifyItemFuncs} /></Collapse>)
          }
        </TransitionGroup>
      </Stack>
      <Stack direction="row" justifyContent="flex-end" flexGrow={1}>
        <Typography fontWeight="bold" variant="h4">
          {formatCurrency(totalPrice)}
        </Typography>
      </Stack>
    </>
  )
}

export default RenderListOfItems;