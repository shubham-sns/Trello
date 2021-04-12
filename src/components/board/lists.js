import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {useParams} from 'react-router'
import {Card, Form, Icon, Input} from 'semantic-ui-react'
import {DragDropContext, Draggable, Droppable} from 'react-beautiful-dnd'
import {useQueryClient} from 'react-query'

import {useDeleteList, useUpdateList} from 'services/firebase/db'

import {AddList} from './add-list'
import {Cards} from './cards/cards'

function Lists({lists}) {
  const {id} = useParams()

  const queryClient = useQueryClient()

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

    //  handle lists / (columns)
    if (type === 'column') {
      const tempList = [...lists]
      const removed = tempList.splice(source.index, 1)
      tempList.splice(destination.index, 0, ...removed)

      return queryClient.setQueryData(['lists', id], [...tempList])
    }

    // * everything from this point is for cards/tasks

    // in which list/column card is dropped
    const start = source.droppableId
    const finish = destination.droppableId

    // dropped in same column
    if (start === finish) {
      const tempCards = queryClient.getQueryData(['cards', start])
      const removed = tempCards.splice(source.index, 1)
      tempCards.splice(destination.index, 0, ...removed)

      return queryClient.setQueryData(['cards', start], [...tempCards])
    }

    // dropped in different column

    // mutate start list
    const startCards = queryClient.getQueryData(['cards', start])
    const removedCard = startCards.splice(source.index, 1)

    // mutate destination list
    const finishCards = queryClient.getQueryData(['cards', finish])
    finishCards.splice(destination.index, 0, ...removedCard)

    queryClient.setQueryData(['cards', start], [...startCards])
    queryClient.setQueryData(['cards', finish], [...finishCards])
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
                {(provided, {isDragging}) => (
                  <div
                    className="list__wrapper"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                  >
                    <Card
                      style={{
                        background: 'rgb(223, 227, 230)',
                      }}
                    >
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
