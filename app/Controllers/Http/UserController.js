"use strict";

const User = use("App/Models/User");

class UserController {
  async index({ view }) {
    return view.render("users.index");
  }

  async store({ request, response, session }) {
    return response.redirect("back");
  }
}

module.exports = UserController;
