module.exports = {
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async up(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.createTable(
        'users',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'appointment_rules',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'appointments',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'departments',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'doctor_availabilities',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'holidays',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'imaging_investigations',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'imaging_order_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'imaging_orders',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'insurances',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'invoice_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'invoices',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'lab_order_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'lab_orders',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'lab_tests',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'medications',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'patient_documents',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'patients',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'pharmacy_order_items',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'pharmacy_orders',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'sick_leaves',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'visits',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'roles',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'permissions',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.createTable(
        'organizations',
        {
          id: {
            type: Sequelize.DataTypes.UUID,
            defaultValue: Sequelize.DataTypes.UUIDV4,
            primaryKey: true,
          },
          createdById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          updatedById: {
            type: Sequelize.DataTypes.UUID,
            references: {
              key: 'id',
              model: 'users',
            },
          },
          createdAt: { type: Sequelize.DataTypes.DATE },
          updatedAt: { type: Sequelize.DataTypes.DATE },
          deletedAt: { type: Sequelize.DataTypes.DATE },
          importHash: {
            type: Sequelize.DataTypes.STRING(255),
            allowNull: true,
            unique: true,
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'firstName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'lastName',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'phoneNumber',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'email',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'disabled',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'password',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerified',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetToken',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'passwordResetTokenExpiresAt',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'provider',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment_rules',
        'departmentId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment_rules',
        'min_hours_before_booking',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment_rules',
        'max_days_advance_booking',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'patientId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'patients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'doctorId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'departmentId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'appointment_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'start_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'end_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['New', 'FollowUp'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: [
            'Scheduled',
            'CheckedIn',
            'Completed',
            'Canceled',
            'Rescheduled',
          ],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'reminder_sent',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departments',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departments',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departments',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'doctorId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'weekday',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'morning_start_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'morning_end_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'evening_start_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'evening_end_time',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'slot_duration_minutes',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'is_active',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'doctorId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'departmentId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'notes',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_investigations',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_investigations',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_investigations',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_order_items',
        'imaging_orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'imaging_orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_order_items',
        'imaging_investigationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'imaging_investigations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_orders',
        'visitId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'visits',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_orders',
        'imaging_technicianId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_orders',
        'total_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_orders',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pending', 'Completed'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'patientId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'patients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'provider_name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'policy_number',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'coverage_start',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'coverage_end',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'plan_details',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice_items',
        'invoiceId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'invoices',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice_items',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice_items',
        'amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'patientId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'patients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'visitId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'visits',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'total_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'vat_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'is_paid',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_order_items',
        'lab_orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'lab_orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_order_items',
        'lab_testId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'lab_tests',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_orders',
        'visitId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'visits',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_orders',
        'lab_technicianId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_orders',
        'total_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_orders',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pending', 'Completed'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_tests',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_tests',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_tests',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'medications',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'medications',
        'description',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'medications',
        'price',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patient_documents',
        'patientId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'patients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patient_documents',
        'document_type',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patient_documents',
        'document_url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'userId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'full_name_en',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'full_name_ar',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'date_of_birth',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'gender',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Male', 'Female', 'Other'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'nationality',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'identifier_type',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['National ID', 'Iqama', 'Passport'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'identifier',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'address',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'emergency_contact_name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'emergency_contact_phone',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'medical_history',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'allergies',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'current_medications',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'family_history',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_order_items',
        'pharmacy_orderId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'pharmacy_orders',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_order_items',
        'medicationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'medications',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_order_items',
        'quantity',
        {
          type: Sequelize.DataTypes.INTEGER,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_orders',
        'visitId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'visits',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_orders',
        'pharmacistId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_orders',
        'total_amount',
        {
          type: Sequelize.DataTypes.DECIMAL,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_orders',
        'status',
        {
          type: Sequelize.DataTypes.ENUM,

          values: ['Pending', 'Completed'],
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'visitId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'visits',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'start_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'end_date',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'diagnosis',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'instructions',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'document_url',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'patientId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'patients',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'doctorId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'users',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'departmentId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'departments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'appointmentId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'appointments',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'organizationId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'visit_datetime',
        {
          type: Sequelize.DataTypes.DATE,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'symptoms',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'diagnosis',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'notes',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'permissions',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'role_customization',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'app_roleId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'roles',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'organizations',
        'name',
        {
          type: Sequelize.DataTypes.TEXT,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'roles',
        'globalAccess',
        {
          type: Sequelize.DataTypes.BOOLEAN,

          defaultValue: false,
          allowNull: false,
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'users',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointment_rules',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'appointments',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'departments',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'doctor_availabilities',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'holidays',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_investigations',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_order_items',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'imaging_orders',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'insurances',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoice_items',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'invoices',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_order_items',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_orders',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'lab_tests',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'medications',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patient_documents',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'patients',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_order_items',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'pharmacy_orders',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'sick_leaves',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await queryInterface.addColumn(
        'visits',
        'organizationsId',
        {
          type: Sequelize.DataTypes.UUID,

          references: {
            model: 'organizations',
            key: 'id',
          },
        },
        { transaction },
      );

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
  /**
   * @param {QueryInterface} queryInterface
   * @param {Sequelize} Sequelize
   * @returns {Promise<void>}
   */
  async down(queryInterface, Sequelize) {
    /**
     * @type {Transaction}
     */
    const transaction = await queryInterface.sequelize.transaction();
    try {
      await queryInterface.removeColumn('visits', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_orders', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'pharmacy_order_items',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn('patients', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'patient_documents',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn('medications', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_tests', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_orders', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_order_items', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('invoice_items', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('imaging_orders', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'imaging_order_items',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'imaging_investigations',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn('holidays', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn('departments', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'appointment_rules',
        'organizationsId',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'organizationsId', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'globalAccess', {
        transaction,
      });

      await queryInterface.removeColumn('organizations', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'app_roleId', { transaction });

      await queryInterface.removeColumn('roles', 'role_customization', {
        transaction,
      });

      await queryInterface.removeColumn('roles', 'name', { transaction });

      await queryInterface.removeColumn('permissions', 'name', { transaction });

      await queryInterface.removeColumn('visits', 'notes', { transaction });

      await queryInterface.removeColumn('visits', 'diagnosis', { transaction });

      await queryInterface.removeColumn('visits', 'symptoms', { transaction });

      await queryInterface.removeColumn('visits', 'visit_datetime', {
        transaction,
      });

      await queryInterface.removeColumn('visits', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('visits', 'appointmentId', {
        transaction,
      });

      await queryInterface.removeColumn('visits', 'departmentId', {
        transaction,
      });

      await queryInterface.removeColumn('visits', 'doctorId', { transaction });

      await queryInterface.removeColumn('visits', 'patientId', { transaction });

      await queryInterface.removeColumn('sick_leaves', 'document_url', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'instructions', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'diagnosis', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('sick_leaves', 'visitId', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_orders', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_orders', 'total_amount', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_orders', 'pharmacistId', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_orders', 'visitId', {
        transaction,
      });

      await queryInterface.removeColumn('pharmacy_order_items', 'quantity', {
        transaction,
      });

      await queryInterface.removeColumn(
        'pharmacy_order_items',
        'medicationId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'pharmacy_order_items',
        'pharmacy_orderId',
        { transaction },
      );

      await queryInterface.removeColumn('patients', 'family_history', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'current_medications', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'allergies', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'medical_history', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'emergency_contact_phone', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'emergency_contact_name', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'address', { transaction });

      await queryInterface.removeColumn('patients', 'identifier', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'identifier_type', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'nationality', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'gender', { transaction });

      await queryInterface.removeColumn('patients', 'date_of_birth', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'full_name_ar', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'full_name_en', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('patients', 'userId', { transaction });

      await queryInterface.removeColumn('patient_documents', 'document_url', {
        transaction,
      });

      await queryInterface.removeColumn('patient_documents', 'document_type', {
        transaction,
      });

      await queryInterface.removeColumn('patient_documents', 'patientId', {
        transaction,
      });

      await queryInterface.removeColumn('medications', 'price', {
        transaction,
      });

      await queryInterface.removeColumn('medications', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('medications', 'name', { transaction });

      await queryInterface.removeColumn('lab_tests', 'price', { transaction });

      await queryInterface.removeColumn('lab_tests', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('lab_tests', 'name', { transaction });

      await queryInterface.removeColumn('lab_orders', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('lab_orders', 'total_amount', {
        transaction,
      });

      await queryInterface.removeColumn('lab_orders', 'lab_technicianId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_orders', 'visitId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_order_items', 'lab_testId', {
        transaction,
      });

      await queryInterface.removeColumn('lab_order_items', 'lab_orderId', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'is_paid', { transaction });

      await queryInterface.removeColumn('invoices', 'vat_amount', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'total_amount', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('invoices', 'visitId', { transaction });

      await queryInterface.removeColumn('invoices', 'patientId', {
        transaction,
      });

      await queryInterface.removeColumn('invoice_items', 'amount', {
        transaction,
      });

      await queryInterface.removeColumn('invoice_items', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('invoice_items', 'invoiceId', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'plan_details', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'coverage_end', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'coverage_start', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'policy_number', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'provider_name', {
        transaction,
      });

      await queryInterface.removeColumn('insurances', 'patientId', {
        transaction,
      });

      await queryInterface.removeColumn('imaging_orders', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('imaging_orders', 'total_amount', {
        transaction,
      });

      await queryInterface.removeColumn(
        'imaging_orders',
        'imaging_technicianId',
        { transaction },
      );

      await queryInterface.removeColumn('imaging_orders', 'visitId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'imaging_order_items',
        'imaging_investigationId',
        { transaction },
      );

      await queryInterface.removeColumn(
        'imaging_order_items',
        'imaging_orderId',
        { transaction },
      );

      await queryInterface.removeColumn('imaging_investigations', 'price', {
        transaction,
      });

      await queryInterface.removeColumn(
        'imaging_investigations',
        'description',
        { transaction },
      );

      await queryInterface.removeColumn('imaging_investigations', 'name', {
        transaction,
      });

      await queryInterface.removeColumn('holidays', 'notes', { transaction });

      await queryInterface.removeColumn('holidays', 'end_date', {
        transaction,
      });

      await queryInterface.removeColumn('holidays', 'start_date', {
        transaction,
      });

      await queryInterface.removeColumn('holidays', 'departmentId', {
        transaction,
      });

      await queryInterface.removeColumn('holidays', 'doctorId', {
        transaction,
      });

      await queryInterface.removeColumn('holidays', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('doctor_availabilities', 'is_active', {
        transaction,
      });

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'slot_duration_minutes',
        { transaction },
      );

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'evening_end_time',
        { transaction },
      );

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'evening_start_time',
        { transaction },
      );

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'morning_end_time',
        { transaction },
      );

      await queryInterface.removeColumn(
        'doctor_availabilities',
        'morning_start_time',
        { transaction },
      );

      await queryInterface.removeColumn('doctor_availabilities', 'weekday', {
        transaction,
      });

      await queryInterface.removeColumn('doctor_availabilities', 'doctorId', {
        transaction,
      });

      await queryInterface.removeColumn('departments', 'description', {
        transaction,
      });

      await queryInterface.removeColumn('departments', 'name', { transaction });

      await queryInterface.removeColumn('departments', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'reminder_sent', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'status', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'type', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'end_time', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'start_time', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'appointment_date', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'organizationId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'departmentId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'doctorId', {
        transaction,
      });

      await queryInterface.removeColumn('appointments', 'patientId', {
        transaction,
      });

      await queryInterface.removeColumn(
        'appointment_rules',
        'max_days_advance_booking',
        { transaction },
      );

      await queryInterface.removeColumn(
        'appointment_rules',
        'min_hours_before_booking',
        { transaction },
      );

      await queryInterface.removeColumn('appointment_rules', 'departmentId', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'provider', { transaction });

      await queryInterface.removeColumn(
        'users',
        'passwordResetTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'passwordResetToken', {
        transaction,
      });

      await queryInterface.removeColumn(
        'users',
        'emailVerificationTokenExpiresAt',
        { transaction },
      );

      await queryInterface.removeColumn('users', 'emailVerificationToken', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'emailVerified', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'password', { transaction });

      await queryInterface.removeColumn('users', 'disabled', { transaction });

      await queryInterface.removeColumn('users', 'email', { transaction });

      await queryInterface.removeColumn('users', 'phoneNumber', {
        transaction,
      });

      await queryInterface.removeColumn('users', 'lastName', { transaction });

      await queryInterface.removeColumn('users', 'firstName', { transaction });

      await queryInterface.dropTable('organizations', { transaction });

      await queryInterface.dropTable('permissions', { transaction });

      await queryInterface.dropTable('roles', { transaction });

      await queryInterface.dropTable('visits', { transaction });

      await queryInterface.dropTable('sick_leaves', { transaction });

      await queryInterface.dropTable('pharmacy_orders', { transaction });

      await queryInterface.dropTable('pharmacy_order_items', { transaction });

      await queryInterface.dropTable('patients', { transaction });

      await queryInterface.dropTable('patient_documents', { transaction });

      await queryInterface.dropTable('medications', { transaction });

      await queryInterface.dropTable('lab_tests', { transaction });

      await queryInterface.dropTable('lab_orders', { transaction });

      await queryInterface.dropTable('lab_order_items', { transaction });

      await queryInterface.dropTable('invoices', { transaction });

      await queryInterface.dropTable('invoice_items', { transaction });

      await queryInterface.dropTable('insurances', { transaction });

      await queryInterface.dropTable('imaging_orders', { transaction });

      await queryInterface.dropTable('imaging_order_items', { transaction });

      await queryInterface.dropTable('imaging_investigations', { transaction });

      await queryInterface.dropTable('holidays', { transaction });

      await queryInterface.dropTable('doctor_availabilities', { transaction });

      await queryInterface.dropTable('departments', { transaction });

      await queryInterface.dropTable('appointments', { transaction });

      await queryInterface.dropTable('appointment_rules', { transaction });

      await queryInterface.dropTable('users', { transaction });

      await transaction.commit();
    } catch (err) {
      await transaction.rollback();
      throw err;
    }
  },
};
