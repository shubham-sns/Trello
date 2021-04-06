import React from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useMutation} from 'react-query'
import {Link} from 'react-router-dom'
import {
  Button,
  Form,
  Grid,
  Header,
  Image,
  Message,
  Segment,
} from 'semantic-ui-react'
import {signInWithEmailAndPassword} from 'services/firebase/auth'

function Signin() {
  const {
    control,
    setValue,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {email: '', password: ''},
  })

  const {mutate, isLoading, error} = useMutation(
    ({email, password}) => signInWithEmailAndPassword(email, password),
    {
      onError() {
        setValue('password', '')
      },
    },
  )

  return (
    <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
      <Grid.Column style={{maxWidth: 450}}>
        <Image
          src="/trello.png"
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
        <Header as="h2" color="teal" textAlign="center">
          Log-in to your account
        </Header>

        <Form size="large" onSubmit={handleSubmit(mutate)}>
          <Segment stacked>
            <Controller
              name="email"
              control={control}
              rules={{
                required: {
                  message: 'Email is required',
                  value: true,
                },
                pattern: {
                  message: 'Enter a valid Email',
                  value: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                },
              }}
              render={({field: {ref, ...field}}) => (
                <Form.Input
                  {...field}
                  fluid
                  icon="at"
                  iconPosition="left"
                  placeholder="E-mail address"
                  error={errors?.email && {content: errors.email.message}}
                />
              )}
            />

            <Controller
              name="password"
              control={control}
              rules={{
                required: {
                  message: 'Password is required',
                  value: true,
                },
                minLength: {
                  message: 'Password should have atleast 8 characters',
                  value: 8,
                },
              }}
              render={({field: {ref, ...field}}) => (
                <Form.Input
                  {...field}
                  fluid
                  icon="lock"
                  iconPosition="left"
                  placeholder="Password"
                  type="password"
                  error={errors?.password && {content: errors.password.message}}
                />
              )}
            />

            <Button
              color="teal"
              fluid
              size="large"
              disabled={isLoading}
              loading={isLoading}
            >
              Login
            </Button>
          </Segment>
        </Form>
        {error?.message && <Message error>{error.message}</Message>}
        <Message>
          New to us? <Link to="/signup"> Sign Up</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export {Signin}
