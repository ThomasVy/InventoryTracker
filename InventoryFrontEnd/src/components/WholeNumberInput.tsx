import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { FunctionComponent } from "react";

type WholeNumberInputProps = Omit<TextFieldProps, "value" | "onChange" | "type" | "onKeyDown" | "onBlur"> & {
  value: number,
  onChange: (newValue: number) => void,
  sx?: SxProps<Theme>
};

const WholeNumberInput: FunctionComponent<WholeNumberInputProps> = ({
  sx,
  value,
  onChange,
  ...props
}) => {

  const handleOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.valueAsNumber);
  }
  const handleOnBlur = (e: React.FocusEvent<HTMLInputElement>) => {
    if (isNaN(value)) {
      onChange(0);
    }
  }
  return (
    <>
      <TextField
        sx={sx}
        type="number"
        onKeyDown={(evt) => ["e", "E", "+", "-", "."].includes(evt.key) && evt.preventDefault()}
        value={isNaN(value) ? '' : value.toString()}
        onChange={handleOnChange}
        onBlur={handleOnBlur}
        {...props}
      />
    </>
  );
};

export default WholeNumberInput;
