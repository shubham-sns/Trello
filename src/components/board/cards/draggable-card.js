import {Draggable} from 'react-beautiful-dnd'
import {Button, Card, Icon, Label, Ref} from 'semantic-ui-react'
import {useDeleteCard} from 'services/firebase/db'

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

function DraggableCard({card, listKey, setSelectedCard, index}) {
  const {mutate: handleDeleteCard} = useDeleteCard()

  return (
    <Draggable draggableId={card.key} index={index}>
      {(provided, snapshot) => (
        <Ref innerRef={provided.innerRef}>
          <Card
            color="black"
            fluid
            className="cards__card"
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            // style={{}}
          >
            <Card.Content
              style={{
                color: 'black',
                backgroundColor: snapshot.isDragging ? '#e0ffe0' : '',
              }}
            >
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
                    onClick={() =>
                      handleDeleteCard({listKey, cardKey: card.key})
                    }
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
        </Ref>
      )}
    </Draggable>
  )
}

export {DraggableCard}
