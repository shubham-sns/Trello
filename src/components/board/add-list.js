import {useForm} from 'react-hook-form'
import {useParams} from 'react-router'
import {Form} from 'semantic-ui-react'

import {useCreateList} from 'services/firebase/db'

function AddList() {
  const {id} = useParams()
  const {register, handleSubmit, reset} = useForm({defaultValues: {list: ''}})

  const {mutate} = useCreateList()

  const submitForm = data => {
    mutate({boardKey: id, ...data})
    reset()
  }

  return (
    <div className="list__wrapper">
      <div className="add__list">
        <Form onSubmit={handleSubmit(submitForm)}>
          <Form.Field>
            <input
              autoComplete="off"
              placeholder="Create New List"
              {...register('list')}
            />
          </Form.Field>
        </Form>
      </div>
    </div>
  )
}

export {AddList}
