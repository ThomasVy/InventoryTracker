import { Link as RouterLink } from "react-router-dom";
import { FunctionComponent, RefObject, useRef, useState } from "react";
import axios from "../api/axios";
import { AxiosError } from "axios";
import {
  Box,
  Button,
  Container,
  Grid,
  Link,
  TextField,
  Typography,
} from "@mui/material";
import HiddenInput from "src/components/HiddenInput";
import AlertMsg from "src/components/Alert";
import useVerification, { ServerMessageType } from "src/hooks/useVerification";
import LoadingComponent from "src/components/LoadingComponent";
const USER_REGEX = /^[A-z][A-z0-9-_]{3,23}$/;
const PWD_REGEX = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%]).{8,24}$/;
const REGISTER_URL = "/register";
const PASSWORD_REQUIREMENT =
  "Password must be 8 to 24 characters. Must include uppercase and lowercase letters, a number and a special character.";
const USERNAME_REQUIREMENT =
  "Username must be 4 to 24 characters. Must begin with a letter. May only contain letters, numbers, underscores, or hyphens.";
const CONFIRM_PASSWORD_REQUIREMENT = "Must match Password.";

interface Error {
  password : boolean;
  confirmPassword: boolean;
  username : boolean;
};

interface RegisterProps {}
const Register: FunctionComponent<RegisterProps> = () => {
  const usernameRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const {setMessage, successMsg, failedMsg} = useVerification();
  const [inputError, setInputError] = useState<Error>({
    password : false,
    confirmPassword: false,
    username : false
  });
  const [isLoading, setLoading] = useState<boolean>(false);

  const isUsernameValid = (username: string) => {
    const usernameValid = USER_REGEX.test(username);
    if (!usernameValid) {
      return false;
    }
    return true;
  };
  const isPasswordValid = (password: string) => {
    const passwordValid = PWD_REGEX.test(password);
    if (!passwordValid) {
      return false;
    }
    return true;
  };
  const doPasswordsMatch = (password: string, confirmPassword: string) => {
    const passwordMatches = password === confirmPassword;
    if (!passwordMatches) {
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
    setInputError({
      password : !passwordValid,
      confirmPassword: !passwordsMatch,
      username : !usernameValid
    });
    return usernameValid && passwordValid && passwordsMatch;
  };
  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    const username = usernameRef.current?.value;
    const password = passwordRef.current?.value;
    const confirmPassword = confirmPasswordRef.current?.value;

    if (!isFormValid(username, password, confirmPassword)) {
      setMessage("Invalid Entry - One of the entries below do not meet the requirements", ServerMessageType.Fail);
      setLoading(false);
      return;
    }

    try {
      await axios.post(
        REGISTER_URL,
        JSON.stringify({ username, password })
      );
      setMessage("Successfully created user", ServerMessageType.Success);
      usernameRef.current.value = "";
      passwordRef.current.value = "";
      confirmPasswordRef.current.value = "";
    } catch (error) {
      const err = error as AxiosError;
      if (!err?.response) {
        setMessage("No Server Response", ServerMessageType.Fail);
      } else if (err.response?.status === 409) {
        setMessage("Username Taken", ServerMessageType.Fail);
      } else {
        setMessage(`Registration Failed - ${err.response?.data.message}`, ServerMessageType.Fail);
      }
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs" sx={{
      display: "flex",
      flexDirection: "column",
      alignItems:"center"
    }}>
        <AlertMsg
          title="Registration Failed"
          message={failedMsg}
          severity="error"
        />
        <AlertMsg
          title="Registration Success"
          message={successMsg}
          severity="success"
        />
        <Typography component="h1" sx={{ m: 2 }} variant="h5">
          Register
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate>
          <TextField
            required
            id="username"
            label="Username"
            inputRef={usernameRef}
            fullWidth
            autoComplete="username"
            autoFocus
            helperText={USERNAME_REQUIREMENT}
            error={inputError.username}
          />

          <HiddenInput
            ref={passwordRef}
            label="Password"
            id="password"
            autocomplete="new-password"
            helperText={PASSWORD_REQUIREMENT}
            error={inputError.password}
          />
          <HiddenInput
            ref={confirmPasswordRef}
            label="Confirm Password"
            id="confirm-password"
            autocomplete="new-password"
            helperText={CONFIRM_PASSWORD_REQUIREMENT}
            error={inputError.confirmPassword}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <LoadingComponent isLoading={isLoading}>Register</LoadingComponent>
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/login">
                Already have an account? Login
              </Link>
            </Grid>
          </Grid>
        </Box>
    </Container>
  );
};

export default Register;
