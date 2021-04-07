import {useAuthContext} from 'context/auth-context'
import {useMutation, useQuery, useQueryClient} from 'react-query'
import {mergeDataWithKey} from 'utils'
import {db} from './firebase'
import {getUser} from './user'

const boardsRef = db.ref('boards')
const listsRef = db.ref('lists')
const cardsRef = db.ref('cards')

/**
 *
 * @param {string} id firebase auth uid
 * @param {string} username
 * @param {string} email
 * @returns
 */
const createUser = (id, username, email) =>
  db.ref(`users/${id}`).set({
    username,
    email,
  })

const onceGetUsers = () => db.ref('users').once('value')

/**
 * create a new board in db
 * @param {object} board {title, key}
 */
const createBoard = async board => {
  const uid = getUser().uid
  // get key for new board
  const id = boardsRef.push().key
  await boardsRef.child(uid).child(id).set(board)
  board.key = id

  return board
}

function useCreateBoard(mutationConfig = {}) {
  const queryClient = useQueryClient()
  const {uid} = useAuthContext()
  let id = null

  return useMutation(
    async board => {
      id = await boardsRef.push().key
      return boardsRef.child(uid).child(id).set(board)
    },
    {
      // optimistic updates
      onMutate: newBoard => {
        // snapshot on previous value
        const previousBoardList = queryClient.getQueryData('boards')
        // Optimistically update to the new value
        queryClient.setQueryData('boards', old => ({...old, id: newBoard}))

        id = null
        // Return a context object with the snapshotted value
        return {previousBoardList}
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, context) => {
        queryClient.setQueryData('boards', context.previousTodos)
      },
      ...mutationConfig,
    },
  )
}

/**
 * Delete board with key from db
 * @param {string} boardKey
 */
const deleteBoard = async boardKey => {
  const uid = getUser().uid
  await boardsRef.child(uid).child(boardKey).remove()
}

/**
 * Update board title or color
 * @param {string} boardKey unique board key
 * @param {string} title updated title | color
 */
const updateBoard = async (boardKey, title) => {
  const uid = getUser().uid
  await boardsRef
    .child(uid)
    .child(boardKey)
    .update({
      ...title,
    })
}

function useGetBoardsOnce() {
  const {uid} = useAuthContext()

  return useQuery({
    queryKey: 'boards',
    queryFn: () =>
      boardsRef
        .child(uid)
        .once('value')
        .then(snapshot => snapshot.val()),
    select: data => mergeDataWithKey(data),
  })
}

export {
  createUser,
  onceGetUsers,
  deleteBoard,
  updateBoard,
  useGetBoardsOnce,
  useCreateBoard,
}
