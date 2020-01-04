import Sequelize, { Model } from 'sequelize';
import bcrypt from 'bcryptjs';

class User extends Model {
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
        password: Sequelize.VIRTUAL,
        password_hash: Sequelize.STRING,
      },
      {
        sequelize,
      }
    );

    // Before save
    this.addHook('beforeSave', async user => {
      // If a password has been sent, encrypt this password
      if (user.password) {
        user.password_hash = await bcrypt.hash(user.password, 8);
      }
    });

    return this;
  }

  /*
   * Function that checks if the password is valid
   */
  checkPassword(password) {
    return bcrypt.compare(password, this.password_hash);
  }
}

export default User;
