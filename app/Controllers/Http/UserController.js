"use strict";

const User = use("App/Models/User");
const Mail = use("Mail");
const { validate } = use("Validator");

class UserController {
  async index({ view }) {
    return view.render("users.index");
  }

  async store({ request, response, session }) {
    const rules = {
      nome: "required|max:100",
      email: "required|email|unique:users,email|max:254",
      empresa: "required|max:200",
      outracritica: "required_when:critica,4",
    };

    const validation = await validate(request.all(), rules);

    if (validation.fails()) {
      const messages = {
        "email.unique": "E-mail já utilizado",
        "email.email": "E-mail inválido",
        "outracritica.required_when":
          'Escolha a opção anterior como sendo "outra"',
      };
      session.withErrors(messages).flashAll();

      return response.redirect("back");
    }

    const data = request.only([
      "nome",
      "email",
      "empresa",
      "critica",
      "outracritica",
    ]);

    const user = new User();

    user.nome = data.nome;
    user.email = data.email;
    user.empresa = data.empresa;
    user.critica = data.critica;
    user.outracritica = data.outracritica;

    await user.save();

    await Mail.send("users.download", data, (message) => {
      message.from("no-reply@desafio.binahki.com");
      message.replyTo("no-reply@desafio.binahki.com");
      message.to(data.email.toString(), data.nome);
      message.subject("E-book Binahki");
    });

    return response.redirect("back");
  }
}

module.exports = UserController;
