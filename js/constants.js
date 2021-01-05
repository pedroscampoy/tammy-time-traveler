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
  timeTravel: true,
  exterior: true,
  inventory: [
    { timeClock: true },
    { triloFossil: true },
    { triloClean: true }
  ],
  isTalking: false,
  minigame: false
}
