class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1000
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')

    this.drawInterval = undefined

    this.slider = document.getElementById("time-travel")

    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
    this.tammy = new Tammy(this.ctx, 100, this.canvas.height - 100, 'S')

    this.presentHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LP.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RP.png')]
    this.pastHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LPast.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RPast.png')]
    this.futureHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LF.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RF.png')]

    this.houses = this.presentHouses

    this.setEra()
    this.draw()


  }

  setEra() {

    if (this.slider.value <= 33) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/past_bg.png')
      this.houses = this.pastHouses
    } else if (this.slider.value > 33 && this.slider.value <= 66) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
      this.houses = this.presentHouses
    } else {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/future_bg.png')
      this.houses = this.futureHouses
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
        if (state.exterior) {
          this.clear()
          this.move()
          this.checkCollisions()
          this.draw()
          this.setEra()
          this.travelTime()
        }
      }, FPS);
    } else {
      this.pause()
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
    this.houses.forEach(house => house.draw())
    this.tammy.draw()
  }

  move() {
    this.tammy.move()
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.houses.forEach(house => house.onKeyEvent(event))
    //this.background.onKeyEvent(event)
  }

  checkCollisions() {
    //map collision with doors and return door while changing state to activated
    this.houses.forEach(house => {
      if (this.tammy.collidesWith(house)) {
        house.activated = true;
        this.tammy.isJumping = true
        if (house.movements.up === true && house.activated === true) {
          house.enterHouse()
        }
      } else {
        house.activated = false;
      }
    })

  }
}
