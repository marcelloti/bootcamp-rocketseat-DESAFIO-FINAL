'use strict';

module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'students',
      [
        {
          name: 'Student Example',
          email: 'student@example.com',
          age: 20,
          height: 1.9,
          weight: 80,
          created_at: new Date(),
          updated_at: new Date(),
        }
      ],
      {}
    );
  },

  down: (queryInterface, Sequelize) => {
    const Op = Sequelize.Op
    return queryInterface.bulkDelete('students', {id: {[Op.in]: [1]}}, {})
  },
};
