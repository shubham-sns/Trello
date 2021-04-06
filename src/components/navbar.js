import React, {useState} from 'react'

import {Link} from 'react-router-dom'
import IconButton from '@material-ui/core/IconButton'
import HomeIcon from '@material-ui/icons/Home'
import SettingsIcon from '@material-ui/icons/Settings'
import Menu from '@material-ui/core/Menu'
import MenuItem from '@material-ui/core/MenuItem'
import ExitToAppIcon from '@material-ui/icons/ExitToApp'
import {ListItemIcon, Typography} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
}))

function Navbar() {
  const classes = useStyles()

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleClick = event => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <nav>
      <IconButton aria-label="delete">
        <HomeIcon />
      </IconButton>
      <IconButton
        arial-label="setting"
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <SettingsIcon />
      </IconButton>

      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem>
          <ListItemIcon>
            <ExitToAppIcon fontSize="small" />
          </ListItemIcon>
          <Typography variant="inherit">Logout</Typography>
        </MenuItem>
        <MenuItem onClick={handleClose}>My account</MenuItem>
        <MenuItem onClick={handleClose}>Logout</MenuItem>
      </Menu>
    </nav>
  )
}

export {Navbar}
