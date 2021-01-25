'use strict'

class Team {
  get validateAll(){
    return true
  }

  get rules () {
    return {
      // validation rules
      name: 'required'
    }
  }
}

module.exports = Team
