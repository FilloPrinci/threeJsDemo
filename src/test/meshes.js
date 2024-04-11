import * as THREE from 'three';

export function GxObjs (){

    const colors = {
        red: 0xff0000,
        yellow: 0xffff00,
        green: 0x00ff00,
        cyan:0x00ffff,
        blue: 0x0000ff
    }

    function cube(size, color){
        var geometrySize = undefined;
        if(size){
            geometrySize = new THREE.Vector3(size.x, size.y, size.z);
        }else{
            geometrySize = new THREE.Vector3(1, 1, 1);
        }

        var meshColor = undefined;
        if(color){
            meshColor = color;
        }else{
            meshColor = colors.cyan;
        }

        const geometry = new THREE.BoxGeometry(geometrySize.x, geometrySize.y, geometrySize.z);
        const material = new THREE.MeshLambertMaterial({color: meshColor});
        const mesh = new THREE.Mesh(geometry, material);

        return mesh;
    }

    return{
        cube
    }
}