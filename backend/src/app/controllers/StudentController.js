import * as Yup from 'yup';
import Sequelize from 'sequelize';
import Student from '../models/Student';

class StudentController {
  async index(req, res) {
    const schema = Yup.object().shape({
      q: Yup.string(),
    });

    if (!(await schema.isValid(req.query))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { q } = req.query;
    if (q) {
      const { Op } = Sequelize;

      Student.findAll({
        where: { name: { [Op.like]: `%${q}%` } },
      }).then(students => res.json(students));
    } else {
      Student.findAll().then(students => res.json(students));
    }
  }

  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exists' });
    }

    const { name, email, age, weight, height } = student;

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails...' });
    }

    const studentExists = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });

    if (studentExists) {
      return res.status(400).json({ error: 'Student already exists' });
    }

    const { id, name, email, age, weight, height } = await Student.create(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async update(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
      name: Yup.string().required(),
      email: Yup.string()
        .email()
        .required(),
      age: Yup.number().required(),
      weight: Yup.number().required(),
      height: Yup.number().required(),
    });

    if (!(await schema.isValid(req.body))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findOne({
      where: {
        id: req.body.id,
      },
    });

    if (!studentExists) {
      return res.status(404).json({ error: 'Student does not exists' });
    }

    const { id, name, email, age, weight, height } = await studentExists.update(
      req.body
    );

    return res.json({
      id,
      name,
      email,
      age,
      weight,
      height,
    });
  }

  async delete(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id);

    if (!student) {
      return res.status(404).json({ error: 'Student does not exists' });
    }

    const { name, email, age, weight, height } = student;
    await student.destroy();

    return res.status(200).json({
      message: 'User removed',
      old_data: {
        id,
        name,
        email,
        age,
        weight,
        height,
      },
    });
  }
}

export default new StudentController();
