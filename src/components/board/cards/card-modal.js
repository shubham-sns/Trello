import {Controller, useForm} from 'react-hook-form'
import {Button, Form, Modal} from 'semantic-ui-react'
import {useEditCard} from 'services/firebase/db'

function CardModal({
  open,
  onClose,
  listKey,
  cardValues: {key, ...defaultValues},
}) {
  const {
    control,
    handleSubmit,
    formState: {isDirty},
  } = useForm({
    defaultValues: {
      description: '',
      priority: '',
      ...defaultValues,
    },
  })

  const {mutate} = useEditCard({
    onSuccess: onClose,
  })

  const submitForm = data => {
    console.log(data)
    mutate({listKey, cardKey: key, ...data})
  }

  return (
    <Modal size="small" open={open} onClose={onClose}>
      <Modal.Header>Edit Card</Modal.Header>

      <Modal.Content>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Controller
            name="cardTitle"
            control={control}
            render={({field: {ref, ...field}}) => (
              <Form.Input label="Title" {...field} />
            )}
          />

          <Controller
            name="priority"
            control={control}
            render={({field: {value, onChange}}) => (
              <Form.Select
                label="Priority"
                value={value}
                onChange={(e, {value}) => onChange(value)}
                options={[
                  {
                    key: 'high',
                    value: 'high',
                    text: 'High',
                    color: 'red',
                    label: {color: 'red', empty: true, circular: true},
                  },
                  {
                    key: 'medium',
                    value: 'medium',
                    text: 'Medium',
                    label: {color: 'orange', empty: true, circular: true},
                  },
                  {
                    key: 'low',
                    value: 'low',
                    text: 'Low',
                    label: {color: 'green', empty: true, circular: true},
                  },
                ]}
                placeholder="Select priority"
              />
            )}
          />

          <Controller
            control={control}
            name="description"
            render={({field: {ref, ...field}}) => (
              <Form.TextArea
                placeholder="Write a description"
                label="Description"
                {...field}
              />
            )}
          />
        </Form>
      </Modal.Content>

      <Modal.Actions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>
        <Button primary disabled={!isDirty} onClick={handleSubmit(submitForm)}>
          Update
        </Button>
      </Modal.Actions>
    </Modal>
  )
}

export {CardModal}
