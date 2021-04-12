import {useEffect, useRef, useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useParams} from 'react-router'
import {Card, Form, Icon, Input} from 'semantic-ui-react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'

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
    formState: {isDirty, errors},
    reset,
  } = useForm({
    list: '',
  })

  const [editKey, setEditKey] = useState(null)

  const submitForm = data => {
    console.log('form submitted')
    isDirty && handleUpdateList({...data, boardKey: id, listKey: editKey})
    setEditKey(null)
    reset()
  }

  const handleOnDragEnd = result => {
    const {destination, source, draggableId, type} = result

    //If there is no destination
    if (!destination) {
      return
    }

    //If source and destination is the same
    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return
    }

    if (type === 'column') {
      // handle columns
      console.log({
        result,
      })
    }
  }

  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="all-columns" direction="horizontal" type="column">
        {provided => (
          <div
            className="lists"
            {...provided.droppableProps}
            ref={provided.innerRef}
          >
            {lists?.map(({key, list}, index) => (
              <Draggable key={key} draggableId={key} index={index}>
                {provided => (
                  <div
                    className="list__wrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
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
                                  rules={{required: true}}
                                  render={({
                                    field: {ref, onBlur, ...field},
                                  }) => (
                                    <Form.Field error={errors?.list}>
                                      <Input
                                        autoFocus
                                        autoComplete="off"
                                        placeholder="Add list title"
                                        onBlur={handleSubmit(submitForm)}
                                        {...field}
                                      />
                                    </Form.Field>
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
                                {list.length > 20
                                  ? list.slice(0, 20) + '...'
                                  : list}
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
                )}
              </Draggable>
            ))}
            {provided.placeholder}

            <AddList />
          </div>
        )}
      </Droppable>
    </DragDropContext>
  )
}

export {Lists}
