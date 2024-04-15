import * as THREE from 'three';
import { createScrollCamera } from './camera.js';
import { GxObjs } from './meshes.js';

// Youtube tutorial for next steps : https://www.youtube.com/watch?v=cD-4vHTiUyw

export function createLookScrollScene(){
    // Initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createScrollCamera(gameWindow);
    const gxObjs = GxObjs();

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    function initialize(){

        scene.clear();

        const testCube = gxObjs.cube(new THREE.Vector3(1, 4, 1));
        scene.add(testCube);

        setupLights();
    }

    function update(){
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

    function onScroll(event){
        camera.onWheel(event);
    }

    return{
        initialize,
        update,
        start,
        stop,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onScroll
    }
}