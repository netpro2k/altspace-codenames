import React from 'react'
import {Route, IndexRoute} from 'react-router'

import Lobby from './components/lobby.js'
import Game from './components/game.js'

const routes = (
<Route path='/codenames'>
	<IndexRoute component={Lobby} />
	<Route path='/codenames/:seed' component={Game} />
</Route>
)

export default routes
