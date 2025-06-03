const db = require('../models');
const Utils = require('../utils');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class OrganizationsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const organizations = await db.organizations.create(
      {
        id: data.id || undefined,
        name: data.name || null,
        description: data.description || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    return organizations;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const organizationsData = data.map((item, index) => ({
      id: item.id || undefined,
      name: item.name || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const organizations = await db.organizations.bulkCreate(organizationsData, {
      transaction,
    });

    // For each item created, replace relation files
    return organizations;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const organizations = await db.organizations.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;
    if (data.description !== undefined) updatePayload.description = data.description;

    updatePayload.updatedById = currentUser.id;

    await organizations.update(updatePayload, { transaction });
    return organizations;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const organizations = await db.organizations.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of organizations) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }
      for (const record of organizations) {
        await record.destroy({ transaction });
      }
    });

    return organizations;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const organizations = await db.organizations.findByPk(id, options);

    await organizations.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await organizations.destroy({
      transaction,
    });

    return organizations;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const organizations = await db.organizations.findOne(
      { where },
      { transaction },
    );

    if (!organizations) {
      return organizations;
    }

    const output = organizations.get({ plain: true });

    output.users_organizations = await organizations.getUsers_organizations({
      transaction,
    });

    output.appointment_rules_organizations =
      await organizations.getAppointment_rules_organizations({
        transaction,
      });

    output.appointments_organization =
      await organizations.getAppointments_organization({
        transaction,
      });

    output.appointments_organizations =
      await organizations.getAppointments_organizations({
        transaction,
      });

    output.departments_organization =
      await organizations.getDepartments_organization({
        transaction,
      });

    output.departments_organizations =
      await organizations.getDepartments_organizations({
        transaction,
      });

    output.doctor_availabilities_organizations =
      await organizations.getDoctor_availabilities_organizations({
        transaction,
      });

    output.holidays_organization = await organizations.getHolidays_organization(
      {
        transaction,
      },
    );

    output.holidays_organizations =
      await organizations.getHolidays_organizations({
        transaction,
      });

    output.imaging_investigations_organizations =
      await organizations.getImaging_investigations_organizations({
        transaction,
      });

    output.imaging_order_items_organizations =
      await organizations.getImaging_order_items_organizations({
        transaction,
      });

    output.imaging_orders_organizations =
      await organizations.getImaging_orders_organizations({
        transaction,
      });

    output.insurances_organizations =
      await organizations.getInsurances_organizations({
        transaction,
      });

    output.invoice_items_organizations =
      await organizations.getInvoice_items_organizations({
        transaction,
      });

    output.invoices_organization = await organizations.getInvoices_organization(
      {
        transaction,
      },
    );

    output.invoices_organizations =
      await organizations.getInvoices_organizations({
        transaction,
      });

    output.lab_order_items_organizations =
      await organizations.getLab_order_items_organizations({
        transaction,
      });

    output.lab_orders_organizations =
      await organizations.getLab_orders_organizations({
        transaction,
      });

    output.lab_tests_organizations =
      await organizations.getLab_tests_organizations({
        transaction,
      });

    output.medications_organizations =
      await organizations.getMedications_organizations({
        transaction,
      });

    output.patient_documents_organizations =
      await organizations.getPatient_documents_organizations({
        transaction,
      });

    output.patients_organization = await organizations.getPatients_organization(
      {
        transaction,
      },
    );

    output.pharmacy_order_items_organizations =
      await organizations.getPharmacy_order_items_organizations({
        transaction,
      });

    output.pharmacy_orders_organizations =
      await organizations.getPharmacy_orders_organizations({
        transaction,
      });

    output.sick_leaves_organizations =
      await organizations.getSick_leaves_organizations({
        transaction,
      });

    output.visits_organization = await organizations.getVisits_organization({
      transaction,
    });

    output.visits_organizations = await organizations.getVisits_organizations({
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
    const userOrganizations = (user && user.organizations?.id) || null;

    if (userOrganizations) {
      if (options?.currentUser?.organizationsId) {
        where.organizationsId = options.currentUser.organizationsId;
      }
    }

    offset = currentPage * limit;

    let include = [];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.name) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('organizations', 'name', filter.name),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
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

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike('organizations', 'description', filter.description),
        };
      }
    }

    if (globalAccess) {
      delete where.organizationsId;
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
      const { rows, count } = await db.organizations.findAndCountAll(
        queryOptions,
      );

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
          Utils.ilike('organizations', 'name', query),
        ],
      };
    }

    const records = await db.organizations.findAll({
      attributes: ['id', 'name', 'description'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['name', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.name,
    }));
  }
};
