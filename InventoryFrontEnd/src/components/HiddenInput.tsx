import { Visibility, VisibilityOff } from "@mui/icons-material";
import {
  FormControl,
  FormHelperText,
  IconButton,
  InputAdornment,
  InputLabel,
  OutlinedInput,
} from "@mui/material";
import { forwardRef, useState } from "react";

interface HiddenInputProps {
    label : string;
    id: string;
    autocomplete: string;
    error? : boolean;
    helperText? : string;
}

export type Ref = HTMLInputElement;

const HiddenInput = forwardRef<Ref, HiddenInputProps>((props, ref) => {
  const [showInput, setShowInput] = useState<boolean>(false);
  const handleClickShowHiddenInput = () => setShowInput((show) => !show);
  const handleMouseDownHiddenInput = (
    event: React.MouseEvent<HTMLButtonElement>
  ) => {
    event.preventDefault();
  };
  return (
    <FormControl error={props.error} fullWidth sx={{ mt: 1 }} required variant="standard">
      <InputLabel sx={{ ml: 2, mt: -0.5 }} htmlFor={props.id}>
        {props.label}
      </InputLabel>
      <OutlinedInput
        autoComplete={props.autocomplete}
        id={props.id}
        type={showInput ? "text" : "password"}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle visibility"
              onClick={handleClickShowHiddenInput}
              onMouseDown={handleMouseDownHiddenInput}
              edge="end"
            >
              {showInput ? <VisibilityOff /> : <Visibility />}
            </IconButton>
          </InputAdornment>
        }
        label={props.label}
        inputRef={ref}
      />
      <FormHelperText>{props.helperText}</FormHelperText>
    </FormControl>
  );
});

export default HiddenInput;
