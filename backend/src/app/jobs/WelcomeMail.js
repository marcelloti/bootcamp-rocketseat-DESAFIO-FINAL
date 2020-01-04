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

    try {
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
    } catch (err) {
      console.log(err);
    }
  }
}

export default new WelcomeMail();
