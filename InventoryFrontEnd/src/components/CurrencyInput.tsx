import { FormControl, InputAdornment, InputLabel, OutlinedInput, OutlinedInputProps, SxProps, Theme } from "@mui/material";
import { FunctionComponent} from "react";

type CurrencyInputProps = Omit<OutlinedInputProps, "value" | "onChange" | "type" | "onKeyDown" | "onBlur"> & {
  value: number,
  onChange: (newValue: number) => void,
  sx?: SxProps<Theme>
};

const CurrencyInput: FunctionComponent<CurrencyInputProps> = ({
  value, 
  onChange,
  sx,
  ...props
}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.valueAsNumber);
  }
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNaN(value)) {
      onChange(0);
      return;
    }
    const newValue = parseFloat(e.target.valueAsNumber.toFixed(2));
    onChange(newValue);
  }
  return (
    <>
      <FormControl sx={sx}>
        <InputLabel htmlFor="outlined-adornment-amount">{props.label}</InputLabel>
        <OutlinedInput
          id="outlined-adornment-amount"
          startAdornment={<InputAdornment position="start">$</InputAdornment>}
          type="number"
          onKeyDown={(evt) => ["e", "E", "+", "-"].includes(evt.key) && evt.preventDefault()}
          label={props.label}
          onChange={handleOnChange}
          onBlur={handleOnBlur}
          value={isNaN(value) ? '': value.toString()}
          {...props}
        />
      </FormControl>
    </>
  );
};

export default CurrencyInput;
