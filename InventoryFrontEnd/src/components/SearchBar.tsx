import { FunctionComponent } from "react";
import { Input, InputAdornment } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';

interface SearchBarProps {
  search: string,
  setSearch: (value: string) => void,
};

const SearchBar: FunctionComponent<SearchBarProps> = (
  {search, setSearch}
) => {
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
        value={search}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearch(e.target.value)}
      />
    </>
  );
};

export default SearchBar;
