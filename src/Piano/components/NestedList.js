import React from 'react';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import ListSubheader from '@mui/joy/ListSubheader';
import ListItemButton from '@mui/joy/ListItemButton';
import Typography from '@mui/joy/Typography';
import Switch from '@mui/joy/Switch';

class NestedList extends React.Component {
    render() {
      const { songs } = this.props; // Receive songs data as a prop
  
      return (
        <div>
          <List variant="outlined" sx={{ width: 300 }}>
            {songs.map((category, index) => (
              <ListItem nested key={index}>
                <ListSubheader>{category[1]}: {category[0]}</ListSubheader> {/* Use the first element as the category name */}
                <List>
                  {category[2].map((song, index) => ( // Use the third element as the list of songs
                    <ListItem key={index}>
                      <ListItemButton>{song}</ListItemButton>
                    </ListItem>
                  ))}
                </List>
              </ListItem>
            ))}
          </List>
        </div>
      );
    }
  }
export default NestedList;  

