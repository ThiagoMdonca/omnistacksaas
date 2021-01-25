'use strict'

class Invite {
  get validateAll(){
    return true
  }

  get rules () {
    return {
      // validation rules
      invites: 'required|array',
      'invites.*': 'required|email'
    }
  }
}

module.exports = Invite
