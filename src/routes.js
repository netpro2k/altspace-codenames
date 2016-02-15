import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Lobby from './components/lobby.js'
import Game from './components/game.js'

const routes = (
<Route path='/'>
	<IndexRoute component={Lobby} />
	<Route path='/:seed' component={Game} />
</Route>
)

export default routes
