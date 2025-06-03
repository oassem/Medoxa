const db = require('../models');
const Utils = require('../utils');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class DepartmentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departments = await db.departments.create(
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

    await departments.setOrganization(currentUser.organizationsId || null, {
      transaction,
    });

    return departments;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const departmentsData = data.map((item, index) => ({
      id: item.id || undefined,
      name: item.name || null,
      description: item.description || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const departments = await db.departments.bulkCreate(departmentsData, {
      transaction,
    });

    // For each item created, replace relation files
    return departments;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;
    const departments = await db.departments.findByPk(id, {}, { transaction });
    const updatePayload = {};

    if (data.name !== undefined) updatePayload.name = data.name;

    if (data.description !== undefined)
      updatePayload.description = data.description;

    updatePayload.updatedById = currentUser.id;

    await departments.update(updatePayload, { transaction });
    return departments;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departments = await db.departments.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of departments) {
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }

      for (const record of departments) {
        await record.destroy({ transaction });
      }
    });

    return departments;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const departments = await db.departments.findByPk(id, options);

    await departments.update(
      {
        deletedBy: currentUser.id,
      },
      {
        transaction,
      },
    );

    await departments.destroy({
      transaction,
    });

    return departments;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const departments = await db.departments.findOne(
      { where },
      { transaction },
    );

    if (!departments) {
      return departments;
    }

    const output = departments.get({ plain: true });

    output.appointment_rules_department =
      await departments.getAppointment_rules_department({
        transaction,
      });

    output.appointments_department =
      await departments.getAppointments_department({
        transaction,
      });

    output.holidays_department = await departments.getHolidays_department({
      transaction,
    });

    output.visits_department = await departments.getVisits_department({
      transaction,
    });

    output.organization = await departments.getOrganization({
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
    const userOrganization = (user && user.organizationsId) || null;

    if (userOrganization) {
      where.organizationId = userOrganization;
    }

    offset = currentPage * limit;

    let include = [
      {
        model: db.organizations,
        as: 'organization',
      },
    ];

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
          [Op.and]: Utils.ilike('departments', 'name', filter.name),
        };
      }

      if (filter.description) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'departments',
            'description',
            filter.description,
          ),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organization) {
        const listItems = filter.organization.split('|');
        include.push({
          model: db.organizations,
          as: 'organization',
          where: {
            [Op.or]: listItems.map((item) => ({
              name: { [Op.iLike]: `%${item}%` },
            })),
          },
          required: true,
        });
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
      const { rows, count } = await db.departments.findAndCountAll(
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
          Utils.ilike('departments', 'name', query),
        ],
      };
    }

    const records = await db.departments.findAll({
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
