module.exports = function (sequelize, DataTypes) {
  const organizations = sequelize.define(
    'organizations',
    {
      id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true,
      },

      name: {
        type: DataTypes.TEXT,
      },

      description: {
        type: DataTypes.TEXT,
        allowNull: true,
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

  organizations.associate = (db) => {
    /// loop through entities and it's fields, and if ref === current e[name] and create relation has many on parent entity

    db.organizations.hasMany(db.users, {
      as: 'users_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.appointment_rules, {
      as: 'appointment_rules_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.appointments, {
      as: 'appointments_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.appointments, {
      as: 'appointments_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.departments, {
      as: 'departments_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.departments, {
      as: 'departments_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.doctor_availabilities, {
      as: 'doctor_availabilities_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.holidays, {
      as: 'holidays_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.holidays, {
      as: 'holidays_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.imaging_investigations, {
      as: 'imaging_investigations_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.imaging_order_items, {
      as: 'imaging_order_items_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.imaging_orders, {
      as: 'imaging_orders_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.insurances, {
      as: 'insurances_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.invoice_items, {
      as: 'invoice_items_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.invoices, {
      as: 'invoices_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.invoices, {
      as: 'invoices_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.lab_order_items, {
      as: 'lab_order_items_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.lab_orders, {
      as: 'lab_orders_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.lab_tests, {
      as: 'lab_tests_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.medications, {
      as: 'medications_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.patient_documents, {
      as: 'patient_documents_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.patients, {
      as: 'patients_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.pharmacy_order_items, {
      as: 'pharmacy_order_items_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.pharmacy_orders, {
      as: 'pharmacy_orders_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.sick_leaves, {
      as: 'sick_leaves_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.visits, {
      as: 'visits_organization',
      foreignKey: {
        name: 'organizationId',
      },
      constraints: false,
    });

    db.organizations.hasMany(db.visits, {
      as: 'visits_organizations',
      foreignKey: {
        name: 'organizationsId',
      },
      constraints: false,
    });

    //end loop

    db.organizations.belongsTo(db.users, {
      as: 'createdBy',
    });

    db.organizations.belongsTo(db.users, {
      as: 'updatedBy',
    });
  };

  return organizations;
};
