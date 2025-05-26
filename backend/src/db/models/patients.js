module.exports = function (sequelize, DataTypes) {
  const patients = sequelize.define(
    'patients',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      full_name_en: {
        type: DataTypes.TEXT,
      },

      full_name_ar: {
        type: DataTypes.TEXT,
      },

      phone: {
        type: DataTypes.STRING(50),
        allowNull: true,
      },

      email: {
        type: DataTypes.STRING(255),
        allowNull: true,
        validate: {
          isEmail: true,
        },
      },

      date_of_birth: {
        type: DataTypes.DATE,
      },

      gender: {
        type: DataTypes.ENUM,
        values: ['Male', 'Female'],
      },

      nationality: {
        type: DataTypes.TEXT,
      },

      identifier_type: {
        type: DataTypes.ENUM,
        values: ['National ID', 'Iqama', 'Passport'],
      },

      identifier: {
        type: DataTypes.TEXT,
      },

      address: {
        type: DataTypes.TEXT,
      },

      emergency_contact_name: {
        type: DataTypes.TEXT,
      },

      emergency_contact_phone: {
        type: DataTypes.TEXT,
      },

      medical_history: {
        type: DataTypes.TEXT,
      },

      allergies: {
        type: DataTypes.TEXT,
      },

      current_medications: {
        type: DataTypes.TEXT,
      },

      family_history: {
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

  patients.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.patients.hasMany(db.appointments, {
      as: 'appointments_patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    db.patients.hasMany(db.insurances, {
      as: 'insurances_patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    db.patients.hasMany(db.invoices, {
      as: 'invoices_patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    db.patients.hasMany(db.patient_documents, {
      as: 'patient_documents_patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    db.patients.hasMany(db.visits, {
      as: 'visits_patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    //end loop

    db.patients.belongsTo(db.users, {
      as: 'user',
      foreignKey: {
        name: 'userId',
      },
      constraints: false,
    });

    db.patients.belongsTo(db.organizations, {
      as: 'organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.patients.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.patients.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return patients;
};
