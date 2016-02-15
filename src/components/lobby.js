import React from 'react'

export default class Lobby extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      seed: Math.random().toString(36).replace(/[^a-z0-9]+/g, '').substr(1).toUpperCase()
    }
  }

  handleNewGame(e) {
    e.preventDefault()
    window.location.href += '/' + this.state.seed
  }

  handleSeedChange(e) {
    this.setState({
      seed: e.target.value
    })
  }

  render() {
    const {seed} = this.state

    return (<form onSubmit={this.handleNewGame.bind(this)}>
      <input onChange={this.handleSeedChange.bind(this)} type='text' value={seed}/>
      <button>New Game</button>
    </form>)
  }
}
