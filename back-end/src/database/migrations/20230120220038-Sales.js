'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
  
     await queryInterface.createTable('sales', { 
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },

      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      seller_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "users",
          key: "id",
        },
        onDelete: "CASCADE",
      },

      total_price: {
        type: Sequelize.DECIMAL(9.2),
        allowNull: false,
      },
      delivery_address: {
        type: Sequelize.STRING(100),
        allowNull: false,
      },

      delivery_number: {
        type: Sequelize.STRING(50),
        allowNull: false,
      },

      sale_date: {
        type: Sequelize.DATE,
        allowNull: false,
      },

      status: {
        type: Sequelize.STRING(50),
        allowNull: false,
        defaultValue: 'Pendente',
      }
    });
  },

  async down (queryInterface, Sequelize) {
  
     await queryInterface.dropTable('sales');
     
  }
};
