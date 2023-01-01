import './style.css'
import * as dog from "./sprite-animations/dogAnimation.js";

const dropdown = document.getElementById('animations')
const canvas =document.getElementById('canvas1');
const ctx = canvas.getContext('2d');
const CANVAS_WIDTH = canvas.width = 600;
const CANVAS_HEIGHT = canvas.height = 600;

const playerImage = new Image();
playerImage.src = '/shadow_dog.png'
const spriteWidth = 575;
const spriteHeight = 523;

let gameFrame = 0;
let staggerFrames = 5;
let spriteAnimations = [];
let playerState = 'roll';

dropdown.addEventListener('change', (e) => {
    console.log('Change', e.target.value)
    playerState = e.target.value
})

dog.states.forEach((state,index) => {
    let frames = {
        loc: [],
    }
    for(let i = 0; i < state.frames; i++){
        let positionX = i * spriteWidth;
        let positionY = index * spriteHeight
        frames.loc.push({x: positionX, y: positionY})
    }
    spriteAnimations[state.name] = frames;
})
function animate(){
    ctx.clearRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    let position= Math.floor(gameFrame/staggerFrames) % spriteAnimations[playerState].loc.length;
    let frameX = spriteAnimations[playerState].loc[position].x;
    let frameY = spriteAnimations[playerState].loc[position].y;

    ctx.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight);
    gameFrame++;
    requestAnimationFrame(animate);
}

animate();
