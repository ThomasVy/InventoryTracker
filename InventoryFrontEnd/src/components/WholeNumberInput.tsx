import { TextField, TextFieldProps } from "@mui/material";
import { FunctionComponent } from "react";

interface WholeNumberInputProps {
  textFieldProps: TextFieldProps;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  input: string
}

const WholeNumberInput: FunctionComponent<WholeNumberInputProps> = ({
  textFieldProps,
  setInput,
  input
}) => {
  const handleOnChange = (event) => {
    const input = event.target.value.replace(/[^0-9]/g, "");
    setInput(input);
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

export default WholeNumberInput;
