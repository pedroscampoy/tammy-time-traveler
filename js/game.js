class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1000
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')

    this.fps = 1000 / 60
    this.drawInterval = undefined

    this.slider = document.getElementById("time-travel")

    this.background = new Background(this.ctx, './img/present_bg.png')
    this.tammy = new Tammy(this.ctx, 20, this.canvas.height - 100)
    this.doorPastLeft = new Door(this.ctx, 30, this.canvas.height - 150)

    this.setEra()
    this.draw()


  }

  setEra() {

    if (this.slider.value <= 33) {
      this.background = new Background(this.ctx, './img/past_bg.png')
    } else if (this.slider.value > 33 && this.slider.value <= 66) {
      this.background = new Background(this.ctx, './img/present_bg.png')
    } else {
      this.background = new Background(this.ctx, './img/future_bg.png')
    }
  }

  travelTime() {
    if ((this.slider.value >= 5 && this.slider.value <= 47.5) || (this.slider.value >= 52.5 && this.slider.value <= 95)) {
      this.background.shake()
    }
  }

  start() {
    if (!this.drawInterval) {
      this.drawInterval = setInterval(() => {
        this.clear()
        this.move()
        this.checkCollisions()
        this.draw()
        this.setEra()
        this.travelTime()
      }, this.fps);
    }
  }

  pause() {
    clearInterval(this.drawInterval)
  }

  clear() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)
  }

  draw() {
    this.background.draw()
    this.doorPastLeft.draw()
    this.tammy.draw()
  }

  move() {
    this.tammy.move()
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.doorPastLeft.onKeyEvent(event)
    //this.background.onKeyEvent(event)
  }

  checkCollisions() {
    //map collision with doors and return door while changing state to activated
    //const restCoins = this.coins.filter(coin => !this.tammy.collidesWith(coin))
    if (this.tammy.collidesWith(this.doorPastLeft)) {
      this.doorPastLeft.activated = true;

    } else {
      this.doorPastLeft.activated = false;
    }
  }
}
