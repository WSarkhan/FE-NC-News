import { FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import "./Sort.css"
import { useState } from "react";


export const Sort = ({sortBy, setSortBy}) => {
    const [sort, setSort] = useState('')

    const handleChange = (event) => {
        setSort(event.target.value);
        setSortBy(event.target.value)
      };
    return (
        <FormControl fullWidth>
  <InputLabel id="sort-by">Sort by</InputLabel>
  <Select
    labelId="sort by"
    id="sort-select"
    value={sort}
    label="sort by"
    displayEmpty
    onChange={handleChange}
  >
    <MenuItem value="created_at">Date</MenuItem>
    <MenuItem value="comment_count">Coment count</MenuItem>
    <MenuItem value="votes">Votes</MenuItem>
  </Select>
</FormControl>
    )
}