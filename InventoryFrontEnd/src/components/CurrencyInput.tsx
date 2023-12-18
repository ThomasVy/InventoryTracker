import { FormControl, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps, SxProps, Theme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import {z} from "zod";

type CurrencyInputProps = Omit<OutlinedInputProps, "onChange" | "value" | "onBlur"> & {
  updateValue: (input: number) => void,
  initValue: number,
  sx?: SxProps<Theme>
};
const PostiveNumberSchema = z.coerce.number().nonnegative();

const CurrencyInput: FunctionComponent<CurrencyInputProps> = ({
  updateValue,
  sx,
  initValue,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState<string>(initValue.toString());
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const result = PostiveNumberSchema.safeParse(event.target.value);
      if (result.success || event.target.value == "") {
        setDisplayValue(event.target.value);
      }
  };
  const handleBlur = (event :React.FocusEvent<HTMLInputElement>) => {
    if (event.target.value == "") {
      setDisplayValue("0");
      updateValue(0);
      return;
    }
    const currencyValue = parseFloat(event.target.value).toFixed(2);
    const value = PostiveNumberSchema.parse(currencyValue)
    setDisplayValue(value.toString());
    updateValue(value);
  } 

  return (
    <>
      <FormControl sx={sx}>
        <InputLabel htmlFor="outlined-adornment-amount">{props.label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          label={props.label}
          onChange={handleOnChange}
          onBlur={handleBlur}
          value={displayValue}
          {...props}
        />
      </FormControl>
    </>
  );
};

export default CurrencyInput;
