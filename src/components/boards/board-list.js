import {useState} from 'react'
import {Link} from 'react-router-dom'
import {
  Button,
  Grid,
  Header,
  Icon,
  Modal,
  ModalActions,
  ModalContent,
  ModalHeader,
  Segment,
} from 'semantic-ui-react'

import {useDisclosure} from 'hooks/use-disclosure'
import {useDeleteBoard} from 'services/firebase/db'

function BoardList({list, setEditData, onOpen}) {
  const {isOpen, onOpen: onDeleteModalOpen, onClose} = useDisclosure()
  const [deleteId, setDeleteId] = useState(null)

  const {mutate: handleDeleteBoard, isLoading} = useDeleteBoard({
    onSuccess: () => {
      onClose()
      setDeleteId(null)
    },
  })

  if (!list?.length) return null

  return (
    <>
      {list.map(item => (
        <Grid.Column as={Link} to={`/board/${item.key}`} key={item.key}>
          <Segment className="board__card" inverted color={item.color}>
            <Header as="h1">{item.title}</Header>
            <div className="board__actions">
              <Button
                size="small"
                basic
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  onDeleteModalOpen()
                  setDeleteId(item.key)
                }}
                icon={
                  <Icon style={{color: 'white'}} size="large" name="trash" />
                }
              />
              <Button
                size="small"
                basic
                onClick={e => {
                  e.stopPropagation()
                  e.preventDefault()
                  setEditData(item)
                  onOpen()
                }}
                icon={
                  <Icon style={{color: 'white'}} size="large" name="setting" />
                }
              />
            </div>
          </Segment>
        </Grid.Column>
      ))}

      {isOpen && (
        <Modal
          size="tiny"
          open={isOpen}
          onClose={() => {
            onClose()
            setDeleteId(null)
          }}
        >
          <ModalHeader>Delete!!!</ModalHeader>
          <ModalContent>
            Are you sure you want to delete this board?
          </ModalContent>
          <ModalActions>
            <Button
              basic
              onClick={() => {
                onClose()
                setDeleteId(null)
              }}
            >
              Cancel
            </Button>
            <Button
              loading={isLoading}
              color="red"
              onClick={() => handleDeleteBoard(deleteId)}
            >
              Delete
            </Button>
          </ModalActions>
        </Modal>
      )}
    </>
  )
}

export {BoardList}
