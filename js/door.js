class Door {
  constructor(ctx, x, y) {
    this.ctx = ctx

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
        this.enterHouse()
      default:
        break;
    }
  }

  enterHouse() {
    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/House_LP.png')


    if (!this.DrawHouseInterval && this.movements.up === true && this.activated === true) {
      this.DrawHouseInterval = setInterval(() => {
        this.background.draw()
        this.tammy.draw()
        this.tammy.move()
      }, FPS);
    }

  }



}