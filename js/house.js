class House {
  constructor(ctx, x, y, imgBg, owner) {
    this.ctx = ctx

    this.imgBg = imgBg
    this.owner = owner

    this.x = x
    this.y = y

    this.height = 100
    this.width = 50

    this.activated = false

    this.DrawHouseInterval = undefined

    this.movements = {
      up: false
    }

    this.tammy = new Character(this.ctx, this.ctx.canvas.height / 2, this.ctx.canvas.height / 2, './img/tammy_8_M.png', 2, 8, 0)
    this.trilo = new Character(this.ctx, this.ctx.canvas.height / 2 - 70, this.ctx.canvas.height / 2, './img/trilo_M.png')
  }

  draw() {
    this.ctx.save()
    this.ctx.fillStyle = 'rgba(0,0,0,0)'
    this.ctx.strokeRect(this.x, this.y, this.width, this.height)

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
    if (!this.DrawHouseInterval && this.activated === true && this.movements.up === true) {
      state.exterior = false
      this.DrawHouseInterval = setInterval(() => {
        if (!state.exterior) {
          this.background.draw()
          if (this.owner) {
            this.owner.draw()
          }
          this.tammy.draw()
          this.tammy.move()
          this.trilo.draw()
          this.trilo.follow(this.tammy, 70)
          this.checkExit(this.tammy)
          this.checkColition()
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

  checkColition() {
    const waitSpeak = new Promise((resolve) => setTimeout(resolve, 1000));
    const printAll = async () => {
      await this.owner.speak('HELLO ALVAROTO')
      await waitSpeak
    }
    if (this.tammy.collidesWith(this.owner) && !state.isTalking) {
      console.log(state.isTalking)
      printAll()
      state.isTalking = true
    } else {
      setTimeout(
        () => {
          state.isTalking = false
        },
        5000)
    }

  }
}




