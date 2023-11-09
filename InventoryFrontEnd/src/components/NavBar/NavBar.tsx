import { AppBar, Container, Toolbar } from "@mui/material";
import LeftNav from "./LeftNav";
import RightNav from "./RightNav";

function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <LeftNav />
            <RightNav />
          </Toolbar>
        </Container>
      </AppBar>
      
    </>
  );
}

export default NavBar;
