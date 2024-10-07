import { Button, TextField } from '@mui/material';

interface TodoFormProps {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onHandleAdd: () => void;
}

function TodoForm({ value, onChange, onHandleAdd }: TodoFormProps) {
  return (
    <div className='bg-[#F1ECE6] max-w-[900px] w-full rounded-[50px] flex'>
      <TextField
        value={value}
        onKeyDown={(e) => {
          if (e.key === 'Enter') {
            onHandleAdd();
          }
        }}
        onChange={onChange}
        id='outlined-basic'
        label='What do you need to do?'
        sx={{
          width: '100%',
          marginLeft: '20px',
          '& .MuiInputBase-input': {
            color: 'black',
          },
          '&:hover .MuiInputBase-root': {
            background: 'transparent',
          },
          '& .MuiInputBase-root': {
            background: 'transparent',
          },
        }}
        variant='filled'
      />
      <Button
        onClick={onHandleAdd}
        variant='contained'
        sx={{
          background: '#76B7CD',
          color: 'white',
          borderTopRightRadius: '50px',
          borderBottomRightRadius: '50px',
          border: 'none',
        }}
      >
        ADD
      </Button>
    </div>
  );
}

export default TodoForm;
