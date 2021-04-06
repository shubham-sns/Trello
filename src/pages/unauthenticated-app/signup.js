import {Controller, useForm} from 'react-hook-form'
import {Link} from 'react-router-dom'

import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'
import FormControl from '@material-ui/core/FormControl'
import Input from '@material-ui/core/Input'
import InputLabel from '@material-ui/core/InputLabel'
import FormHelperText from '@material-ui/core/FormHelperText'

import {useStyles} from 'utils/unauthenticated-styles'
import {useMutation} from 'react-query'
import {useSignupMutation} from 'api/auth'

function Signup() {
  const classes = useStyles()

  const {
    handleSubmit,
    control,
    formState: {errors},
  } = useForm({
    defaultValues: {
      username: '',
      email: '',
      password: '',
    },
  })

  const {mutate, error} = useSignupMutation()

  return (
    <div className={classes.paper}>
      <Typography component="h1" variant="h4">
        Sign Up
      </Typography>

      <p className={classes.errorText}>{error?.message}</p>

      <form noValidate onSubmit={handleSubmit(data => mutate(data))}>
        <FormControl
          className={classes.formField}
          fullWidth
          error={errors?.username}
        >
          <InputLabel htmlFor="username">Username</InputLabel>
          <Controller
            name="username"
            control={control}
            rules={{
              required: {
                message: 'Field is required',
                value: true,
              },
            }}
            render={({field}) => <Input autoFocus id="username" {...field} />}
          />
          <FormHelperText error>
            {errors?.username && errors.username.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          className={classes.formField}
          fullWidth
          error={errors?.email}
        >
          <InputLabel htmlFor="email">Email address</InputLabel>
          <Controller
            name="email"
            control={control}
            rules={{
              required: {
                message: 'Field is required',
                value: true,
              },
              pattern: {
                value: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                message: 'Please Enter a valid Email Address.',
              },
            }}
            render={({field}) => (
              <Input
                autoFocus
                id="email"
                autoComplete="email"
                type="email"
                {...field}
              />
            )}
          />
          <FormHelperText error>
            {errors?.email && errors.email.message}
          </FormHelperText>
        </FormControl>

        <FormControl
          className={classes.formField}
          fullWidth
          error={errors?.password}
        >
          <InputLabel htmlFor="password">Password</InputLabel>
          <Controller
            name="password"
            control={control}
            rules={{
              required: {
                message: 'Field is required',
                value: true,
              },
              minLength: {
                message: 'Password should atleas have 8 characters',
                value: 8,
              },
            }}
            render={({field}) => (
              <Input id="password" type="password" {...field} />
            )}
          />
          <FormHelperText error>
            {errors?.password && errors.password.message}
          </FormHelperText>
        </FormControl>

        <Button
          className={classes.submit}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
        >
          Sign up
        </Button>
      </form>

      <div className={classes.divider}></div>

      <Link className={classes.formField} to="/login">
        Login
      </Link>
    </div>
  )
}

export {Signup}
