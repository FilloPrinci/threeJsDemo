import * as THREE from 'three';
import { createCamera } from '../camera.js';
import { GxObjs } from './meshes.js';

// Youtube tutorial for next steps : https://www.youtube.com/watch?v=cD-4vHTiUyw

export function createTestScene(){
    // Initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);
    const gxObjs = GxObjs();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    function initialize(){

        scene.clear();

        const testCube = gxObjs.cube(new THREE.Vector3(4, 4, 4));
        scene.add(testCube);

        setupLights();
    }

    function update(){
    }

    function cube(size, color){
        geometrySize : undefined;
        if(size){
            geometrySize : size;
        }else{
            geometrySize : THREE.Vector3(1, 1, 1);
        }

        const geometry = new THREE.BoxGeometry(1, 1, 1);
        const material = new THREE.MeshLambertMaterial({color: color});
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    function setupLights(){
        const lights = [
            new THREE.AmbientLight(0xffffff, 0.2),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
            new THREE.DirectionalLight(0xffffff, 0.3),
        ];

        lights[1].position.set(0, 1, 0);
        lights[2].position.set(1, 1, 0);
        lights[3].position.set(0, 1, 1);

        // ... is used when adding array objects all in once
        scene.add(...lights);
    }

    function draw(){
        renderer.render(scene, camera.camera);
    }

    function start(){
        renderer.setAnimationLoop(draw);
    }

    function stop(){
        renderer.setAnimationLoop(null);
    }

    function onMouseDown(event){
        camera.onMouseDown(event);
    }

    function onMouseUp(event){
        camera.onMouseUp(event);
    }

    function onMouseMove(event){
        camera.onMouseMove(event);
    }



    return{
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove
    }
}