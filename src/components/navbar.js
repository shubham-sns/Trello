import {useDisclosure} from 'hooks/use-disclosure'
import {Link} from 'react-router-dom'
import {
  Menu,
  Container,
  Button,
  Modal,
  ModalHeader,
  ModalActions,
  ModalContent,
} from 'semantic-ui-react'
import {signOut} from 'services/firebase/auth'

function Navbar() {
  const {isOpen, onClose, onOpen} = useDisclosure()
  return (
    <Menu
      style={{backgroundColor: '#0079BF'}}
      fixed="top"
      pointing
      secondary
      size="large"
    >
      <Container>
        <Menu.Item>
          <Button as={Link} icon to="/">
            {/* <Icon name="home" size="large" color="black" /> */}
            Home
          </Button>
        </Menu.Item>

        <Menu.Item>
          <Button onClick={onOpen}>Logout</Button>
        </Menu.Item>
      </Container>

      <Modal open={isOpen} onClose={onClose} size="tiny">
        <ModalHeader>Logout</ModalHeader>
        <ModalContent>Do you want to logout?</ModalContent>
        <ModalActions>
          <Button basic onClick={onClose}>
            Cancel
          </Button>
          <Button color="red" onClick={signOut}>
            Logout
          </Button>
        </ModalActions>
      </Modal>
    </Menu>
  )
}

export {Navbar}
