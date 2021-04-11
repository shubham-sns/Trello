import {useState} from 'react'
import {Grid, Header, Icon, Segment} from 'semantic-ui-react'

import {useDisclosure} from 'hooks/use-disclosure'
import {
  useCreateBoard,
  useGetBoardsOnce,
  useUpdateBoardField,
} from 'services/firebase/db'

import {BoardList} from 'components/boards/board-list'
import {BoardModal} from 'components/boards/board-modal'

function BoardsPage() {
  const {isOpen, onClose, onOpen} = useDisclosure()
  const [initialData, setInitialData] = useState(null)

  const {isLoading: isBoardsLoading, data: boards} = useGetBoardsOnce()

  const {
    mutate: handleUpdateBoard,
    isLoading: isBoardUpdating,
  } = useUpdateBoardField({
    onSuccess: () => {
      onClose()
      setInitialData(null)
    },
  })

  const {
    mutate: handleCreateBoard,
    isLoading: isCreateBoardLoading,
  } = useCreateBoard({
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

        <BoardList onOpen={onOpen} setEditData={setInitialData} list={boards} />

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
          onClose={() => {
            onClose()
            initialData && setInitialData(null)
          }}
          onSubmit={initialData ? handleUpdateBoard : handleCreateBoard}
          initialData={initialData}
          setInitialData={setInitialData}
          isLoading={isCreateBoardLoading || isBoardUpdating}
        />
      ) : null}
    </div>
  )
}

export {BoardsPage}
