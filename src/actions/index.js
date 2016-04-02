import altspace from 'altspace'

export const CARD_TYPES = {
  INNOCENT: 'I',
  RED: 'R',
  BLUE: 'B',
  ASSASSIN: 'A'
}

export const ROWS = 5
export const COLS = 5

const getSync = (seed) => {
  return altspace.utilities.sync.getInstance({
    appId: 'codenames',
    authorId: 'netpro2k',
    instanceId: seed
  })
}

export const UPDATE_GAME = 'UPDATE_GAME'
export const updateGame = (state) => {
  return {
    type: UPDATE_GAME,
    payload: state
  }
}

export const CREATE_GAME = 'CREATE_GAME'
export const createGame = (state) => {
  return {
    type: CREATE_GAME,
    payload: state
  }
}

export const startOrJoinGame = (seed) => {
  return (dispatch, getState) => {
    const sync = getSync(seed)
    sync.on('value', (data) => {
      if (data.val()) {
        dispatch(updateGame(data.val()))
      } else {
        dispatch(createGame(seed))
        sync.set(getState().game)
      }
    })
  }
}

export const FLIP_CARD = 'FLIP_CARD'
export const flipCard = (id) => {
  return (dispatch, getState) => {
    const sync = getSync(getState().game.seed)
    dispatch({
      type: FLIP_CARD,
      payload: id
    })
    sync.set(getState().game)
  }
}
