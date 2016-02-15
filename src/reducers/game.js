import _ from 'lodash'

import {CREATE_GAME, UPDATE_GAME, FLIP_CARD, ROWS, COLS, CARD_TYPES} from '../actions/index.js'
import seededshuffle from 'seededshuffle'

const newGame = (seed) => {
  const startingTeam = seededshuffle.shuffle([CARD_TYPES.RED, CARD_TYPES.BLUE], seed)[0]
  const cardIds = _.take(seededshuffle.shuffle(_.range(69), seed), ROWS * COLS)
  const cardTypes = seededshuffle.shuffle((
    _.repeat(CARD_TYPES.RED, startingTeam === CARD_TYPES.RED ? 9 : 8) +
    _.repeat(CARD_TYPES.BLUE, startingTeam === CARD_TYPES.BLUE ? 9 : 8) +
    _.repeat(CARD_TYPES.INNOCENT, 7) +
    CARD_TYPES.ASSASSIN
  ).split(''), seed)

  return {
    seed,
    startingTeam,
    cards: cardIds.map((id, i) => {
      return {
        id,
        flipped: false,
        type: cardTypes[i]
      }
    })
  }
}

const cardReducer = (state = [], action) => {
  switch (action.type) {
    case FLIP_CARD:
      return action.payload === state.id ? {
        ...state,
        flipped: !state.flipped
      } : state
  }

  return state
}

const cardsReducer = (state = [], action) => {
  switch (action.type) {
    case FLIP_CARD:
      return state.map(card => cardReducer(card, action))
  }

  return state
}

export default (state = {}, action) => {
  console.log(state, action)
  switch (action.type) {
    case CREATE_GAME:
      return newGame(action.payload)
    case UPDATE_GAME:
      return action.payload
    case FLIP_CARD:
      return {
        ...state,
        cards: cardsReducer(state.cards, action)
      }
  }
  return state
}
