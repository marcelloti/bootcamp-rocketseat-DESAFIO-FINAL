import Sequelize, { Model } from 'sequelize';

class Student extends Model {
  static init(sequelize) {
    /* Using here "super.init". This says that
       the init method of the parent class "Model"
       will be called. Here are declared only the
       columns that will be filled with some data
       manually (columns like createAt, PKs and
       etc do not need to be declared)
    */
    super.init(
      {
        name: Sequelize.STRING,
        email: Sequelize.STRING,
        age: Sequelize.INTEGER,
        weight: Sequelize.FLOAT,
        height: Sequelize.FLOAT,
      },
      {
        sequelize,
      }
    );

    return this;
  }
}

export default Student;
