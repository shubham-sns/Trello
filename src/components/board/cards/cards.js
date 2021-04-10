import {Controller, useForm} from 'react-hook-form'
import {Button, Card, Form, Icon, Placeholder} from 'semantic-ui-react'

import {
  useDeleteCard,
  useGetCardOnce,
  useHandleCreateCard,
} from 'services/firebase/db'

function Cards({listKey}) {
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

  return (
    <>
      {data?.map(card => (
        <Card color="black" fluid className="cards__card" key={card.key}>
          <Card.Content style={{color: 'black'}}>
            <div className="card__content">
              <span style={{fontSize: '15px'}}>
                {card.cardTitle?.length > 20
                  ? `${card.cardTitle.slice(0, 20)}...`
                  : card.cardTitle}
              </span>
              <Button
                onClick={() => handleDeleteCard({listKey, cardKey: card.key})}
                floated="right"
                size="tiny"
                icon
                basic
              >
                <Icon
                  name="trash alternate outline"
                  style={{marginRight: '5px'}}
                />
              </Button>
              <Button floated="right" size="tiny" icon basic>
                <Icon name="edit outline" />
              </Button>
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
    </>
  )
}

export {Cards}
