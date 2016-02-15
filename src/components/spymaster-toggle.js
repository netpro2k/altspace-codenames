import React from 'react'

export default class SpymasterToggle extends React.Component {
  constructor(props) {
    super(props)
  }

  componentDidMount() {
    this.refs.mesh.addEventListener('cursorup', this.handleClick.bind(this))
  }

  handleClick() {
    this.props.onClick()
  }

  render() {
    const {position, team} = this.props
    const color = team === 'R' ? 0xff5555 : 0x5555ff

    return (
      <mesh ref='mesh' position={position}>
        <sphereGeometry
          radius={40}
          widthSegments={32}
          heightSegments={32}/>
        <meshBasicMaterial color={color}/>
      </mesh>
    )
  }
}
