'use strict'
 const Role = use('Adonis/Acl/Role')
/** @typedef {import('@adonisjs/framework/src/Request')} Request */
/** @typedef {import('@adonisjs/framework/src/Response')} Response */
/** @typedef {import('@adonisjs/framework/src/View')} View */

/**
 * Resourceful controller for interacting with teams
 */
class TeamController {
  /**
   * Show a list of all teams.
   * GET teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async index({ auth }) {
    const teams = await auth.user.teams().fetch()

    return teams

  }

  /**
   * Render a form to be used for creating a new team.
   * GET teams/create
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */


  /**
   * Create/save a new team.
   * POST teams
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async store({ request, auth }) {
    const data = request.only(['name'])

    const team = await auth.user.teams().create({
      ...data,
      user_id: auth.user.id,
    })
    
    const admin = await Role.findBy('slug', 'administrator')
    const teamJoin = await auth.user.teamJoins().where('team_id', team.id).first()

    await teamJoin.roles().attach([admin.id])

    return team
  }

  /**
   * Display a single team.
   * GET teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */
  async show({ params, auth }) {
    const team = await auth.user
    .teams()
    .where('teams.id', params.id)
    .first()

    return team
  }

  /**
   * Render a form to update an existing team.
   * GET teams/:id/edit
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   * @param {View} ctx.view
   */

  /**
   * Update team details.
   * PUT or PATCH teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async update({ params, request, auth }) {
    const data =  request.only(['name'])
    const team = await auth.user
    .teams()
    .where('teams.id',params.id)
    .first()

    team.merge(data)
    await team.save()

    return team
  }

  /**
   * Delete a team with id.
   * DELETE teams/:id
   *
   * @param {object} ctx
   * @param {Request} ctx.request
   * @param {Response} ctx.response
   */
  async destroy({ params, auth }) {
    const team = await auth.user
    .teams()
    .where('teams.id',params.id)
    .first()
    await team.delete()

  }
}

module.exports = TeamController
