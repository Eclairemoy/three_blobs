import React, { useRef } from 'react'
import ReactDOM from 'react-dom'
import { extend, Canvas, useFrame, useThree, useRender } from 'react-three-fiber'
import * as THREE from  'three';
import './index.css';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'

extend ({ OrbitControls });

const Controls = () => {
    const orbitRef = useRef();
    const { camera, gl } = useThree();
    
    useRender(() => {
    orbitRef.current.update();
    });
    
    return <orbitControls args={[camera, gl.domElement]} ref={orbitRef} />;
    };

function Orb({initialPosition = [0,0,0]}) {
  const ref = useRef()
//   useFrame(() => (ref.current.rotation.x = ref.current.rotation.y += 0.01))
useFrame(({clock}) => {
    const x = clock.elapsedTime + initialPosition[0];
    return ref.current.translateOnAxis(
        new THREE.Vector3(0, 0.5, 0),
        0.2*Math.cos(x),
    );
})
  return (
    <mesh
      ref={ref}
      onClick={e => console.log('click')}
      onPointerOver={e => console.log('hover')}
      onPointerOut={e => console.log('unhover')}
      position={initialPosition}>
      <sphereBufferGeometry attach="geometry" args={[1, 40, 40]} />
      <meshNormalMaterial attach="material" />
    </mesh>
  )
}

function Gaggle() {
    const orbs = [];
    for (let i = -5; i < 5; i++) {
        orbs.push(<Orb initialPosition={[i, 0, 0]} key={`0axis${i}`}/>)
        orbs.push(<Orb initialPosition={[i, 0, i]} key={i}/>)
        orbs.push(<Orb initialPosition={[i, i, i]} key={`diagonal${i}`}/>)
    }
    console.log(orbs);

    return orbs;
}

ReactDOM.render(
  <Canvas>
    <Gaggle />
    <Controls />
  </Canvas>,
  document.getElementById('root')
)
