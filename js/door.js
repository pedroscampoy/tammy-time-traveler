class Door {
  constructor(ctx, x, y) {
    this.ctx = ctx

    this.x = x
    this.y = y

    this.height = 100
    this.width = 50

    this.activated = false

    this.movements = {
      up: false
    }
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
    const status = event.type === 'keydown'
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status
        console.log("ENTER DOOR")
      default:
        break;
    }
  }



}