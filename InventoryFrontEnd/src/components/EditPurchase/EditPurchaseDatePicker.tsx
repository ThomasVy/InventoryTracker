import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { PurchaseOrder } from 'src/data/PurchaseConstants';

type EditPurchaseDatePickerProps = {
    purchaseState: PurchaseOrder,
    setPurchaseState: (modifyFunc: (prevState: PurchaseOrder | undefined) => PurchaseOrder | undefined) => void
};

function EditPurchaseDatePicker({ purchaseState, setPurchaseState }: EditPurchaseDatePickerProps) {
    const handleDateChange = (value: dayjs.Dayjs | null) => {
        if (value === null) return;

        setPurchaseState(
            (prevState) => {
                if (!prevState) return prevState;
                return { ...prevState, date: value.toDate() };
            }
        );
    }
    const date = dayjs(purchaseState.date);
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker label="Purchased Date"
                value={date}
                format="MMM DD, YYYY"
                onChange={handleDateChange}
            />
        </LocalizationProvider>
    );
}
export default EditPurchaseDatePicker;