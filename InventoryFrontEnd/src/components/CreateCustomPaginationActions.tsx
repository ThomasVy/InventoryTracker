import {
  Box,
  IconButton
} from "@mui/material";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import LastPageIcon from "@mui/icons-material/LastPage";
import FirstPageIcon from "@mui/icons-material/FirstPage";

interface PaginationAction {
  count?: number;
  page: number;
  rowsPerPage?: number;
  onPageChange?: (
    event: React.MouseEvent<HTMLButtonElement>,
    newPage: number
  ) => void;
}

interface CreateCustomPaginationActionsProps {
  previousPage: number | undefined;
  nextPage: number | undefined;
  maxPage: number | undefined;
  setPage: React.Dispatch<React.SetStateAction<number>>;
}
export const CreateCustomPaginationActions = ({
  previousPage, nextPage, maxPage, setPage,
}: CreateCustomPaginationActionsProps) => {
  return ({ page }: PaginationAction) => {
    return (
      <Box sx={{ flexShrink: 0 }}>
        <IconButton
          disabled={page === 0}
          onClick={() => setPage(0)}
          size="large"
        >
          <FirstPageIcon />
        </IconButton>
        <IconButton
          disabled={previousPage == null}
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
