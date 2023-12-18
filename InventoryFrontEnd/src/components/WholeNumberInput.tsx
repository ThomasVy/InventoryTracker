import { SxProps, TextField, TextFieldProps, Theme } from "@mui/material";
import { FunctionComponent, useState } from "react";
import { z } from "zod";

type WholeNumberInputProps = Omit<TextFieldProps, "onChange" | "value" | "onBlur"> & {
  updateValue: (input: number) => void,
  initValue: number,
  sx?: SxProps<Theme>
};

const WholeNumberParser = z.coerce.number().int().nonnegative();
const WholeNumberInput: FunctionComponent<WholeNumberInputProps> = ({
  updateValue,
  sx,
  initValue,
  ...props
}) => {
  const [displayValue, setDisplayValue] = useState<string>(initValue.toString());
  const handleOnChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const result = WholeNumberParser.safeParse(event.target.value);
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
    const value = WholeNumberParser.parse(event.target.value)
    setDisplayValue(value.toString());
    updateValue(value);
  } 

  return (
    <>
      <TextField
        sx={sx}
        value={displayValue}
        onBlur={handleBlur}
        onChange={handleOnChange}
        {...props}
      />
    </>
  );
};

export default WholeNumberInput;
