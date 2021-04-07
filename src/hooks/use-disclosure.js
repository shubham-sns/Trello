import {useState, useCallback} from 'react'

function useDisclosure() {
  const [isOpenState, setIsOpen] = useState(false)

  const onClose = useCallback(() => setIsOpen(false), [])
  const onOpen = useCallback(() => setIsOpen(true), [])
  const onToggle = useCallback(() => setIsOpen(s => !s), [])

  return {isOpen: !!isOpenState, onOpen, onClose, onToggle}
}

export {useDisclosure}
