import {Loader, Segment} from 'semantic-ui-react'
import {useParams} from 'react-router'
import {DndProvider} from 'react-dnd'
import {HTML5Backend} from 'react-dnd-html5-backend'

import {BoardHeader} from 'components/board/board-header'
import {useBoardData} from 'services/firebase/db'
import {Lists} from 'components/board/lists'

function BoardDataPage() {
  const {id} = useParams()

  const [boardQuery, listsQuery] = useBoardData(id)

  if (boardQuery.isLoading || listsQuery.isLoading)
    return (
      <div style={{flexGrow: 1}}>
        <Segment style={{height: '100%'}}>
          <Loader
            style={{
              height: '100%',
            }}
            active
            inline="centered"
          />
        </Segment>
      </div>
    )

  /* <DndProvider backend={HTML5Backend}>
        <div></div>
      </DndProvider> */

  return (
    <div style={{flexGrow: 1}}>
      <Segment style={{height: '100%'}} color={boardQuery.data?.color} inverted>
        <BoardHeader title={boardQuery.data?.title} />
        <Lists lists={listsQuery.data} />
      </Segment>
    </div>
  )
}

export {BoardDataPage}
