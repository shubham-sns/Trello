import {useDisclosure} from 'hooks/use-disclosure'
import {Link} from 'react-router-dom'
import {
  Button,
  Modal,
  ModalHeader,
  ModalActions,
  ModalContent,
  Icon,
} from 'semantic-ui-react'
import {signOut} from 'services/firebase/auth'

function Navbar() {
  const {isOpen, onClose, onOpen} = useDisclosure()
  return (
    <>
      <nav className="navigation-bar">
        <Button as={Link} to="/" icon primary>
          <Icon name="home" />
        </Button>
        <Button icon primary onClick={onOpen}>
          <Icon name="log out" />
        </Button>
      </nav>

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
    </>
  )
}

export {Navbar}
