class BackgroundElement {
  constructor(ctx, x, y, imgChar, speed = 4) {
    this.ctx = ctx

    this.x = x
    this.y = y

    this.initialFrame = (Math.random() >= 0.5) ? 1 : 0;

    this.speed = speed
    this.vx = 0

    this.minX = -400
    this.maxX = this.ctx.canvas.width + 400

    this.sprite = new Image()
    this.sprite.src = imgChar
    this.sprite.isReady = false
    this.sprite.horizontalFrames = 2
    this.sprite.verticalFrames = 2
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 0
    this.sprite.drawCount = 0
    this.sprite.onload = () => {
      this.sprite.isReady = true
      this.sprite.frameWidth = Math.floor(this.sprite.width / this.sprite.horizontalFrames)
      this.sprite.frameHeight = Math.floor(this.sprite.height / this.sprite.verticalFrames)
      this.width = this.sprite.frameWidth
      this.height = this.sprite.frameHeight
    }

    this.movements = {
      right: true,
      left: false
    }
  }

  isReady() {
    return this.sprite.isReady
  }

  draw() {
    if (this.isReady()) {
      this.ctx.drawImage(
        this.sprite,
        this.sprite.horizontalFrameIndex * this.sprite.frameWidth,
        this.sprite.verticalFrameIndex * this.sprite.frameHeight,
        this.sprite.frameWidth,
        this.sprite.frameHeight,
        this.x,
        this.y,
        this.width,
        this.height
      )
      this.sprite.drawCount++
      this.animate()
    }
  }

  animate() {
    if (this.movements.right) {
      this.sprite.verticalFrameIndex = 0
    }
    else if (this.movements.left) {
      this.sprite.verticalFrameIndex = 1
    }

    if (this.sprite.drawCount % MOVEMENT_FRAMES === 0) {
      if (this.sprite.horizontalFrameIndex >= this.sprite.horizontalFrames - 1) {
        this.sprite.horizontalFrameIndex = 0
      } else {
        this.sprite.horizontalFrameIndex++
      }
      this.sprite.drawCount = this.initialFrame
    }
  }

  move() {
    if (this.movements.right) {
      this.vx = this.speed
    } else if (this.movements.left) {
      this.vx = -this.speed
    } else {
      this.vx = 0
    }

    if (this.x > this.maxX) {
      this.movements.right = false
      this.movements.left = true
    } else if (this.x < this.minX) {
      this.movements.right = true
      this.movements.left = false
    }

    this.x += this.vx
  }



  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }

}