import {useParams} from 'react-router'
import {Card, Icon} from 'semantic-ui-react'
import {useDeleteList} from 'services/firebase/db'

import {AddList} from './add-list'
import {Cards} from './cards/cards'

function Lists({lists}) {
  const {mutate} = useDeleteList()
  const {id} = useParams()

  return (
    <div className="lists">
      {lists?.map(({key, list}) => (
        <div className="list__wrapper" key={key}>
          <Card style={{background: 'rgb(223, 227, 230)'}}>
            <Card.Content>
              <Card.Header>
                <div className="content-between">
                  <span className="list__title">{list}</span>
                  <Icon
                    name="trash alternate"
                    onClick={() => mutate({boardKey: id, listKey: key})}
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
