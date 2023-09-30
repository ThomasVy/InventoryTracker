import { Link as RouterLink } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import {
  FocusEventHandler,
  FunctionComponent,
  RefObject,
  useEffect,
  useRef,
  useState,
} from "react";
import InputField from "../react_helpers/InputField";
import axios from "../api/axios";
import { AxiosError } from "axios";
import {
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  IconButton,
  InputAdornment,
  InputLabel,
  Link,
  OutlinedInput,
  TextField,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import HiddenInput from "src/components/Password";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
const PASSWORD_ERROR =
  "Password must be 8 to 24 characters.<br />\
Must include uppercase and lowercase letters, a number and a special character.";
const USERNAME_ERROR =
  "Username must be 4 to 24 characters.<br />\
Must begin with a letter.<br />\
Letters, numbers, underscores, hyphens allowed.";
const CONFIRM_PASSWORD_ERROR = "Passwords do not match";

interface RegisterProps {}
const Register: FunctionComponent<RegisterProps> = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const usernameErrorRef = useRef<HTMLParagraphElement>(null);

  const passwordRef = useRef<HTMLInputElement>(null);
  const passwordErrorRef = useRef<HTMLParagraphElement>(null);

  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordErrorRef = useRef<HTMLParagraphElement>(null);

  const msgRef = useRef<HTMLParagraphElement>(null);

  const isUsernameValid = (username: string) => {
    const usernameValid = USER_REGEX.test(username);
    if (!usernameValid) {
      if (usernameErrorRef.current) {
        usernameErrorRef.current.innerHTML = USERNAME_ERROR;
      }
      return false;
    }
    return true;
  };
  const isPasswordValid = (password: string) => {
    const passwordValid = PWD_REGEX.test(password);
    if (!passwordValid) {
      if (passwordErrorRef.current)
        passwordErrorRef.current.innerHTML = PASSWORD_ERROR;
      return false;
    }
    return true;
  };
  const doPasswordsMatch = (password: string, confirmPassword: string) => {
    const passwordMatches = password === confirmPassword;
    if (!passwordMatches) {
      if (confirmPasswordErrorRef.current)
        confirmPasswordErrorRef.current.innerHTML = CONFIRM_PASSWORD_ERROR;
      return false;
    }
    return true;
  };
  const isFormValid = (
    username: string,
    password: string,
    confirmPassword: string
  ) => {
    const usernameValid = isUsernameValid(username);
    const passwordValid = isPasswordValid(password);
    const passwordsMatch = doPasswordsMatch(password, confirmPassword);
    return usernameValid && passwordValid && passwordsMatch;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (msgRef.current) msgRef.current.innerText = "";
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;
    if (!username || !password || !confirmPassword) {
      if (msgRef.current)
        msgRef.current.innerText =
          "Username, Password, or Confirm Password missing";
      return;
    }

    if (!isFormValid(username, password, confirmPassword)) {
      if (msgRef.current)
        msgRef.current.innerText =
          "Invalid Entry - One of the entries below do not meet the requirements";
      return;
    }

    try {
      const response = await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password })
      );
      if (msgRef.current)
        msgRef.current.innerText = "Successfully created user";
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } catch (error) {
      const err = error as AxiosError;
      if (msgRef.current) {
        if (!err?.response) {
          msgRef.current.innerText = "No Server Response";
        } else if (err.response?.status === 409) {
        } else if (err.response?.status === 409) {
          msgRef.current.innerText = "Username Taken";
        } else {
          msgRef.current.innerText = `Registration Failed - ${err.response?.data.message}`;
        }
      }
      msgRef.current?.focus();
    }
  };

  const clearError = (errorRef: RefObject<HTMLParagraphElement>) => {
    return (e: any) => {
      if (errorRef.current) errorRef.current.innerHTML = "";
    };
  };

  return (
    <Container component="main" maxWidth="xs">
      <p ref={msgRef} aria-live="assertive" />
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <h1>Register for an Account</h1>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            required
            id="username"
            label="Username"
            inputRef={usernameRef}
            fullWidth
            autoComplete="username"
            autoFocus
          />

          <HiddenInput
            ref={passwordRef}
            label="Password"
            id="password"
            autocomplete="new-password"
          />
          <HiddenInput
            ref={confirmPasswordRef}
            label="Confirm Password"
            id="confirm-password"
            autocomplete="new-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
};

export default Register;
