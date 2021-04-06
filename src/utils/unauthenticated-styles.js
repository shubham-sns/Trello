import {makeStyles} from '@material-ui/core'

const useStyles = makeStyles(theme => ({
  paper: {
    marginTop: theme.spacing(8),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    padding: '2rem',
    background: 'white',
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(3),
  },
  formField: {
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  divider: {
    borderTop: '2px solid gray',
    width: '50%',
    marginTop: '1rem',
  },
  errorText: {
    fontSize: '.8rem',
    color: theme.palette.error.main,
  },
}))

export {useStyles}
