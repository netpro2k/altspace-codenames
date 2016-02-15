import { combineReducers } from 'redux'
import gameReducer from './game.js'

const rootReducer = combineReducers({
  game: gameReducer
})

export default rootReducer
