
import { Box } from "@mui/material";
import { FunctionComponent } from "react";
import Settings from "./Settings";
import ShoppingCart from "./ShoppingCart";

interface RightNavProps {
    
}
 
const RightNav: FunctionComponent<RightNavProps> = () => {
    return ( 
    <Box sx={{ flexGrow: 0, display: { xs: "flex" } }}>
        <ShoppingCart />
        <Settings />
    </Box> 
    );
}
 
export default RightNav;