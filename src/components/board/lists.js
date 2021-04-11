import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useParams} from 'react-router'
import {Card, Form, Icon} from 'semantic-ui-react'

import {useDeleteList, useUpdateList} from 'services/firebase/db'

import {AddList} from './add-list'
import {Cards} from './cards/cards'

function Lists({lists}) {
  const {id} = useParams()

  const {mutate: handleDeleteList} = useDeleteList()
  const {mutate: handleUpdateList} = useUpdateList()

  const {
    handleSubmit,
    control,
    formState: {isDirty},
    reset,
  } = useForm({
    list: '',
  })

  const [editKey, setEditKey] = useState(null)

  const submitForm = data => {
    isDirty && handleUpdateList({...data, boardKey: id, listKey: editKey})
    setEditKey(null)
    reset()
  }

  return (
    <div className="lists">
      {lists?.map(({key, list}) => (
        <div className="list__wrapper" key={key}>
          <Card style={{background: 'rgb(223, 227, 230)'}}>
            <Card.Content>
              <Card.Header>
                <div className="content-between">
                  {editKey === key ? (
                    <Form onSubmit={handleSubmit(submitForm)}>
                      <Controller
                        control={control}
                        name="list"
                        defaultValue={list}
                        render={({field: {ref, onBlur, ...field}}) => (
                          <Form.Input
                            autoFocus
                            placeholder="Add list title"
                            onBlur={handleSubmit(submitForm)}
                            {...field}
                          />
                        )}
                      />
                    </Form>
                  ) : (
                    <span
                      role="button"
                      onClick={() => setEditKey(key)}
                      className="list__title"
                      title={list}
                    >
                      {list.length > 20 ? list.slice(0, 20) + '...' : list}
                    </span>
                  )}
                  <Icon
                    name="trash alternate"
                    onClick={() =>
                      handleDeleteList({boardKey: id, listKey: key})
                    }
                    className="cards__card"
                  />
                </div>
              </Card.Header>

              {/* cards */}
              <Cards listKey={key} />
            </Card.Content>
          </Card>
        </div>
      ))}

      <AddList />
    </div>
  )
}

export {Lists}
