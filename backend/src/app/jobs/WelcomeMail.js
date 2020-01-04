import Mail from '../../lib/Mail';

class WelcomeMail {
  get key() {
    return 'WelcomeMail';
  }

  async handle({ data }) {
    const {
      studentName,
      studentEmail,
      start_date,
      end_date,
      planTitle,
      price,
    } = data;

    await Mail.sendMail({
      to: `${studentName} <${studentEmail}>`,
      subject: 'Matrícula registrada',
      template: 'enrolment',
      context: {
        studentName,
        start_date,
        end_date,
        planTitle,
        price,
      },
    });
  }
}

export default new WelcomeMail();
