import React from 'react';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const styles = {
  root: {
    color: 'primary',
    background: '#2096ba',
  },
};
const NavBar = ({ classes }) => (
  <AppBar
    position="static"
    color="secondary"
    classes={{
      root: classes.root,
    }}
  >
    <Toolbar>
      <Typography variant="title" color="inherit">
        Sentinel
      </Typography>
    </Toolbar>
    <div style={{ width: '100%', height: 50, backgroundColor: 'white' }} />
  </AppBar>
);

export default withStyles(styles)(NavBar);
