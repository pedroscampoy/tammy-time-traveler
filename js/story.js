class Story {
  constructor(tammy, trilo, owner) {
    this.tammy = tammy
    this.trilo = trilo
    this.owner = owner
  }

  stopTalking() {
    return new Promise((resolve) => {
      state.isTalking = false
      resolve();
    });
  }

  dialog1() {
    const dialog = async () => {
      await this.owner.speak('Hello Tammy')
      await this.tammy.speak("Hello Joseph")
      await this.owner.speak("Thanks for comming") // Its important
      //never though I would be the one giving you this, but this is a time traveling machine
      //I'm giving you thos because I know you are the one
      //Visit Character so she an give you the fossil and will give you details about its propeties
      await this.owner.speak("Only hope")
      await this.owner.speak("You can use this ⏲️")
      await this.tammy.speak("I'll do my best 💪")
      await clocktrue()
      await this.stopTalking()
    }

    const clocktrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'timeClock') {
            item.timeClock = true
            state.timeClock = true
          }
        })
        resolve();
      });
    }

    dialog()
  }

  dialog2() {
    const dialog = async () => {
      await this.owner.speak('Hello Tammy')
      await this.tammy.speak("Hello young Joseph")
      await this.owner.speak("I see you have a fossil 🦕")
      await this.tammy.speak("I meed it clean so I can revive it")
      await this.owner.speak("That'silly")
      await dirtyFossilTrue()
      await emptyFossilTrue()
      await triloFossilFalse()
      await this.stopTalking()
    }

    const dirtyFossilTrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloClean') {
            item.triloClean = true
            state.triloClean = true
          }
        })
        resolve();
      });
    }
    const emptyFossilTrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloEmpty') {
            item.triloEmpty = true
            state.triloEmpty = true
          }
        })
        resolve();
      });
    }

    const triloFossilFalse = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloFossil') {
            item.triloFossil = false
            state.triloFossil = false
          }
        })
        resolve();
      });
    }

    dialog()

  }

  dialog3() {
    const dialog = async () => {
      await this.owner.speak('Hello Tammy')
      await this.tammy.speak("Hello Vampy")
      await this.owner.speak("Thanks for comming")
      await this.tammy.speak("I know you have a hidden fossil, please give to me, no question !")
      await triloFossilTrue()
      await this.stopTalking()
    }

    const triloFossilTrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloFossil') {
            item.triloFossil = true
            state.triloFossil = true
          }
        })
        resolve();
      });
    }

    dialog()

  }

  dialog4() {
    const dialog = async () => {
      await triloCleanFalse()
      await this.tammy.speak("AWWWW Aren't you a cutie")
      await this.trilo.speak("❤️")
      await this.tammy.speak("Let's give you some food 🐟")
      await this.stopTalking()
    }

    const triloCleanFalse = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloClean') {
            item.triloClean = false
            state.triloClean = false
          }
        })
        resolve();
      });
    }

    dialog()

  }

  dialogBlack() {
    const dialog = async () => {
      await this.owner.speak('😑...')
      await this.stopTalking()
    }
    dialog()
  }

  dialogBaby() {
    const dialog = async () => {
      await this.owner.speak('👶')
      await this.stopTalking()
    }
    dialog()
  }

  dialogCongrats() {
    const dialog = async () => {
      await this.owner.speak('YOU MADE IT TAMMY 👏🏻👏🏻👏🏻')
      await this.stopTalking()
    }
    dialog()
  }

  dialograndom() {
    const dialog = async () => {
      await this.owner.speak('Hello Tammy, you can do it')
      await this.stopTalking()
    }

    dialog()
  }

}
