class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1000
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')

    this.drawInterval = undefined

    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
    //MAIN CHARACTERS
    this.tammy = new Character(this.ctx, 150, this.canvas.height - 100, './img/tammy.png')
    this.trilo = new Character(this.ctx, 150 - 60, this.canvas.height - 110, './img/trilo.png')
    //SIDE CHARACTERS
    this.babyjosephilus = new Character(this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.5), './img/babyjosephilus.png', 1)
    this.youngjosephilus = new Character(this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.7), './img/youngjosephilus.png', 1)
    this.oldjosephilus = new Character(this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.7), './img/oldjosephilus.png', 1)

    this.sideCharacters = [this.babyjosephilus, this.youngjosephilus, this.oldjosephilus]

    this.presentHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LP.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RP.png', this.youngjosephilus)]
    this.pastHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LPast.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RPast.png', this.babyjosephilus)]
    this.futureHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LF.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RF.png', this.oldjosephilus)]

    this.houses = this.presentHouses

    this.setEra()
    this.draw()
    this.tammy.speak("El cangrejo herradura del Atlántico o cangrejo cacerola (Limulus polyphemus) es una especie de quelicerado de la clase Merostomata. Llega a alcanzar 60 cm de largo y 30 cm de ancho. A pesar de su nombre, esta especie está más próxima a las arañas y escorpiones (arácnidos), que a los cangrejos (crustáceos) con los que no guarda ninguna relación. Habita en las zonas costeras y los estuarios fluviales.")

    this.oldjosephilus.speak('HELLO NAUTI')



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
    this.trilo.follow(this.tammy, 60)
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.trilo.onKeyEvent(event)
    this.houses.forEach(house => house.onKeyEvent(event))
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
