class Character {
  constructor(ctx, x, y, imgChar) {
    this.ctx = ctx

    this.x = x
    this.minX = 0
    this.maxX = this.ctx.canvas.width - 80
    this.vx = 0

    this.y = y
    this.maxY = y
    this.vy = 0

    this.width = 0
    this.height = 0

    this.talkInterval = undefined

    this.sprite = new Image()
    this.sprite.src = imgChar
    this.sprite.isReady = false
    this.sprite.horizontalFrames = 4
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
      up: false,
      right: false,
      left: false
    }

    this.isJumping = false
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

  onKeyEvent(event) {
    const status = event.type === 'keydown'
    switch (event.keyCode) {
      case KEY_UP:
        this.movements.up = status
        break;
      case KEY_RIGHT:
        this.movements.right = status
        break;
      case KEY_LEFT:
        this.movements.left = status
        break;
      default:
        break;
    }
  }

  move() {
    if (this.movements.up && !this.isJumping && state.exterior) {
      this.isJumping = true
      this.vy = -6
    } else if (this.isJumping) {
      this.vy += GRAVITY
    }

    if (this.movements.right) {
      this.vx = SPEED
    } else if (this.movements.left) {
      this.vx = -SPEED
    } else {
      this.vx = 0
    }

    this.x += this.vx
    this.y += this.vy

    if (this.x >= this.maxX) {
      this.x = this.maxX
    } else if (this.x <= this.minX) {
      this.x = this.minX
    }

    if (this.y >= this.maxY) {
      this.isJumping = false
      this.y = this.maxY
      this.vy = 0
    }
  }

  animate() {
    if (this.isJumping && this.movements.up) {
      this.animateJump()
    } else if (this.movements.right || this.movements.left) {
      this.animateSprite()
    }
  }

  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0
    //this.sprite.verticalFrameIndex = 0
  }

  animateJump() {
    //this.sprite.verticalFrameIndex = 0
    this.sprite.horizontalFrameIndex = 2
  }

  animateSprite() {
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
      this.sprite.drawCount = 0
    }
  }

  collidesWith(element) {
    return this.x < element.x + element.width &&
      this.x + this.width > element.x &&
      this.y < element.y + element.height &&
      this.y + this.height > element.y
  }

  speak(text) {
    const textList = text.split(' ')
    const step = 45
    let prevIndex = 0
    let nextIndex = prevIndex + step
    const dialogList = []

    for (let index = 0; index < textList.length; index += step) {
      dialogList.push(textList.slice(prevIndex, nextIndex).join(" "));
      prevIndex += step
      nextIndex += step
    }

    const dialogListSplit = dialogList.map(phrase => phrase.split(""))

    dialogListSplit[0].forEach((letter, i) => {
      setTimeout(() => {
        DIALOG.innerHTML += letter
      }, i * 10);
    });

    const faceImafeTag = `<img src="${this.sprite.src}" alt="">`

    FACEDIV.innerHTML = faceImafeTag
  }

}