import { createScene } from "./scene.js";
import { createTestScene } from "./test/test_scene.js";
import { createCity } from "./city/city.js";
import { createLookScrollScene } from "./look_scroll/look_scroll_scene.js";


export function createTestGame(){
  const scene = createTestScene();
  scene.initialize();

  window.scene = scene;

  document.addEventListener("wheel", window.scene.onScroll, false);
  document.addEventListener("mousedown", window.scene.onMouseDown, false);
  document.addEventListener("mouseup", window.scene.onMouseUp, false);
  document.addEventListener("mousemove", window.scene.onMouseMove, false);

  document.onScroll = (event) =>{
    console.log('onScroll');
    window.scene.onScroll(event);
  }

  const game = {
    update(){
      scene.update();
    }
  }

  window.scene.start();

  return game;
}

export function createLookScrollGame(){
  const scene = createLookScrollScene();
  scene.initialize();

  window.scene = scene;

  document.addEventListener("wheel", window.scene.onScroll, false);
  document.addEventListener("mousedown", window.scene.onMouseDown, false);
  document.addEventListener("mouseup", window.scene.onMouseUp, false);
  document.addEventListener("mousemove", window.scene.onMouseMove, false);

  document.onScroll = (event) =>{
    console.log('onScroll');
    window.scene.onScroll(event);
  }

  const game = {
    update(){
      scene.update();
    }
  }

  window.scene.start();

  return game;
}

export function createSimCityGame() {
  const scene = createScene();
  const city = createCity(32);

  scene.initialize(city);

  window.scene = scene;
  document.addEventListener("mousedown", window.scene.onMouseDown, false);
  document.addEventListener("mouseup", window.scene.onMouseUp, false);
  document.addEventListener("mousemove", window.scene.onMouseMove, false);

    const game = {
        update() {
            city.update();
            scene.update(city);
        }
    }

    setInterval(() => {
        game.update();
    }, 1000)

  window.scene.start();

  return game;
}
