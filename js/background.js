class Background {
  constructor(ctx, sourceImg) {
    this.ctx = ctx
    this.sourceImg = sourceImg

    this.x = 0
    this.y = 0
    this.h = this.ctx.canvas.height
    this.w = this.ctx.canvas.width

    this.vx = -2

    this.img = new Image()
    this.img.src = this.sourceImg
    this.img.isReady = false
    this.img.onload = () => {
      this.img.isReady = true
    }

    this.shakeInterval = undefined

    this.state = {
      shaking: false,
    }

    this.movements = {
      right: false
    }
  }

  isReady() {
    return this.img.isReady
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.img,
        this.x,
        this.y,
        this.w,
        this.h
      )
    }
  }

  clear() {
    console.log('clear bg')
    this.ctx.clearRect(0, 0, this.w, this.h)
  }
  preShake() {
    this.ctx.save();
    const dx = Math.random() * 10;
    const dy = Math.random() * 10;
    this.ctx.translate(dx, dy);
  }

  postShake() {
    this.ctx.restore();
  }
  shake() {
    if (!this.shakeInterval) {
      this.shakeInterval = setInterval(() => {
        this.preShake();
        this.draw()
        this.postShake()
        if (!this.state.shaking) {
          clearInterval(this.shakeInterval)
        }
      }, SHAKEFPS);
    }
  }

  unshake() {
    clearInterval(this.shakeInterval)
  }

}