import { useRef, useState } from "react";
import { Link as RouterLink, useNavigate, useLocation } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import axiosPrivate from "../api/axios";
import { Box, Button, Container, Grid, TextField, Link, Typography} from "@mui/material";
import "src/assets/Input.css";
import HiddenInput from "src/components/HiddenInput";
import LoadingComponent from "src/components/LoadingComponent";
import AlertMsg from "src/components/Alert";

const LOGIN_URL = "/auth/login";

function Login() {
  const { setAuth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isLoading, setLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const from = location.state?.from?.pathname || "/";

  const usernameRef = useRef<HTMLInputElement | null>(null);
  const passwordRef = useRef<HTMLInputElement | null>(null);

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      const response = await axiosPrivate.post(
        LOGIN_URL,
        JSON.stringify({
          username: usernameRef.current?.value,
          password: passwordRef.current?.value,
        })
      );
      const data = response?.data;

      if (setAuth) {
        setAuth({ username: data?.username, accessToken: data?.accessToken });
      }
      navigate(from, { replace: true });
    } catch (err) {
      if (!err?.response) {
        setErrorMsg("No Server Response");
      } else {
        setErrorMsg("Verification Failed");
      }
    }
    setLoading(false);
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <AlertMsg title="Login Failed" message={errorMsg} severity="error" />
         <Typography component="h1" sx={{m: 2}} variant="h5">
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
          />

          <HiddenInput
            ref={passwordRef}
            label="Password"
            id="password"
            autocomplete="current-password"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            <LoadingComponent isLoading={isLoading}>Sign In</LoadingComponent>
          </Button>
          <Grid container>
            <Grid item>
              <Link component={RouterLink} to="/register">
                Don't have an account? Register
              </Link>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Container>
  );
}

export default Login;
