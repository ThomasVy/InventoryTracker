import { Button, Typography } from "@mui/material";
import useAuth from "../hooks/useAuth.tsx";
import { Link } from "react-router-dom";
import { INVENTORY_LINK } from "src/data/LinkConstants.tsx";

function Home() {
  const { auth } = useAuth();
  if (auth) {
    return (
      <>
        <Typography variant="h1" textAlign="center">
          Welcome {auth.username}
        </Typography>
        <Button variant="contained" size="large" component={Link} to={INVENTORY_LINK.link}>GO TO INVENTORY</Button>
      </>
    );
  }
  return (
    <>
      <Typography variant="h1" textAlign="center">
        Welcome to the Home Page
      </Typography>
    </>
  );
}

export default Home;
