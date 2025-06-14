const config = require('../../config');
const providers = config.providers;
const crypto = require('crypto');
const bcrypt = require('bcrypt');

module.exports = function (sequelize, DataTypes) {
  const users = sequelize.define(
    'users',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      firstName: {
        type: DataTypes.TEXT,
      },

      lastName: {
        type: DataTypes.TEXT,
      },

      phoneNumber: {
        type: DataTypes.TEXT,
      },

      email: {
        type: DataTypes.TEXT,
      },

      disabled: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      password: {
        type: DataTypes.TEXT,
      },

      emailVerified: {
        type: DataTypes.BOOLEAN,

        allowNull: false,
        defaultValue: false,
      },

      emailVerificationToken: {
        type: DataTypes.TEXT,
      },

      emailVerificationTokenExpiresAt: {
        type: DataTypes.DATE,
      },

      passwordResetToken: {
        type: DataTypes.TEXT,
      },

      passwordResetTokenExpiresAt: {
        type: DataTypes.DATE,
      },

      provider: {
        type: DataTypes.TEXT,
      },

      importHash: {
        type: DataTypes.STRING(255),
        allowNull: true,
        unique: true,
      },
    },
    {
      timestamps: true,
      paranoid: true,
      freezeTableName: true,
    },
  );

  users.associate = (db) => {
    db.users.belongsToMany(db.permissions, {
      as: 'custom_permissions',
      foreignKey: {
        name: 'users_custom_permissionsId',
      },
      constraints: false,
      through: 'usersCustom_permissionsPermissions',
    });

    db.users.belongsToMany(db.permissions, {
      as: 'custom_permissions_filter',
      foreignKey: {
        name: 'users_custom_permissionsId',
      },
      constraints: false,
      through: 'usersCustom_permissionsPermissions',
    });

    // loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.users.hasMany(db.appointments, {
      as: 'appointments_doctor',
      foreignKey: {
        name: 'doctorId',
      },
      constraints: false,
    });

    db.users.hasMany(db.doctor_availabilities, {
      as: 'doctor_availabilities_doctor',
      foreignKey: {
        name: 'doctorId',
      },
      constraints: false,
    });

    db.users.hasMany(db.holidays, {
      as: 'holidays_doctor',
      foreignKey: {
        name: 'doctorId',
      },
      constraints: false,
    });

    db.users.hasMany(db.imaging_orders, {
      as: 'imaging_orders_imaging_technician',
      foreignKey: {
        name: 'imaging_technicianId',
      },
      constraints: false,
    });

    db.users.hasMany(db.lab_orders, {
      as: 'lab_orders_lab_technician',
      foreignKey: {
        name: 'lab_technicianId',
      },
      constraints: false,
    });

    db.users.hasMany(db.patients, {
      as: 'patients_user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.users.hasMany(db.pharmacy_orders, {
      as: 'pharmacy_orders_pharmacist',
      foreignKey: {
        name: 'pharmacistId',
      },
      constraints: false,
    });

    db.users.hasMany(db.visits, {
      as: 'visits_doctor',
      foreignKey: {
        name: 'doctorId',
      },
      constraints: false,
    });

    //end loop

    db.users.belongsTo(db.roles, {
      as: 'app_role',
      foreignKey: {
        name: 'app_roleId',
      },
      constraints: false,
    });

    db.users.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.users.hasMany(db.file, {
      as: 'avatar',
      foreignKey: 'belongsToId',
      constraints: false,
      scope: {
        belongsTo: db.users.getTableName(),
        belongsToColumn: 'avatar',
      },
    });

    db.users.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.users.belongsTo(db.users, {
      as: 'updatedBy',
    });

    db.users.belongsTo(db.departments, {
      as: 'department',
      foreignKey: {
        name: 'departmentId',
      },
      constraints: false,
    });
  };

  users.beforeCreate((users, options) => {
    users = trimStringFields(users);

    if (
      users.provider !== providers.LOCAL &&
      Object.values(providers).indexOf(users.provider) > -1
    ) {
      users.emailVerified = true;

      if (!users.password) {
        const password = crypto.randomBytes(20).toString('hex');

        const hashedPassword = bcrypt.hashSync(
          password,
          config.bcrypt.saltRounds,
        );

        users.password = hashedPassword;
      }
    }
  });

  users.beforeUpdate((users, options) => {
    users = trimStringFields(users);
  });

  return users;
};

function trimStringFields(users) {
  users.email = users.email.trim();
  users.firstName = users.firstName ? users.firstName.trim() : null;
  users.lastName = users.lastName ? users.lastName.trim() : null;

  return users;
}
