const KEY_UP = 38
const KEY_RIGHT = 39
const KEY_LEFT = 37
const KEY_SPACE = 32

const FPS = 1000 / 60
const MOVEMENT_FRAMES = 10
const SPEED = 4
const SHAKEFPS = 100
const GRAVITY = 0.2

const SLIDER = document.getElementById("time-travel")

const FACEDIV = document.getElementById('faceDiv')
const DIALOG = document.getElementById('dialog')
const INVENTORY = document.getElementsByClassName('item')

const state = {
  era: 'present',
  timeTravel: false,
  exterior: true,
  inventory: [
    { timeClock: false },
    { triloEmpty: false },
    { triloFossil: false },
    { triloClean: false },
    { tintBottle: true }
  ],
  isTalking: false,
  minigame: false,
  minigame1: false,
  minigame2: false,
  timeClock: false,
  triloFossil: false,
  triloClean: false,
  triloAlive: false,
  sardinesEaten: false,
  oilEaten: false
}
