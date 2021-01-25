'use strict'

class Project {
  get validateAll(){
    return true
  }

  get rules () {
    return {
      // validation rules
      title: 'required'
    }
  }
}

module.exports = Project
