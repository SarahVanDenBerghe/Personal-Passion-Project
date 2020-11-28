import React, { useContext, useEffect, useRef } from 'react';
import { Bauble } from '..';
import axios from 'axios';
import { useFrame } from 'react-three-fiber';
import { MeshWobbleMaterial, useGLTFLoader } from 'drei';
import { VIEWS } from '../../../consts/views';
import { gsap } from 'gsap';
import { useSpring, a } from 'react-spring/three';

const Tree = ({ setBaublePreview, view, setView, baubles, setBaubles }) => {
  const gltf = useGLTFLoader('/pine_tree/scene.gltf', true);
  const mesh = useRef();

  useEffect(() => {
    // useFrame(() => (mesh.current.rotation.x = mesh.current.rotation.y += 0.01));
    // console.log(mesh);
  }, [mesh]);

  const api = axios.create({
    baseURL: `${process.env.REACT_APP_STRAPI_API}/messages`,
  });

  const addBauble = (point) => {
    if (view === VIEWS.edit) {
      api
        .post('', {
          name: 'Default',
          x: point.x,
          y: point.y,
          z: point.z,
        })
        .then((response) => {
          const newBauble = {
            name: response.data.name,
            x: response.data.x,
            y: response.data.y,
            z: response.data.z,
            id: response.data.id,
          };
          setBaubles([...baubles, newBauble]);
          setView(VIEWS.default);
        });
    }
  };

  const showBaublePreview = (point) => {
    // Geeft problemen!!!
    setBaublePreview(
      <Bauble
        preview
        position={[point.x, point.y, point.z]}
        color="blue"
        args={[0.2, 10, 10]}
      />
    );
  };

  return (
    <>
      <a.mesh
        useRef={mesh}
        position={[0, -5, 0]}
        onPointerDown={(e) => addBauble(e.point)}
        onPointerMove={(e) => showBaublePreview(e.point)}
      >
        <primitive object={gltf.scene} dispose={null} />
      </a.mesh>
    </>
  );
};

export default Tree;
