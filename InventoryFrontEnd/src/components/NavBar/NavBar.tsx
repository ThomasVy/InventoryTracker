import { AppBar, Container, Toolbar } from "@mui/material";
import NavButtons from "./NavButtons";
import Settings from "./Settings";

function NavBar() {
  return (
    <>
      <AppBar position="static">
        <Container maxWidth="xl">
          <Toolbar>
            <NavButtons />
            <Settings/>
          </Toolbar>
        </Container>
      </AppBar>
      
    </>
  );
}

export default NavBar;
