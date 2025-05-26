module.exports = function (sequelize, DataTypes) {
  const patient_documents = sequelize.define(
    'patient_documents',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      document_type: {
        type: DataTypes.TEXT,
      },

      document_url: {
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

  patient_documents.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    //end loop

    db.patient_documents.belongsTo(db.patients, {
      as: 'patient',
      foreignKey: {
        name: 'patientId',
      },
      constraints: false,
    });

    db.patient_documents.belongsTo(db.organizations, {
      as: 'organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.patient_documents.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.patient_documents.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return patient_documents;
};
