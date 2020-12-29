class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1000
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')

    this.drawInterval = undefined

    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
    this.tammy = new Character(this.ctx, 150, this.canvas.height - 100, './img/tammy.png')
    this.trilo = new Character(this.ctx, 80, this.canvas.height - 100, './img/trilo.png')

    this.presentHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LP.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RP.png')]
    this.pastHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LPast.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RPast.png')]
    this.futureHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LF.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RF.png')]

    this.houses = this.presentHouses

    this.setEra()
    this.draw()
    this.tammy.speak("Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged.It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.")



  }

  setEra() {

    if (SLIDER.value <= 33) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/past_bg.png')
      this.houses = this.pastHouses
    } else if (SLIDER.value > 33 && SLIDER.value <= 66) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
      this.houses = this.presentHouses
    } else {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/future_bg.png')
      this.houses = this.futureHouses
    }
  }

  travelTime() {
    if ((SLIDER.value >= 5 && SLIDER.value <= 47.5) || (SLIDER.value >= 52.5 && SLIDER.value <= 95)) {
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
          this.updateState()
          this.updateInventory()
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
    this.trilo.draw()
  }

  move() {
    this.tammy.move()
    this.trilo.move()
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.trilo.onKeyEvent(event)
    this.houses.forEach(house => house.onKeyEvent(event))
    //this.background.onKeyEvent(event)
  }

  updateState() {
    state.timeTravel === true ? SLIDER.disabled = false : SLIDER.disabled = true
  }

  checkCollisions() {
    //map collision with doors and return door while changing state to activated
    this.houses.forEach(house => {
      if (this.tammy.collidesWith(house)) {
        house.activated = true;
        this.tammy.isJumping = true
        if (house.movements.up === true && house.activated === true) {
          house.enterHouse()
          state.timeTravel = false
        }
      } else {
        house.activated = false;
        state.timeTravel = true
      }
    })
  }

  updateInventory() {
    this.presentObjects = state.inventory.filter(item => Object.values(item)[0] === true)
    this.classObjects = this.presentObjects.map(object => Object.keys(object)[0])
    this.newClassObject = [...INVENTORY].forEach(
      (item, index) => {
        if (this.classObjects[index]) {
          item.classList = `item ${this.classObjects[index]}`
        }
      }
    );
  }
}
