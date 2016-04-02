import React from 'react'
import React3 from 'react-three-renderer'
import {connect} from 'react-redux'

import THREE, {Vector2, Vector3, Euler} from 'three'

const altspace = window.altspace

import Card from './card.js'
import Table from './table.js'

import {ROWS, COLS, startOrJoinGame, flipCard} from '../actions/index.js'


class Game extends React.Component {

  constructor(props, context) {
    super(props, context)
    this.props.startOrJoinGame(props.params.seed)
    this.state = {
      spymaster: false
    }
  }

  componentDidMount() {
    const {camera, scene} = this.refs
    if (altspace && !altspace.inClient && altspace.utilities && altspace.utilities.shims && altspace.utilities.shims.cursor) {
      altspace.utilities.shims.cursor.init(scene, camera)
    }
  }

  _onAnimate() {
    //
  }

  handleCardClicked(card) {
    this.props.flipCard(card.id)
  }

  handleSpymaterToggle() {
    this.setState({
      spymaster: !this.state.spymaster
    })
  }

  render() {
    const width = window.innerWidth
    const height = window.innerHeight

    const ROW_SPACING = 1.7
    const COL_SPACING = 2.5

    const {cards = [], seed} = this.props
    const {spymaster} = this.state

    return (
      <div>
        <React3
          width={width}
          height={height}
          mainCamera='camera'

          onAnimate={this._onAnimate.bind(this)}>
          <resources>
            <texture
              resourceId='card-texture'
              url='/img/cards.jpg'
              crossOrigin='*'
              wrapS={THREE.RepeatWrapping}
              wrapT={THREE.RepeatWrapping}
              anisotropy={16}
              />
          </resources>
          <scene ref='scene'>
            <group
              position={new Vector3(0, 0, 0)}>
              <perspectiveCamera
                name='camera'
                ref='camera'
                fov={75}
                aspect={width / height}
                near={0.1}
                far={1000}

                position={new Vector3(150, 30, 30)}
                lookAt={new Vector3(-80, -200, -100)}
                />
              <group
                scale={new Vector3(20, 20, 20)}
                position={new Vector3(0, -200, 0)}
                lookAt={new Vector3(0, 0, 0)} >
                {cards.map((card, i) => {
                  return <Card spymaster={spymaster} key={card.id} onClick={this.handleCardClicked.bind(this, card)} {...card} position={new Vector3(i % COLS * COL_SPACING, Math.floor(i / ROWS) * ROW_SPACING, 0)}/>
                })}
              </group>
              <Table onToggleSpymaster={this.handleSpymaterToggle.bind(this)} position={new Vector3(-80, -352, -100)}/>
            </group>
          </scene>
        </React3>

      </div>
    )
  }
}

const mapStateToProps = ({game}) => {
  return {...game}
}

export default connect(mapStateToProps, {startOrJoinGame, flipCard})(Game)
