import React from 'react'
import THREE, {Vector2} from 'three'
import {CARD_TYPES} from '../actions/index.js'

export default class Card extends React.Component {

  constructor(props, context) {
    super(props, context)
  }

  componentDidMount() {
    const TEXTURE_COLS = 10
    const TEXTURE_ROWS = 7

    const x = this.props.id % TEXTURE_COLS
    const y = Math.floor(this.props.id / TEXTURE_COLS) % TEXTURE_ROWS
    const offset = new Vector2(x / TEXTURE_COLS, (TEXTURE_ROWS - 1 - y) / TEXTURE_ROWS)
    const size = new Vector2(1 / TEXTURE_COLS, 1 / TEXTURE_ROWS)

    const uvs = [
      new Vector2(offset.x, offset.y + size.y),
      new Vector2(offset.x, offset.y),
      new Vector2(offset.x + size.x, offset.y + size.y),
      new Vector2(offset.x + size.x, offset.y)
    ]

    // This is a bit of a hack since offset and repeat on Texture dont seem to work inside Altspace
    this.refs.geo.faceVertexUvs = [[
      [uvs[0], uvs[1], uvs[2]],
      [uvs[1], uvs[3], uvs[2]]
    ]]
    this.refs.geo.uvsNeedUpdate = true

    this.refs.mesh.addEventListener('cursorup', this.handleClick.bind(this))
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const {id, position, flipped, type, spymaster} = this.props

    let color
    if (type === CARD_TYPES.INNOCENT) {
      color = 0xeeeeee
    } else if (type === CARD_TYPES.RED) {
      color = 0xff5555
    } else if (type === CARD_TYPES.BLUE) {
      color = 0x5555ff
    } else {
      color = 0x555555
    }

    let mat
    if (!flipped) {
      mat = (
        <meshBasicMaterial key={id + flipped + spymaster} color={spymaster ? color : 0xffffff}>
          <textureResource resourceId='card-texture'/>
        </meshBasicMaterial>
      )
    } else {
      mat = <meshBasicMaterial color={color} />
    }

    return (
      <mesh ref='mesh' position={position}>
        <planeGeometry ref='geo' width={2} height={1.3} />
        {mat}
      </mesh>
    )
  }
}
