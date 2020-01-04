import * as Yup from 'yup';
import User from '../models/User';

class UserController {
  async index(req, res) {
    User.findAll({
      attributes: ['id', 'name', 'email'],
    }).then(users => res.json(users));
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const user = await User.findByPk(id);

    if (!user) {
      return res.status(404).json({ error: 'User does not exists' });
    }

    const { name, email } = user;

    return res.json({
      id,
      name,
      email,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      password: Yup.string()
        .min(6)
        .required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const userExists = await User.findOne({ where: { email: req.body.email } });

    if (userExists) {
      return res.status(400).json({ error: 'This email is already taken' });
    }

    const { name, email, password_hash } = await User.create(req.body);

    return res.json({ name, email, password_hash });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string(),
      email: Yup.string().email(),
      old_password: Yup.string().min(6),
      password: Yup.string().when('old_password', (old_password, field) =>
        old_password ? field.required() : field
      ),
      confirm_password: Yup.string().when('password', (password, field) =>
        password ? field.required().oneOf([Yup.ref('password')]) : field
      ),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { old_password } = req.body;

    if (req.body.email) {
      const userExists = await User.findOne({
        where: { email: req.body.email },
      });

      if (userExists) {
        return res
          .status(400)
          .json({ error: 'This email was already registered' });
      }
    }
    if (old_password === null || typeof old_password === 'undefined') {
      return res.status(401).json({ error: 'Old password is null' });
    }

    const user = await User.findByPk(req.body.user_id);

    if (!user) {
      return res.status(404).json({ error: 'User does not exists' });
    }

    if (!(await user.checkPassword(old_password))) {
      return res.status(401).json({ error: 'Old password does not match' });
    }

    const { id, name, email } = await user.update(req.body);

    return res.json({ id, name, email });
  }

  async delete(req, res) {
    const { id } = req.params;

    const userExists = await User.findByPk(id);

    if (!userExists) {
      return res.status(400).json({ error: `User ${id} did not exists` });
    }

    const { name, email } = userExists;
    await userExists.destroy();

    return res.json({
      id,
      name,
      email,
    });
  }
}

export default new UserController();
