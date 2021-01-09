class House {
  constructor(ctx, x, y, imgBg, owner) {
    this.ctx = ctx

    this.imgBg = imgBg
    this.owner = owner

    this.x = x
    this.y = y

    this.height = 90
    this.width = 50

    this.activated = false

    this.DrawHouseInterval = undefined

    this.movements = {
      up: false
    }

    this.tammy = new Character('tammy', this.ctx, this.ctx.canvas.height / 2, this.ctx.canvas.height / 2, './img/tammy_8_M.png', 2, 8, 0)
    this.trilo = new Character('trilo', this.ctx, this.ctx.canvas.height / 2 - 70, 100, './img/trilo_M.png')

    this.story = new Story(this.tammy, this.trilo, this.owner)

  }

  draw() {
    if (state.triloBig) {
      this.trilo.sprite.src = './img/triloBig_M.png'
      this.trilo.sprite.horizontalFrames = 6
    }
    this.ctx.save()
    //this.ctx.fillStyle = 'rgba(0,0,0,0)'
    //this.ctx.strokeRect(this.x, this.y, this.width, this.height)

    if (this.activated) {
      this.drawTriangle()
    }


    this.ctx.restore()
  }

  drawTriangle() {
    this.ctx.save()
    this.ctx.fillStyle = 'white'
    this.ctx.beginPath()
    this.ctx.moveTo(this.x, this.y);
    this.ctx.lineTo(this.x + this.width, this.y);
    this.ctx.lineTo(this.x + this.width / 2, this.y + this.height / 2);
    this.ctx.lineTo(this.x, this.y)
    this.ctx.fill()
    this.ctx.restore()
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.trilo.onKeyEvent(event)
    const status = event.type === 'keydown'
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status
      default:
        break;
    }
  }

  enterHouse() {
    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, this.imgBg)
    if (!this.DrawHouseInterval && this.activated && this.movements.up) {
      state.exterior = false
      this.DrawHouseInterval = setInterval(() => {
        if (!state.exterior) {
          this.background.draw()
          this.tammy.draw()
          this.tammy.move()
          if (state.triloAlive) {
            this.trilo.draw()
            this.trilo.follow(this.tammy, 70)
          }

          if (this.owner) {
            this.owner.draw()
          }
          this.checkExit(this.tammy)
          this.checkColition()
          this.updateInventory()
          SLIDER.disabled = true
        } else {
          this.pause()
        }
      }, FPS);
    }

  }

  pause() {
    clearInterval(this.DrawHouseInterval)
    this.DrawHouseInterval = undefined
  }

  checkExit(object) {
    if (object.x <= 0) {
      state.exterior = true
      this.tammy.x = 100
      this.pause()
    }
  }

  updateInventory() {
    this.presentObjects = state.inventory.filter(item => Object.values(item)[0] === true)
    this.classObjects = this.presentObjects.map(object => Object.keys(object)[0])
    this.newClassObject = [...INVENTORY].forEach(
      (item, index) => {
        if (this.classObjects[index]) {
          item.classList = `item ${this.classObjects[index]}`
        } else {
          item.classList = `item`
        }
      }
    );
  }

  checkColition() {
    if (this.tammy.collidesWith(this.owner) && !state.isTalking) {
      state.isTalking = true
      if (this.owner.name == 'oldjosephilus' &&
        !state.timeClock &&
        !state.triloFossil &&
        state.era === 'future') {
        state.isTalking = true
        this.story.dialog1()
      } else if (this.owner.name == 'oldjosephilus' &&
        state.oilEaten) {
        state.isTalking = true
        this.story.dialogCongrats()
      } else if (this.owner.name === 'youngjosephilus' &&
        state.timeClock &&
        state.triloFossil &&
        state.era === 'present') {
        state.isTalking = true
        this.story.dialog2()
      } else if (this.owner.name === 'vampiresquid' &&
        state.timeClock &&
        !state.triloFossil &&
        state.era === 'present') {
        state.isTalking = true
        this.story.dialog3()
      } else if (this.owner.name === 'black') {
        state.isTalking = true
        this.story.dialogBlack()
      } else if (this.owner.name === 'babyjosephilus') {
        state.isTalking = true
        this.story.dialogBaby()
      }
      else {
        state.isTalking = true
        this.story.dialograndom()
      }
    }
    else {
      // let dilaogTimeout = setTimeout(
      //   () => {
      //     state.isTalking = false
      //     if (state.isTalking === false) {
      //       clearTimeout(dilaogTimeout)
      //     }
      //   },
      //   5000)
    }
  }
}


/*/const waitSpeak = new Promise((resolve) => setTimeout(resolve, 1000));
const printAll = async () => {
await this.owner.speak('HELLO')
//await waitSpeak
}
if (this.tammy.collidesWith(this.owner) && !state.isTalking) {
printAll()
state.isTalking = true
} else {
let dilaogTimeout = setTimeout(
() => {
state.isTalking = false
if (state.isTalking === false) {
clearTimeout(dilaogTimeout)
}
},
10000)
}*/






