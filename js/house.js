class House {
  constructor(ctx, x, y, imgBg) {
    this.ctx = ctx

    this.imgBg = imgBg

    this.x = x
    this.y = y

    this.height = 100
    this.width = 50

    this.activated = false

    this.DrawHouseInterval = undefined

    this.movements = {
      up: false
    }

    this.tammy = new Tammy(this.ctx, this.ctx.canvas.height / 2, this.ctx.canvas.height / 2, 'M')

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
          this.tammy.draw()
          this.tammy.move()
          this.checkExit(this.tammy)
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

  reStartGame(game) {
    game.start()
  }

}


