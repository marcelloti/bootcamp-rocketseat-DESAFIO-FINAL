import * as Yup from 'yup';
import { Op } from 'sequelize';
import { subDays, startOfDay, endOfDay } from 'date-fns';
import Student from '../models/Student';
import Checkin from '../models/Checkin';

class CheckinController {
  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const checkins = await Checkin.findAll({
      where: { student_id: id },
      order: ['created_at'],
      attributes: ['id', 'created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    if (!checkins) {
      return res.status(404).json({ error: 'Checkin does not exists' });
    }

    return res.json(checkins);
  }

  async store(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number()
        .positive()
        .integer()
        .required(),
    });

    const { id } = req.params;

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const studentExists = await Student.findByPk(id);
    if (!studentExists) {
      return res.status(400).json({ error: `Student ${id} did not exists` });
    }

    const startDate = subDays(new Date(), 7);

    const checkins = await Checkin.findAll({
      where: {
        student_id: id,
        created_at: {
          [Op.between]: [startOfDay(startDate), endOfDay(new Date())],
        },
      },
      order: ['created_at'],
      attributes: ['created_at'],
      include: [
        {
          model: Student,
          as: 'student',
          attributes: ['name'],
        },
      ],
    });

    if (checkins.length >= 5) {
      return res.status(400).json({ error: 'Too much checkins in 7 days' });
    }

    const checkin = await Checkin.create({
      student_id: id,
    });

    return res.json(checkin);
  }
}

export default new CheckinController();
