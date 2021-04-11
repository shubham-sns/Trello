import {useState} from 'react'
import {Controller, useForm} from 'react-hook-form'
import {
  Button,
  Card,
  Form,
  Header,
  Icon,
  Label,
  Placeholder,
} from 'semantic-ui-react'

import {
  useDeleteCard,
  useGetCardOnce,
  useHandleCreateCard,
} from 'services/firebase/db'

import {CardModal} from './card-modal'

function Cards({listKey}) {
  const [selectedCard, setSelectedCard] = useState(null)

  const {control, handleSubmit, reset} = useForm({
    defaultValues: {
      cardTitle: '',
    },
  })

  const {data, isLoading} = useGetCardOnce(listKey)

  const {mutate: handleCreateCard} = useHandleCreateCard()
  const {mutate: handleDeleteCard} = useDeleteCard()

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

  const cardProps = priority => {
    switch (priority) {
      case 'high':
        return {color: 'red'}

      case 'medium':
        return {color: 'orange'}

      case 'low':
        return {color: 'green'}

      default:
        break
    }
  }

  return (
    <>
      {data?.map(card => (
        <Card color="black" fluid className="cards__card" key={card.key}>
          <Card.Content style={{color: 'black'}}>
            <div className="cards__content">
              {card.priority ? (
                <Label
                  size="small"
                  circular
                  empty
                  {...cardProps(card.priority)}
                  style={{
                    marginRight: '5px',
                  }}
                />
              ) : null}

              <div style={{fontSize: '18px'}}>
                {card.cardTitle?.length > 20
                  ? `${card.cardTitle.slice(0, 20)}...`
                  : card.cardTitle}
              </div>

              <div className="cards__content--actions">
                <Button
                  onClick={() => handleDeleteCard({listKey, cardKey: card.key})}
                  floated="right"
                  size="tiny"
                  icon
                >
                  <Icon name="trash alternate outline" />
                </Button>

                <Button
                  onClick={() => setSelectedCard(card)}
                  floated="right"
                  size="tiny"
                  icon
                >
                  <Icon name="edit outline" />
                </Button>
              </div>
            </div>
          </Card.Content>
        </Card>
      ))}

      {/* create new card form */}
      <Card>
        <Form onSubmit={handleSubmit(submitForm)}>
          <Controller
            control={control}
            name="cardTitle"
            render={({field: {onBlur, ref, ...field}}) => {
              return (
                <Form.Input
                  fluid
                  placeholder="Create card"
                  onBlur={handleSubmit(submitForm)}
                  {...field}
                />
              )
            }}
          />
        </Form>
      </Card>

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
