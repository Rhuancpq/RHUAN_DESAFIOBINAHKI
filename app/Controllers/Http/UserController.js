'use strict'

class UserController {
    const User = use('app/Models/User');

    async index({view}){
        return view.render("users.index");
    }

    async store({request, response, session}){
        return response.redirect('back')
    }
}

module.exports = UserController
