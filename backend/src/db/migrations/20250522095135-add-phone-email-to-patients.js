/** @type {import('sequelize-cli').Migration} */

module.exports = {
  async up(queryInterface, Sequelize) {

    await queryInterface.addColumn('patients', 'phone', {
      type: Sequelize.STRING(50),
      allowNull: true,
    });

    await queryInterface.addColumn('patients', 'email', {
      type: Sequelize.STRING(255),
      allowNull: true,
      validate: {
        isEmail: true,
      },
    });
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.removeColumn('patients', 'phone');
    await queryInterface.removeColumn('patients', 'email');
  }
};
