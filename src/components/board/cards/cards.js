import {useState} from 'react'
import {Droppable} from 'react-beautiful-dnd'
import {Controller, useForm} from 'react-hook-form'
import {Card, Form, Placeholder} from 'semantic-ui-react'

import {useGetCardOnce, useHandleCreateCard} from 'services/firebase/db'

import {CardModal} from './card-modal'
import {DraggableCard} from './draggable-card'

function Cards({listKey}) {
  const [selectedCard, setSelectedCard] = useState(null)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      cardTitle: '',
    },
  })

  const {data, isLoading} = useGetCardOnce(listKey)

  const {mutate: handleCreateCard} = useHandleCreateCard()

  const submitForm = ({cardTitle}) => {
    if (cardTitle.trim()) {
      handleCreateCard({listKey, cardTitle, createdAt: Date.now()})
      reset()
    }
  }

  // todo: to show placeholder in columns
  if (isLoading)
    return (
      <>
        {Array(3).map(item => (
          <Card>
            <Card.Content>
              <Placeholder.Paragraph>
                <Placeholder.Line length="medium" />
                <Placeholder.Line length="short" />
              </Placeholder.Paragraph>
            </Card.Content>
          </Card>
        ))}
      </>
    )

  return (
    <>
      <Droppable droppableId={listKey} type="task">
        {(provided, snapshot) => (
          <div
            className="cards__wrapper"
            ref={provided.innerRef}
            {...provided.droppableProps}
            style={{background: snapshot.isDraggingOver && '#d5f3ff'}}
          >
            {data?.map((card, index) => (
              <DraggableCard
                key={card.key}
                listKey={listKey}
                card={card}
                setSelectedCard={setSelectedCard}
                index={index}
              />
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>

      {/* create new card form */}
      <Card>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Controller
            control={control}
            name="cardTitle"
            render={({field: {onBlur, ref, ...field}}) => {
              return (
                <Form.Field>
                  <input
                    autoComplete="off"
                    placeholder="Create card"
                    onBlur={handleSubmit(submitForm)}
                    {...field}
                  />
                </Form.Field>
              )
            }}
          />
        </Form>
      </Card>

      {/* modals */}
      {Boolean(selectedCard) && (
        <CardModal
          open={Boolean(selectedCard)}
          onClose={() => setSelectedCard(null)}
          cardValues={selectedCard}
          listKey={listKey}
        />
      )}
    </>
  )
}

export {Cards}
