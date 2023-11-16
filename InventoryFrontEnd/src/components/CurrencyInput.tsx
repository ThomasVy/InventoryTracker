import { TextField, TextFieldProps } from "@mui/material";
import { FunctionComponent } from "react";

interface CurrencyInputProps {
  textFieldProps: TextFieldProps;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string
}

const CurrencyInput: FunctionComponent<CurrencyInputProps> = ({
  textFieldProps,
  setInput,
  input
}) => {
  const handleOnChange = (event) => {
    const input = event.target.value.replace(/[^0-9.]/g, "");
    const filter = input.replace(/(?<=\.\d{2})(.*)/g, "");
    setInput(filter);
  };

  return (
    <>
      <TextField
        {...textFieldProps}
        value={input}
        onChange={handleOnChange}
      />
    </>
  );
};

export default CurrencyInput;
