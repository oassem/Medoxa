const db = require('../models');
const Utils = require('../utils');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class PatientsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patients = await db.patients.create(
      {
        id: data.id || undefined,
        full_name_en: data.full_name_en || null,
        full_name_ar: data.full_name_ar || null,
        phone: data.phone || null,
        email: data.email || null,
        date_of_birth: data.date_of_birth || null,
        gender: data.gender || null,
        nationality: data.nationality || null,
        identifier_type: data.identifier_type || null,
        identifier: data.identifier || null,
        address: data.address || null,
        emergency_contact_name: data.emergency_contact_name || null,
        emergency_contact_phone: data.emergency_contact_phone || null,
        medical_history: data.medical_history || null,
        allergies: data.allergies || null,
        current_medications: data.current_medications || null,
        family_history: data.family_history || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    // await patients.setUser(data.user || null, {
    //   transaction,
    // });

    await patients.setOrganization(
      currentUser.organization?.id || null,
      { transaction }
    );

    return patients;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const patientsData = data.map((item, index) => ({
      id: item.id || undefined,
      full_name_en: item.full_name_en || null,
      full_name_ar: item.full_name_ar || null,
      phone: item.phone || null,
      email: item.email || null,
      date_of_birth: item.date_of_birth || null,
      gender: item.gender || null,
      nationality: item.nationality || null,
      identifier_type: item.identifier_type || null,
      identifier: item.identifier || null,
      address: item.address || null,
      emergency_contact_name: item.emergency_contact_name || null,
      emergency_contact_phone: item.emergency_contact_phone || null,
      medical_history: item.medical_history || null,
      allergies: item.allergies || null,
      current_medications: item.current_medications || null,
      family_history: item.family_history || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const patients = await db.patients.bulkCreate(patientsData, {
      transaction,
    });

    // For each item created, replace relation files
    return patients;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const patients = await db.patients.findByPk(id, {}, { transaction });
    const updatePayload = {};

    if (data.full_name_en !== undefined)
      updatePayload.full_name_en = data.full_name_en;

    if (data.full_name_ar !== undefined)
      updatePayload.full_name_ar = data.full_name_ar;

    if (data.date_of_birth !== undefined)
      updatePayload.date_of_birth = data.date_of_birth;

    if (data.gender !== undefined) updatePayload.gender = data.gender;

    if (data.nationality !== undefined)
      updatePayload.nationality = data.nationality;

    if (data.identifier_type !== undefined)
      updatePayload.identifier_type = data.identifier_type;

    if (data.identifier !== undefined)
      updatePayload.identifier = data.identifier;

    if (data.address !== undefined) updatePayload.address = data.address;

    if (data.emergency_contact_name !== undefined)
      updatePayload.emergency_contact_name = data.emergency_contact_name;

    if (data.emergency_contact_phone !== undefined)
      updatePayload.emergency_contact_phone = data.emergency_contact_phone;

    if (data.medical_history !== undefined)
      updatePayload.medical_history = data.medical_history;

    if (data.allergies !== undefined) updatePayload.allergies = data.allergies;

    if (data.current_medications !== undefined)
      updatePayload.current_medications = data.current_medications;

    if (data.family_history !== undefined)
      updatePayload.family_history = data.family_history;

    if (data.phone !== undefined)
      updatePayload.phone = data.phone;

    if (data.email !== undefined)
      updatePayload.email = data.email;

    updatePayload.updatedById = currentUser.id;

    await patients.update(updatePayload, { transaction });

    return patients;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patients = await db.patients.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of patients) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of patients) {
        await record.destroy({ transaction });
      }
    });

    return patients;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const patients = await db.patients.findByPk(id, options);

    await patients.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await patients.destroy({
      transaction,
    });

    return patients;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;
    const patients = await db.patients.findOne({ where }, { transaction });

    if (!patients) {
      return patients;
    }

    const output = patients.get({ plain: true });

    output.appointments_patient = await patients.getAppointments_patient({
      transaction,
    });

    output.insurances_patient = await patients.getInsurances_patient({
      transaction,
    });

    output.invoices_patient = await patients.getInvoices_patient({
      transaction,
    });

    output.patient_documents_patient =
      await patients.getPatient_documents_patient({
        transaction,
      });

    output.visits_patient = await patients.getVisits_patient({
      transaction,
    });

    output.user = await patients.getUser({
      transaction,
    });

    output.organization = await patients.getOrganization({
      transaction,
    });

    return output;
  }

  static async findAll(filter, globalAccess, options) {
    const limit = filter.limit || 0;
    let offset = 0;
    let where = {};
    const currentPage = +filter.page;
    const user = (options && options.currentUser) || null;
    const userOrganization = (user && user.organization?.id) || null;

    if (userOrganization) {
      if (options?.currentUser?.organizationId) {
        where.organizationId = options.currentUser.organizationId;
      }
    }

    offset = currentPage * limit;

    let include = [
      {
        model: db.users,
        as: 'user',
        required: false,
        where: filter.user
          ? {
            [Op.or]: [
              {
                id: {
                  [Op.in]: filter.user
                    .split('|')
                    .map((term) => Utils.uuid(term)),
                },
              },
              {
                firstName: {
                  [Op.or]: filter.user
                    .split('|')
                    .map((term) => ({ [Op.iLike]: `%${term}%` })),
                },
              },
            ],
          }
          : {},
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.full_name_en) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'full_name_en',
            filter.full_name_en,
          ),
        };
      }

      if (filter.full_name_ar) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'full_name_ar',
            filter.full_name_ar,
          ),
        };
      }

      if (filter.nationality) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'nationality', filter.nationality),
        };
      }

      if (filter.identifier) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'identifier', filter.identifier),
        };
      }

      if (filter.address) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'address', filter.address),
        };
      }

      if (filter.emergency_contact_name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'emergency_contact_name',
            filter.emergency_contact_name,
          ),
        };
      }

      if (filter.emergency_contact_phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'emergency_contact_phone',
            filter.emergency_contact_phone,
          ),
        };
      }

      if (filter.medical_history) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'medical_history',
            filter.medical_history,
          ),
        };
      }

      if (filter.allergies) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'allergies', filter.allergies),
        };
      }

      if (filter.current_medications) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'current_medications',
            filter.current_medications,
          ),
        };
      }

      if (filter.family_history) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patients',
            'family_history',
            filter.family_history,
          ),
        };
      }

      if (filter.date_of_birthRange) {
        const [start, end] = filter.date_of_birthRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            date_of_birth: {
              ...where.date_of_birth,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            date_of_birth: {
              ...where.date_of_birth,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.gender) {
        where = {
          ...where,
          gender: filter.gender,
        };
      }

      if (filter.identifier_type) {
        where = {
          ...where,
          identifier_type: filter.identifier_type,
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationId: { [Op.or]: listItems },
        };
      }

      if (filter.createdAtRange) {
        const [start, end] = filter.createdAtRange;

        if (start !== undefined && start !== null && start !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.gte]: start,
            },
          };
        }

        if (end !== undefined && end !== null && end !== '') {
          where = {
            ...where,
            ['createdAt']: {
              ...where.createdAt,
              [Op.lte]: end,
            },
          };
        }
      }

      if (filter.phone) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'phone', filter.phone),
        };
      }

      if (filter.email) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('patients', 'email', filter.email),
        };
      }
    }

    if (globalAccess) {
      delete where.organizationId;
    }

    const queryOptions = {
      where,
      include,
      distinct: true,
      order:
        filter.field && filter.sort
          ? [[filter.field, filter.sort]]
          : [['createdAt', 'desc']],
      transaction: options?.transaction,
      logging: console.log,
    };

    if (!options?.countOnly) {
      queryOptions.limit = limit ? Number(limit) : undefined;
      queryOptions.offset = offset ? Number(offset) : undefined;
    }

    try {
      const { rows, count } = await db.patients.findAndCountAll(queryOptions);

      return {
        rows: options?.countOnly ? [] : rows,
        count: count,
      };
    } catch (error) {
      console.error('Error executing query:', error);
      throw error;
    }
  }

  static async findAllAutocomplete(
    query,
    limit,
    offset,
    globalAccess,
    organizationId,
  ) {
    let where = {};

    if (!globalAccess && organizationId) {
      where.organizationId = organizationId;
    }

    if (query) {
      where = {
        [Op.or]: [
          { ['id']: Utils.uuid(query) },
          Utils.ilike('patients', 'full_name_en', query),
        ],
      };
    }

    const records = await db.patients.findAll({
      attributes: ['id', 'full_name_en', 'full_name_ar'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['full_name_en', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.full_name_en,
      label_ar: record.full_name_ar,
    }));
  }
};
