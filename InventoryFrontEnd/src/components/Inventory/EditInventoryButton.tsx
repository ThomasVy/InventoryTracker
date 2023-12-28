import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { GetInventoryEditLink } from "src/data/LinkConstants";
import EditIcon from "@mui/icons-material/Edit";

type EditInventoryButtonProps = {
    id: string
};
function EditInventoryButton({ id }: EditInventoryButtonProps) {
    return (
        <>
            <Button
                component={Link}
                to={GetInventoryEditLink(id)}
                startIcon={<EditIcon />}
            >
                Edit
            </Button>
        </>
    );
}
export default EditInventoryButton;