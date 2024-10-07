import { Tab, Tabs } from '@mui/material';

function TodoTabs({
  tab,
  onHandleChange,
}: {
  tab: number;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onHandleChange: any;
}) {
  return (
    <Tabs
      value={tab}
      onChange={onHandleChange}
      aria-label='basic tabs example'
      sx={{
        '& .MuiTab-textColorPrimary': {
          maxWidth: 'unset',
          background: '#F3F3F3',
        },
      }}
    >
      <Tab label='Personal' />
      <Tab label='Professional' />
    </Tabs>
  );
}

export default TodoTabs;
