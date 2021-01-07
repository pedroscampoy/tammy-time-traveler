class Minigame {
  constructor(ctx, imgBg, catcherImg, backgroundElements) {
    this.ctx = ctx

    this.rect = this.ctx.canvas.getBoundingClientRect();

    this.imgBg = imgBg
    this.catcherImg = catcherImg

    this.x = this.ctx.canvas.width / 2
    this.y = this.ctx.canvas.height / 2

    this.lastX = this.ctx.canvas.width / 2
    this.lastY = this.ctx.canvas.width / 2

    this.bges = backgroundElements

    this.width = 0
    this.height = 0

    this.img = new Image()
    this.img.src = this.catcherImg
    this.img.isReady = false

    this.img.onload = () => {
      this.img.isReady = true
      this.width = this.img.width
      this.height = this.img.height
    }

    //document.addEventListener('mousemove', this.updateCoordinates);
  }

  isReady() {
    return this.img.isReady
  }

  draw() {

    document.addEventListener('mousemove', (event) => {
      this.x = event.clientX - this.rect.left - (this.img.width / 4)
      this.y = event.clientY - this.rect.top - (this.img.height / 4)
    });

    this.background.draw()
    this.bges.map(bge => bge.draw())
    if (this.isReady()) {
      this.ctx.save()
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.width / 4,
        this.height / 4
      )
      this.ctx.restore()
    }
  }

  move() {
    this.bges.map(bge => bge.move())
  }


  start() {
    this.background = new Background(this.ctx, this.ctx.canvas.width, this.ctx.canvas.height, this.imgBg)
    if (!this.DrawMinigameInterval && state.minigame) {
      state.exterior = false
      this.DrawMinigameInterval = setInterval(() => {
        if (state.minigame) {
          this.checkCollisions()
          this.move()
          this.draw()
        } else {
          this.pause()
        }
      }, FPS);
    }
  }

  pause() {
    clearInterval(this.DrawMinigameInterval)
    this.DrawMinigameInterval = undefined
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }

  checkCollisions() {
    this.bges.map(bge => {
      if (this.collidesWith(bge)) {
        this.width += (1 / this.bges.length * 100)
        this.height += (1 / this.bges.length * 100)
      }
    })
    this.bges = this.bges.filter(bge => !this.collidesWith(bge))
    if (this.bges.length === 0) {
      state.minigame = false
      state.exterior = true
      //this.pause()
    }
  }

}