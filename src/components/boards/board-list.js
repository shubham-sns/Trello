import {Link} from 'react-router-dom'
import {Grid, Header, Segment} from 'semantic-ui-react'

function BoardList({list = []}) {
  if (!list.length) return null

  return (
    <>
      {list.map(item => (
        <Grid.Column as={Link} to={`/board/${item.key}`} key={item.key}>
          <Segment className="board__card" inverted color={item.color}>
            <Header as="h1">{item.title}</Header>
          </Segment>
        </Grid.Column>
      ))}
    </>
  )
}

export {BoardList}
