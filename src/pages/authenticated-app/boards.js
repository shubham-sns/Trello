import {Grid, Header, Icon, Segment} from 'semantic-ui-react'

import {useDisclosure} from 'hooks/use-disclosure'
import {BoardModal} from 'components/boards/board-modal'
import {useCreateBoard, useGetBoardsOnce} from 'services/firebase/db'
import {BoardList} from 'components/boards/board-list'

function BoardsPage() {
  const {isOpen, onClose, onOpen} = useDisclosure()

  const {isLoading: isBoardsLoading, data: boards} = useGetBoardsOnce()

  const {mutate, isLoading: isCreateBoardLoading} = useCreateBoard({
    onSuccess: onClose,
  })

  return (
    <div style={{marginTop: '4rem'}}>
      <Header as="h3">
        <Icon name="user" />
        Personal Boards
      </Header>

      <Grid columns={4} doubling stackable>
        {isBoardsLoading && (
          <Grid.Column>
            <h1>Loading...</h1>
          </Grid.Column>
        )}

        <BoardList list={boards} />

        {/* create board button */}
        <Grid.Column>
          <Segment
            onClick={onOpen}
            inverted
            color="grey"
            className="board__card"
          >
            <Header as="h1">Create New</Header>
          </Segment>
        </Grid.Column>
      </Grid>

      {isOpen ? (
        <BoardModal
          open={isOpen}
          onClose={onClose}
          onSubmit={mutate}
          isLoading={isCreateBoardLoading}
        />
      ) : null}
    </div>
  )
}

export {BoardsPage}
