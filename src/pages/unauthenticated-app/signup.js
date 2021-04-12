/* eslint-disable no-useless-escape */
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

import {createUserWithEmailAndPassword} from 'services/firebase/auth'
import {useCreateStoreUser} from 'services/firebase/db'

function SignUp() {
  const {
    control,
    handleSubmit,
    formState: {errors},
  } = useForm({
    defaultValues: {username: '', email: '', password: ''},
  })

  const createStoreUserMutation = useCreateStoreUser()

  const createAuthUserMutation = useMutation(({email, password, username}) =>
    createUserWithEmailAndPassword(email, password).then(authUser =>
      createStoreUserMutation.mutate({
        uid: authUser.user.uid,
        email,
        username,
      }),
    ),
  )

  return (
    <Grid textAlign="center" style={{height: '100vh'}} verticalAlign="middle">
      <Grid.Column style={{maxWidth: 450}}>
        <Image
          src="/trello.png"
          style={{marginLeft: 'auto', marginRight: 'auto'}}
        />
        <Header as="h2" color="teal" textAlign="center">
          Create New Account
        </Header>

        <Form
          size="large"
          onSubmit={handleSubmit(data => createAuthUserMutation.mutate(data))}
        >
          <Segment stacked>
            <Controller
              name="username"
              control={control}
              rules={{
                required: {
                  message: 'Username is required',
                  value: true,
                },
              }}
              render={({field: {ref, ...field}}) => (
                <Form.Input
                  {...field}
                  fluid
                  icon="user"
                  iconPosition="left"
                  placeholder="Username"
                  error={errors?.username && {content: errors.username.message}}
                />
              )}
            />
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
              loading={
                createStoreUserMutation.isLoading ||
                createAuthUserMutation.isLoading
              }
              disabled={
                createStoreUserMutation.isLoading ||
                createAuthUserMutation.isLoading
              }
            >
              Sign Up
            </Button>
          </Segment>
        </Form>
        {createAuthUserMutation?.error?.message && (
          <Message error>{createAuthUserMutation.error.message}</Message>
        )}

        <Message>
          Already have an account? <Link to="/signin">Sign in</Link>
        </Message>
      </Grid.Column>
    </Grid>
  )
}

export {SignUp}
