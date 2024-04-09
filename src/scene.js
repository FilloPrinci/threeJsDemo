import * as THREE from 'three';
import { createCamera } from './camera.js';

// Youtube tutorial for next steps : https://www.youtube.com/watch?v=cD-4vHTiUyw

export function createScene(){
    // Initial scene setup
    const gameWindow = document.getElementById('render-target');
    const scene = new THREE.Scene();
    scene.background = new THREE.Color(0x777777);

    const camera = createCamera(gameWindow);

    const renderer = new THREE.WebGLRenderer();
    renderer.setSize(gameWindow.offsetWidth, gameWindow.offsetHeight);
    gameWindow.appendChild(renderer.domElement);

    let terrain = [];
    let buildings = [];

    function initialize(city){

        scene.clear();
        terrain = [];
        buildings = [];
        for(let x = 0; x < city.size; x++){
            const column = [];
            for(let y = 0; y < city.size; y++){
                // 1. load the mesh/3D object corresponding to the tile at (x,y)
                // 2. add that mesh to the scene
                // 3. add that mesh to the meshes array

                // Grass geometry
                const geometry = new THREE.BoxGeometry(1, 1, 1);
                const material = new THREE.MeshLambertMaterial({color: 0x00aa00});
                const mesh = new THREE.Mesh(geometry, material);
                mesh.position.set(x, -0.5, y);
                scene.add(mesh);
                column.push(mesh);
            }
            terrain.push(column);
            // adding a column with undefined values long as city size
            buildings.push([...Array(city.size)])
        }

        setupLights();
    }

    function update(city){
        for(let x = 0; x < city.size; x++){
            for(let y = 0; y < city.size; y++){

                // Building geometry
                const tile = city.data[x][y];

                if(tile.building && tile.building.startsWith('building')){
                    const height = Number(tile.building.slice(-1));
                    const buildingGeometry = new THREE.BoxGeometry(1, height, 1);
                    const buildingMaterial = new THREE.MeshLambertMaterial({color: 0x777777});
                    const buildigMesh = new THREE.Mesh(buildingGeometry, buildingMaterial);
                    buildigMesh.position.set(x, height / 2, y);

                    if(buildings[x][y]){
                        scene.remove(buildings[x][y]);
                    }

                    scene.add(buildigMesh);
                    buildings[x][y] = buildigMesh;
                }
            }
        }
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