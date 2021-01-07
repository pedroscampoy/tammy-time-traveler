
class Game {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId)
    this.canvas.width = 1000
    this.canvas.height = 400
    this.ctx = this.canvas.getContext('2d')

    this.drawInterval = undefined

    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/future_bg.png')
    //MAIN CHARACTERS
    this.tammy = new Character('tammy', this.ctx, 150, this.canvas.height - 100, './img/tammy_8.png', 2, 8)
    this.trilo = new Character('trilo', this.ctx, 150 - 60, this.canvas.height - 110, './img/trilo.png')
    //SIDE CHARACTERS
    this.babyjosephilus = new Character('babyjosephilus', this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.5), './img/babyjosephilus.png', 2, 4, 1)
    this.youngjosephilus = new Character('youngjosephilus', this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.7), './img/youngjosephilus.png', 2, 4, 1)
    this.oldjosephilus = new Character('oldjosephilus', this.ctx, (this.canvas.width - this.canvas.width * 0.3), this.canvas.height - (this.canvas.height * 0.7), './img/oldjosephilus.png', 2, 4, 1)

    this.sideCharacters = [this.babyjosephilus, this.youngjosephilus, this.oldjosephilus]

    this.presentHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LP.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RP.png', this.youngjosephilus)]
    this.pastHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LPast.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RPast.png', this.babyjosephilus)]
    this.futureHouses = [new House(this.ctx, 30, this.canvas.height - 150, './img/House_LF.png'), new House(this.ctx, 500, this.canvas.height - 150, './img/House_RF.png', this.oldjosephilus)]

    this.houses = this.futureHouses

    const getRandomInt = (min, max) => {
      min = Math.ceil(min);
      max = Math.floor(max);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    this.sardines = [
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png'),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1),
      new BackgroundElement(this.ctx, getRandomInt(this.ctx.canvas.width / 2, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/sardine.png', 4.1)
    ]

    this.coelacanth = [
      new BackgroundElement(this.ctx, getRandomInt(-100, this.ctx.canvas.width), getRandomInt(-40, this.ctx.canvas.height / 2), './img/coelacanth.png', 0.5, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-100, this.ctx.canvas.width), getRandomInt(0, this.ctx.canvas.height / 2), './img/coelacanth.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-100, this.ctx.canvas.width), getRandomInt(-40, this.ctx.canvas.height / 2), './img/coelacanth.png', 0.3, 1, 2, 'left')
    ]

    this.oil = [
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.8, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 0.7, 1, 2, 'left'),
      new BackgroundElement(this.ctx, getRandomInt(-1000, this.ctx.canvas.width + 500), getRandomInt(-200, this.ctx.canvas.height / 2), './img/oil_.png', 1, 1, 2, 'left')
    ]

    this.minimage1 = new Minigame(this.ctx, './img/past_bg.png', './img/trilo_up.png', this.sardines)
    this.minimage2 = new Minigame(this.ctx, './img/future_bg.png', './img/trilo_up.png', this.oil)


    this.setEra()
    this.draw()

    //setTimeout(() => state.minigame = true, 4000)

    this.story = new Story(this.tammy, this.trilo, this.oldjosephilus, this.babyjosephilus)

    //this.story.dialog1()

  }

  setEra() {

    if (SLIDER.value <= 33) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/past_bg.png')
      this.houses = this.pastHouses
      this.backgroundElements = this.coelacanth
    } else if (SLIDER.value > 33 && SLIDER.value <= 66) {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/present_bg.png')
      this.houses = this.presentHouses
      this.backgroundElements = this.sardines
    } else {
      this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, './img/future_bg.png')
      this.houses = this.futureHouses
      this.backgroundElements = this.oil
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
    this.backgroundElements.map(bge => bge.draw())
  }

  move() {
    this.tammy.move()
    this.trilo.follow(this.tammy, 60)
    this.backgroundElements.map(bge => bge.move())
  }

  onKeyEvent(event) {
    this.tammy.onKeyEvent(event)
    this.trilo.onKeyEvent(event)
    this.houses.forEach(house => house.onKeyEvent(event))
  }

  updateState() {
    state.timeTravel ? SLIDER.disabled = false : SLIDER.disabled = true
    if (state.minigame) {
      this.minimage2.start()
    } else {
      state.minigame = false
    }
  }

  checkCollisions() {
    //map collision with doors and return door while changing state to activated
    this.houses.forEach(house => {
      if (this.tammy.collidesWith(house)) {
        house.activated = true;
        this.tammy.isJumping = true
        if (house.movements.up && house.activated) {
          house.enterHouse()
          state.timeTravel = false
        }
      } else {
        house.activated = false;
        if (state.timeClock) {
          state.timeTravel = true
        }
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
        } else {
          item.classList = `item`
        }
      }
    );
  }
}
