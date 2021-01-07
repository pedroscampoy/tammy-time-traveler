class Story {
  constructor(tammy, trilo, owner) {
    this.tammy = tammy
    this.trilo = trilo
    this.owner = owner
    //this.babyjosephilus = babyjosephilus

  }
  dialog1() {
    const dialog = async () => {
      await this.owner.speak('Hello Tammy')
      await this.tammy.speak("Hello Josephylus")
      await this.owner.speak("Thanks for comming") // Its important
      //never though I would be the one giving you this, but this is a time traveling machine
      //I'm giving you thos because I know you are the one
      //Visit Character so she an give you the fossil and will give you details about its propeties
      await clocktrue()
    }

    const clocktrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'timeClock') {
            console.log(item.timeClock)
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
      await this.tammy.speak("Hello Josephylus")
      await this.owner.speak("Thanks for comming") // Its important
      //never though I would be the one giving you this, but this is a time traveling machine
      //I'm giving you thos because I know you are the one
      //Visit Character so she an give you the fossil and will give you details about its propeties
      await dirtyFossilTrue()
    }

    const dirtyFossilTrue = () => {
      return new Promise((resolve) => {
        state.inventory.forEach(item => {
          if (Object.keys(item)[0] === 'triloFossil') {
            console.log(item.triloFossil)
            item.triloFossil = true
            state.triloFossil = true
          }
        })
        resolve();
      });
    }
    dialog()
  }
}


