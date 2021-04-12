import {useMutation, useQueries, useQuery, useQueryClient} from 'react-query'

import {useAuthContext} from 'context/auth-context'

import {mergeDataWithKey} from 'utils'
import {db} from './firebase'

const boardsRef = db.ref('boards')
const listsRef = db.ref('lists')
const cardsRef = db.ref('cards')

function useCreateStoreUser() {
  return useMutation(({uid, email, username}) =>
    db.ref(`users/${uid}`).set({
      username,
      email,
    }),
  )
}

const onceGetUsers = () => db.ref('users').once('value')

function useCreateBoard(mutationConfig = {}) {
  const queryClient = useQueryClient()
  const {uid} = useAuthContext()
  const id = boardsRef.push().key

  return useMutation(
    async board => {
      return boardsRef.child(uid).child(id).set(board)
    },
    {
      // optimistic updates
      onMutate: newBoard => {
        // snapshot of previous value
        const previousBoardList = queryClient.getQueryData('boards')
        // Optimistically update to the new value
        queryClient.setQueryData('boards', old => ({...old, [id]: newBoard}))

        // Return a context object with the snapshotted value
        return {previousBoardList}
      },
      // If the mutation fails, use the context returned from onMutate to roll back
      onError: (err, newTodo, {previousBoardList}) => {
        queryClient.setQueryData('boards', previousBoardList)
      },
      ...mutationConfig,
    },
  )
}

function useDeleteBoard(mutationConfig = {}) {
  const {uid} = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation(
    boardKey => boardsRef.child(uid).child(boardKey).remove(),
    {
      onMutate: boardKey => {
        const oldBoards = queryClient.getQueryData('boards')

        queryClient.setQueryData('boards', currentData => {
          const tempData = {...currentData}
          delete tempData[boardKey]
          return tempData
        })

        return {oldBoards}
      },

      onError: (_, __, {oldBoards}) =>
        queryClient.setQueryData('boards', oldBoards),
      ...mutationConfig,
    },
  )
}

function useUpdateBoardField(mutationConfig = {}) {
  const {uid} = useAuthContext()
  const queryClient = useQueryClient()

  return useMutation(
    ({boardKey, ...data}) =>
      boardsRef
        .child(uid)
        .child(boardKey)
        .update({
          ...data,
        }),
    {
      onMutate: ({boardKey, ...data}) => {
        const oldData = queryClient.getQueryData('boards')

        queryClient.setQueryData('boards', currentData => ({
          ...currentData,
          [boardKey]: {...data},
        }))

        return {oldData}
      },
      onError: (_, __, {oldData}) => {
        queryClient.setQueryData('boards', oldData)
      },
      ...mutationConfig,
    },
  )
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

// get board data and lists with boardId
function useBoardData(key) {
  const {uid} = useAuthContext()

  return useQueries([
    {
      queryKey: ['board', key],
      queryFn: () => {
        return boardsRef
          .child(uid)
          .child(`${key}`)
          .once('value')
          .then(data => data.val())
      },
    },
    {
      queryKey: ['lists', key],
      staleTime: Infinity,
      queryFn: () => {
        return listsRef
          .child(key)
          .once('value')
          .then(data => data.val())
          .then(data => mergeDataWithKey(data))
      },
    },
  ])
}

function useCreateList(mutationConfig) {
  const queryClient = useQueryClient()

  return useMutation(
    async ({boardKey, ...list}) => {
      const id = listsRef.push().key
      return listsRef.child(boardKey).child(id).set(list)
    },
    {
      onMutate: ({boardKey, ...list}) => {
        queryClient.invalidateQueries(['lists', boardKey])
      },
      ...mutationConfig,
    },
  )
}

function useHandleCreateCard(mutationConfig = {}) {
  const queryClient = useQueryClient()

  return useMutation(
    ({listKey, ...cardData}) => db.ref(`cards/${listKey}`).push({...cardData}),
    {
      // optimistic fake update, for better ux
      onMutate: ({listKey, ...data}) => {
        const previousBoardList = queryClient.getQueryData(['cards', listKey])

        queryClient.setQueryData(['cards', listKey], old => ({
          ...old,
          //  for user we would show instantly with temp key of string id,
          id: data,
        }))

        return {previousBoardList}
      },
      onError: (_, {listKey}, {previousBoardList}) => {
        queryClient.setQueryData(['cards', listKey], previousBoardList)
      },
      onSuccess: (successData, {listKey}) => {
        //* on success we replace the 'id' key with real key, better ux and no need to recall the api also
        queryClient.setQueryData(['cards', listKey], ({id, ...old}) => ({
          ...old,
          [successData.key]: {...id},
        }))
        // queryClient.invalidateQueries(['cards'], listKey)
      },
    },
  )
}

function useGetCardOnce(listKey, queryConfig = {}) {
  return useQuery({
    queryKey: ['cards', listKey],
    staleTime: Infinity,
    queryFn: () =>
      db
        .ref(`cards/${listKey}`)
        .once('value')
        .then(data => data.val())
        .then(data => mergeDataWithKey(data)),
    ...queryConfig,
  })
}

function useDeleteCard() {
  const queryClient = useQueryClient()

  return useMutation(
    ({listKey, cardKey}) =>
      db.ref(`cards/${listKey}/`).child(`${cardKey}`).remove(),
    {
      onMutate: ({listKey, cardKey}) => {
        const oldData = queryClient.getQueryData(['cards', listKey])

        queryClient.setQueryData(['cards', listKey], data => {
          return data.filter(card => card.key !== cardKey)
        })

        return {oldData}
      },
      onError: (_, {listKey}, {oldData}) =>
        queryClient.setQueryData(['cards', listKey], oldData),
    },
  )
}

function useDeleteList() {
  const queryClient = useQueryClient()

  return useMutation(
    ({boardKey, listKey}) =>
      db
        .ref(`lists/${boardKey}`)
        .child(`${listKey}`)
        .remove()
        .then(() => db.ref('cards/').child(`${listKey}`).remove()),
    {
      onMutate: ({listKey, boardKey}) => {
        const oldList = queryClient.getQueryData(['lists', boardKey])

        queryClient.setQueryData(['lists', boardKey], old =>
          old.filter(list => list.key !== listKey),
        )

        return {oldList}
      },
      onError(_, {boardKey}, {oldList}) {
        queryClient.setQueryData(['lists', boardKey], oldList)
      },
    },
  )
}

function useUpdateList() {
  const queryClient = useQueryClient()

  return useMutation(
    ({boardKey, listKey, ...list}) =>
      listsRef
        .child(boardKey)
        .child(listKey)
        .update({
          ...list,
        }),
    {
      onMutate: ({boardKey, listKey, ...newListData}) => {
        const oldData = queryClient.getQueryData(['lists', boardKey])

        queryClient.setQueryData(['lists', boardKey], old =>
          old.map(list =>
            list.key === listKey ? {...list, ...newListData} : list,
          ),
        )

        return {oldData}
      },
      onError: (_, {boardKey}, {oldData}) => {
        queryClient.setQueryData(['lists', boardKey], oldData)
      },
    },
  )
}

function useEditCard(mutationConfig = {}) {
  const queryClient = useQueryClient()

  return useMutation(
    ({listKey, cardKey, ...card}) =>
      cardsRef.child(listKey).child(cardKey).update(card),
    {
      onMutate: ({listKey, cardKey, ...updatedCardData}) => {
        const oldCard = queryClient.getQueryData(['cards', listKey])

        queryClient.setQueryData(['cards', listKey], cards => {
          return cards.map(card =>
            card.key === cardKey ? {...card, ...updatedCardData} : card,
          )
        })

        return {oldCard}
      },
      onError: (_, {listKey}, {oldCard}) =>
        queryClient.setQueryData(['cards', listKey], oldCard),
      ...mutationConfig,
    },
  )
}

export {
  onceGetUsers,
  useCreateStoreUser,
  useUpdateBoardField,
  useGetBoardsOnce,
  useCreateBoard,
  useDeleteBoard,
  useBoardData,
  useCreateList,
  useGetCardOnce,
  useHandleCreateCard,
  useDeleteCard,
  useDeleteList,
  useUpdateList,
  useEditCard,
}
