import { FunctionComponent } from "react";
import { Input, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {}

const SearchBar: FunctionComponent<SearchBarProps> = () => {
  return (
    <>
      <Input
        startAdornment={
          <InputAdornment position="start">
             <SearchIcon />
          </InputAdornment>
        }
        placeholder="Search..."
        sx={{ input: { color: 'white' }}}
        style={{marginBottom: 20}}
      />
    </>
  );
};

export default SearchBar;
