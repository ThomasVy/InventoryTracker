import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import authRequest from "../api/authRequest";
import {
  Box,
  Container,
  Grid,
  TextField,
  Link,
  Typography,
} from "@mui/material";
import HiddenInput from "src/components/HiddenInput";
import { showToast } from "src/utilities/toast";
import { LoadingButton } from "@mui/lab";

const LOGIN_URL = "/login";

function Login() {
  const { setAuth } = useAuth();

  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || "/";

  const [isLoading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState(false);
  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await authRequest.post(
        LOGIN_URL,
        JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        })
      );
      const data = response?.data;
      setAuth({ username: data?.username, accessToken: data?.accessToken });
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        showToast("No Server Response");
        setError(true);
      } else {
        console.log(err?.response)
        showToast("Verification Failed");
        setError(true);
      }
    }
    setLoading(false);
  };

  return (
    <Container
      component="main"
      maxWidth="xs"
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems:"center"
      }}
    >
      <Typography component="h1" sx={{ m: 2 }} variant="h5">
        Login
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
          error={error}
        />

        <HiddenInput
          ref={passwordRef}
          label="Password"
          id="password"
          autocomplete="current-password"
          error={error}
        />
        <LoadingButton
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
          loading={isLoading}
          type="submit"
         >
          Sign In
         </LoadingButton>
        <Grid container>
          <Grid item>
            <Link component={RouterLink} to="/register">
              Don't have an account? Register
            </Link>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}

export default Login;
