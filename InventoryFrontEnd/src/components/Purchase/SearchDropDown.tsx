import { Autocomplete, Grid, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import useDebounce from "src/hooks/useDebounce";
import { SearchReturn } from 'src/data/PaginationConstants';

type SearchDropDownProps<T> = {
    displayOptions: (option: T) => JSX.Element,
    displaySelectedItem: (option: T) => string,
    searchHook: (page: number, limit: number, searchTerm: string) => SearchReturn<T>,
    value: T | null,
    setValue: (value: T | null) => void,
};

const SEARCH_LIMIT = 5;
export default function SearchDropDown<T>(
    { searchHook, displayOptions, displaySelectedItem, value, setValue }: SearchDropDownProps<T>) {
    //The typing strings fields
    const [inputValue, setInputValue] = useState('');
    const debouncedInput = useDebounce(inputValue, 500);

    //typing shows these options
    const [options, setOptions] = useState<readonly T[]>([]);

    const { results } = searchHook(0, SEARCH_LIMIT, debouncedInput);

    useEffect(
        () => {
            if (results?.results) {
                setOptions(results?.results)
            }
        }, [results]
    );

    return (
        <Autocomplete
            sx={{ width: 300 }}
            filterOptions={(x) => x}
            options={options}
            autoComplete
            includeInputInList
            filterSelectedOptions
            value={value}
            getOptionLabel={displaySelectedItem}
            noOptionsText="No items"
            onChange={(event: any, newValue: T | null) => {
                setOptions(newValue ? [newValue, ...options] : options);
                setValue(newValue);
            }}
            onInputChange={(event, newInputValue) => {
                setInputValue(newInputValue);
            }}
            renderInput={(params) => (
                <TextField {...params} label="Type an item to search" fullWidth />
            )}

            renderOption={(props, option) => {
                return (
                    <li {...props} >
                        <Grid container alignItems="center">
                            <Grid item sx={{ wordWrap: 'break-word' }}>
                                {displayOptions(option)}
                            </Grid>
                        </Grid>
                    </li>
                );
            }}
        />
    );
}