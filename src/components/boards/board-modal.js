import {colors} from 'constants/colors'
import {Controller, useForm} from 'react-hook-form'
import {
  Button,
  Form,
  Icon,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  Segment,
} from 'semantic-ui-react'

function BoardModal({open, onClose, onSubmit, isLoading}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: '',
      color: 'teal',
    },
  })

  const watchColor = watch('color')

  return (
    <Modal open={open} onClose={onClose} size="tiny">
      <ModalHeader>Create Board</ModalHeader>

      <ModalContent>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="title"
            rules={{
              required: {
                message: 'Title is required',
                value: true,
              },
            }}
            render={({field: {ref, ...field}}) => (
              <Form.Input
                {...field}
                label="Board Title"
                autoFocus
                error={errors.title && {content: errors.title.message}}
              />
            )}
          />

          <div className="create_board-colors">
            {colors.map(c => (
              <Segment
                key={c}
                inverted
                color={c}
                onClick={() => setValue('color', c)}
                style={{
                  height: '50px',
                  width: '50px',
                  margin: '15px',
                  cursor: 'pointer',
                }}
              >
                {watchColor === c ? <Icon name="check" /> : null}
              </Segment>
            ))}
          </div>
        </Form>
      </ModalContent>

      <ModalActions>
        <Button basic onClick={onClose}>
          Cancel
        </Button>

        <Button primary loading={isLoading} onClick={handleSubmit(onSubmit)}>
          Create
        </Button>
      </ModalActions>
    </Modal>
  )
}

export {BoardModal}
