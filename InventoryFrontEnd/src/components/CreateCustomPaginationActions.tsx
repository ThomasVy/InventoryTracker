import {
  Box,
  IconButton
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import { TablePaginationActionsProps } from "./Inventory/InventoryList";

interface CreateCustomPaginationActionsProps {
  previousPage: number | undefined;
  nextPage: number | undefined;
  maxPage: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const CreateCustomPaginationActions = ({
  previousPage, nextPage, maxPage, setPage,
}: CreateCustomPaginationActionsProps) => {
  return ({ page }: TablePaginationActionsProps) => {
    return (
      <Box sx={{ flexShrink: 0, ml: 2.5 }}>
        <IconButton
          disabled={page === 0}
          onClick={() => setPage(1)}
          size="large"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={!previousPage}
          size="large"
          onClick={() => setPage(previousPage)}
        >
          <NavigateBeforeIcon />
        </IconButton>
        <IconButton
          disabled={!nextPage}
          size="large"
          onClick={() => setPage(nextPage)}
        >
          <NavigateNextIcon />
        </IconButton>
        <IconButton
          onClick={() => setPage(maxPage)}
          disabled={!maxPage}
          size="large"
        >
          <LastPageIcon />
        </IconButton>
      </Box>
    );
  };
};
