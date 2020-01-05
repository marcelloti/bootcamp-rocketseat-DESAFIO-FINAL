import * as Yup from 'yup';
import Student from '../models/Student';
import Enrolment from '../models/Enrolment';

class SessionStudentController {
  async show(req, res) {
    const schema = Yup.object().shape({
      id: Yup.number().required(),
    });

    if (!(await schema.isValid(req.params))) {
      return res.status(400).json({ error: 'Validation fails' });
    }

    const { id } = req.params;

    const student = await Student.findByPk(id, {
      attributes: ['id'],
    });

    if (!student) {
      return res.status(400).json({ error: 'O estudante não existe' });
    }

    const enrolments = await Enrolment.findAll({
      include: ['plan', 'student'],
      where: {
        student_id: id,
      },
    });

    const activeEnrolments = enrolments.filter(enrolment => {
      return enrolment.active;
    });

    if (activeEnrolments.length === 0) {
      return res
        .status(400)
        .json({ error: 'Não existe matrícula ativa para este estudante' });
    }

    return res.json(student);
  }
}
export default new SessionStudentController();
