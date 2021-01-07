class Character {
  constructor(name, ctx, x, y, imgChar, verticalFrames = 2, horizontalFrames = 4, defaultframe = 0) {
    this.name = name
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
    this.sprite.horizontalFrames = horizontalFrames
    this.sprite.verticalFrames = verticalFrames
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = defaultframe
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
      this.ctx.save()
      this.ctx.shadowOffsetX = 5;
      this.ctx.shadowOffsetY = 5;
      this.ctx.shadowColor = "rgba(94, 44, 8, 0.3)";
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
      this.ctx.restore()
      this.sprite.drawCount++
      this.animate(MOVEMENT_FRAMES)
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
      case KEY_SPACE:
        this.spaced = status
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

  animate(movementsFrame) {
    if (this.isJumping && this.movements.up) {
      this.animateJump()
    } else if (this.movements.right || this.movements.left) {
      this.animateSprite(movementsFrame)
    } else {
      this.animateSprite(movementsFrame + 10)
    }
  }

  resetAnimation() {
    this.sprite.horizontalFrameIndex = 0
    this.sprite.verticalFrameIndex = 0
  }

  animateJump() {
    //this.sprite.verticalFrameIndex = 0
    this.sprite.horizontalFrameIndex = 2
  }

  animateSprite(mocementsFrames) {
    if (this.movements.right) {
      this.sprite.verticalFrameIndex = 0
    }
    else if (this.movements.left) {
      this.sprite.verticalFrameIndex = 1
    }
    if (this.sprite.drawCount % mocementsFrames === 0) {
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


  async speak(text) {

    const printPhrase = async (text) => {
      return new Promise((resolve, reject) => {
        const faceImafeTag = `<img src="${this.sprite.src}" alt="">`
        FACEDIV.innerHTML = faceImafeTag
        setTimeout(
          () => {
            DIALOG.innerHTML = text
            resolve()
          },
          10)
      })
    }

    const clearDialog = async () => {
      return new Promise((resolve, reject) => {
        setTimeout(
          () => {
            DIALOG.innerHTML = ""
            FACEDIV.innerHTML = ""
            resolve()
          },
          100)
      })
    }

    const waitingKeypress = () => {
      return new Promise((resolve) => {
        document.addEventListener('keydown', onKeyHandler);
        function onKeyHandler(e) {
          if (e.code === 'Space') {
            document.removeEventListener('keydown', onKeyHandler);
            resolve();
          }
        }
      });
    }

    let firstIndex = 0
    let lastSpacedIndex = 0
    let phrase = ""
    for (let index = 0; index < text.length; index++) {
      if (text[index] === " ") {
        lastSpacedIndex = index
      }
      if ((index + 10) % 280 === 0) {
        phrase = text.slice(firstIndex, lastSpacedIndex)
        await printPhrase(phrase)
        firstIndex = lastSpacedIndex
        await waitingKeypress();
      } else {
        phrase = text.slice(firstIndex, index + 1)
      }
      await printPhrase(phrase)
    }

    await waitingKeypress();
    await clearDialog()
  }

  follow(character, distance) {
    if (this.movements.up && !this.isJumping && state.exterior) {
      this.isJumping = true
      this.vy = -6
    } else if (this.isJumping) {
      this.vy += GRAVITY
    }

    if (this.movements.right) {
      this.vx = SPEED
      this.x = character.x - distance
    } else if (this.movements.left) {
      this.vx = -SPEED
      this.x = character.x + distance
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

}



