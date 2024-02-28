import React from 'react';
import Button from '@mui/material/Button';
import ClearIcon from '@mui/icons-material/Clear';

class ClearButton extends React.Component {
  render() {
    const { onClear } = this.props; // Destructuring to extract onClear from props

    return (
      <Button
        variant="outlined"
        color="error" // Use the "error" color to indicate a clear or delete action
        startIcon={<ClearIcon />} // Adds an icon before the button text
        onClick={onClear} // Accessing the onClear function passed as a prop
      >
        Clear
      </Button>
    );
  }
}
