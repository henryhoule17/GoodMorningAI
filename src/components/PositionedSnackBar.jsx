import * as React from 'react';
import Box from '@mui/material/Box';
import Snackbar from '@mui/material/Snackbar';

export default function PositionedSnackBar({ open, handleClose, message}) {
  const vertical = 'bottom'
  const horizontal = 'right'

  return (
    <Box>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message={message}
        key={vertical + horizontal}
      />
    </Box>
  );
}