import FormControl from '@mui/material/FormControl';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function TodoFilter({ value, onChange }: { value: string; onChange: any }) {
  return (
    <FormControl
      sx={{
        width: '200px',
        '& .MuiSelect-select': {
          color: 'black',
          textAlign: 'center',
        },
      }}
    >
      <InputLabel id='demo-simple-select-label'>Filter</InputLabel>
      <Select
        labelId='demo-simple-select-label'
        id='demo-simple-select'
        value={value}
        label='Filter'
        onChange={onChange}
      >
        <MenuItem value={'all'}>All</MenuItem>
        <MenuItem value={'completed'}>Completed</MenuItem>
        <MenuItem value={'uncompleted'}>Uncompleted</MenuItem>
      </Select>
    </FormControl>
  );
}

export default TodoFilter;
