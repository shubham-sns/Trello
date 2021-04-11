import {useEffect} from 'react'
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

import {colors} from 'constants/colors'

function BoardModal({
  open,
  onClose,
  onSubmit,
  isLoading,
  initialData,
  setInitialData,
}) {
  const {
    handleSubmit,
    control,
    formState: {errors},
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: '',
      color: 'teal',
    },
  })

  useEffect(() => {
    if (initialData) {
      const {key, ...data} = initialData
      reset(data)
    }
  }, [initialData, reset])

  const watchColor = watch('color')

  return (
    <Modal
      open={open}
      onClose={() => {
        initialData && setInitialData(null)
        onClose()
      }}
      size="tiny"
    >
      <ModalHeader>{initialData ? 'Edit' : 'Create'} Board</ModalHeader>

      <ModalContent>
        <Form
          onSubmit={handleSubmit(data =>
            initialData
              ? onSubmit({...data, boardKey: initialData.key})
              : onSubmit(data),
          )}
        >
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
        <Button
          basic
          onClick={() => {
            onClose()
            initialData && setInitialData(null)
          }}
        >
          Cancel
        </Button>

        <Button
          primary
          loading={isLoading}
          onClick={handleSubmit(data =>
            initialData
              ? onSubmit({...data, boardKey: initialData.key})
              : onSubmit(data),
          )}
        >
          {initialData ? 'Update' : 'Create'}
        </Button>
      </ModalActions>
    </Modal>
  )
}

export {BoardModal}
