import React from 'react'

import SpymasterToggle from './spymaster-toggle.js'
import {Vector3} from 'three'

const Table = (props) => {
  const {onToggleSpymaster} = props
  return (
    <group position={props.position}>
      <mesh>
        <boxGeometry
          width={250}
          height={300}
          depth={350}/>
        <meshBasicMaterial>
          <texture url='/img/table.jpg' />
        </meshBasicMaterial>
      </mesh>
      <SpymasterToggle team='R'
        onClick={onToggleSpymaster}
        position={new Vector3(0, 80, 170)} />
      <SpymasterToggle team='B'
        onClick={onToggleSpymaster}
        position={new Vector3(0, 80, -170)} />
    </group>
  )
}

export default Table
