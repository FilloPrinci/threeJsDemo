import * as THREE from 'three';

export function createScrollCamera(gameWindow){

    const LEFT_MOUSE_BUTTON = 0;
    const MIDDLE_MOUSE_BUTTON = 1;
    const RIGHT_MOUSE_BUTTON = 2;

    const CAMERA_MAX_HIGH = 2;
    const CAMERA_MIN_HIGH = 0;

    const Y_AXIS = new THREE.Vector3(0, 1, 0);
    const camera = new THREE.PerspectiveCamera(75, gameWindow.offsetWidth / gameWindow.offsetHeight, 0.1, 1000);
    let isLeftMouseDown = false;
    let isMiddleMouseDown = false;
    let isRightMouseDown = false;
    camera.position.set(10, 2, 10);
    camera.rotation.set(0, 0, 0);
    updateCameraPosition();

    function onMouseDown(event){
        console.log('mouseDown');

        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = true;
        }

        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = true;
        }

        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = true;
        }
        
    }

    function onMouseUp(event){
        console.log('mouseUp');
        if(event.button === LEFT_MOUSE_BUTTON){
            isLeftMouseDown = false;
        }

        if(event.button === MIDDLE_MOUSE_BUTTON){
            isMiddleMouseDown = false;
        }

        if(event.button === RIGHT_MOUSE_BUTTON){
            isRightMouseDown = false;
        }
    }

    function onWheel(event){
        console.log('onWhell');
        const direction = -event.deltaY;

        const offsetY = direction * 0.005; 

        var newPosition = new THREE.Vector3(camera.position.x, camera.position.y + offsetY, camera.position.z);

        if(newPosition.y >CAMERA_MIN_HIGH && newPosition.y < CAMERA_MAX_HIGH){
            camera.position.set(camera.position.x, camera.position.y + offsetY, camera.position.z);
        }

        
        updateCameraPosition();
    }

    function onMouseMove(event){
        /*
        console.log('onMouseMove');
        
        const deltaX = event.clientX -prevMouseX;
        const deltaY = event.clientY -prevMouseY;

        // Handles the rotation of the camera
        if(isLeftMouseDown){
            cameraAzimuth += -(deltaX * ROTATION_SENSITIVITY);
            cameraElevation += (deltaY * ROTATION_SENSITIVITY);
            cameraElevation = Math.min(MAX_CAMERA_ELEVATION, Math.max(MIN_CAMERA_ELEVATION, cameraElevation));
            updateCameraPosition();
        }


        // Handles the panning of the camera
        if(isMiddleMouseDown){
            const forward = new THREE.Vector3(0, 0, 1).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            const left = new THREE.Vector3(1, 0, 0).applyAxisAngle(Y_AXIS, cameraAzimuth * DEG2RAD);
            cameraOrigin.add(forward.multiplyScalar(PAN_SENSITIVITY * deltaY));
            cameraOrigin.add(left.multiplyScalar(PAN_SENSITIVITY * deltaX));
            updateCameraPosition();
        }


        // Handles the zoom of the camera
        if(isRightMouseDown){
            cameraRadius += deltaY * ZOOM_SENSITIVITY;
            cameraRadius = Math.min(MAX_CAMERA_RADIUS, Math.max(MIN_CAMERA_RADIUS, cameraRadius));
            updateCameraPosition();
        }

        prevMouseX = event.clientX;
        prevMouseY = event.clientY;
        */
    }

    function updateCameraPosition(){
        /*
        camera.position.x = cameraRadius * Math.sin(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.y = cameraRadius * Math.sin(cameraElevation * DEG2RAD);
        camera.position.z = cameraRadius * Math.cos(cameraAzimuth * DEG2RAD) * Math.cos(cameraElevation * DEG2RAD);
        camera.position.add(cameraOrigin);
        */
        //camera.lookAt(cameraOrigin);
        camera.updateMatrix();
    }

    return{
        camera,
        onMouseDown,
        onMouseUp,
        onMouseMove,
        onWheel
    }
}