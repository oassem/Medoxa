const db = require('../models');
const Utils = require('../utils');
const fs = require('fs');
const path = require('path');
const Sequelize = db.Sequelize;
const Op = Sequelize.Op;

module.exports = class Patient_documentsDBApi {
  static async create(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_documents = await db.patient_documents.create(
      {
        id: data.id || undefined,
        document_type: data.document_type || null,
        document_url: data.document_url || null,
        importHash: data.importHash || null,
        createdById: currentUser.id,
        updatedById: currentUser.id,
      },
      { transaction },
    );

    await patient_documents.setPatient(data.patient || null, {
      transaction,
    });

    await patient_documents.setOrganizations(currentUser.organization?.id || null, {
      transaction,
    });

    return patient_documents;
  }

  static async bulkImport(data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    // Prepare data - wrapping individual data transformations in a map() method
    const patient_documentsData = data.map((item, index) => ({
      id: item.id || undefined,
      document_type: item.document_type || null,
      document_url: item.document_url || null,
      importHash: item.importHash || null,
      createdById: currentUser.id,
      updatedById: currentUser.id,
      createdAt: new Date(Date.now() + index * 1000),
    }));

    // Bulk create items
    const patient_documents = await db.patient_documents.bulkCreate(
      patient_documentsData,
      { transaction },
    );

    // For each item created, replace relation files
    return patient_documents;
  }

  static async update(id, data, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_documents = await db.patient_documents.findByPk(
      id,
      {},
      { transaction },
    );

    const updatePayload = {};

    if (data.document_type !== undefined)
      updatePayload.document_type = data.document_type;

    if (data.document_url !== undefined) {
      // Delete old file if a new file is being uploaded and the URL is different
      if (
        patient_documents.document_url &&
        data.document_url &&
        patient_documents.document_url !== data.document_url
      ) {
        try {
          fs.unlinkSync(path.resolve(patient_documents.document_url));
        } catch (err) {
          console.error('Error deleting old file:', err);
        }
      }
      updatePayload.document_url = data.document_url;
    }

    updatePayload.updatedById = currentUser.id;

    await patient_documents.update(updatePayload, { transaction });

    if (data.patient !== undefined) {
      await patient_documents.setPatient(
        data.patient,
        { transaction },
      );
    }

    return patient_documents;
  }

  static async deleteByIds(ids, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_documents = await db.patient_documents.findAll({
      where: {
        id: {
          [Op.in]: ids,
        },
      },
      transaction,
    });

    await db.sequelize.transaction(async (transaction) => {
      for (const record of patient_documents) {
        // Delete file from disk if it exists
        if (record && record.document_url) {
          try {
            fs.unlinkSync(path.resolve(record.document_url));
          } catch (err) {
            // Log error but don't block deletion
            console.error('Error deleting file:', err);
          }
        }
        await record.update({ deletedBy: currentUser.id }, { transaction });
      }

      for (const record of patient_documents) {
        await record.destroy({ transaction });
      }
    });

    return patient_documents;
  }

  static async remove(id, options) {
    const currentUser = (options && options.currentUser) || { id: null };
    const transaction = (options && options.transaction) || undefined;

    const patient_documents = await db.patient_documents.findByPk(id, options);

    // Delete file from disk if it exists
    if (patient_documents && patient_documents.document_url) {
      try {
        fs.unlinkSync(path.resolve(patient_documents.document_url));
      } catch (err) {
        // Log error but don't block deletion
        console.error('Error deleting file:', err);
      }
    }

    await patient_documents.update(
      { deletedBy: currentUser.id },
      { transaction }
    );

    await patient_documents.destroy({ transaction });
    return patient_documents;
  }

  static async findBy(where, options) {
    const transaction = (options && options.transaction) || undefined;

    const patient_documents = await db.patient_documents.findOne(
      { where },
      { transaction },
    );

    if (!patient_documents) {
      return patient_documents;
    }

    const output = patient_documents.get({ plain: true });

    output.patient = await patient_documents.getPatient({
      transaction,
    });

    output.organizations = await patient_documents.getOrganizations({
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

    let include = [
      {
        model: db.patients,
        as: 'patient',
        required: false,
        where: filter.patient
          ? {
            [Op.or]: [
              {
                id: {
                  [Op.in]: filter.patient
                    .split('|')
                    .map((term) => Utils.uuid(term)),
                },
              },
              {
                full_name_en: {
                  [Op.or]: filter.patient
                    .split('|')
                    .map((term) => ({ [Op.iLike]: `%${term}%` })),
                },
              },
            ],
          }
          : {},
      },

      {
        model: db.organizations,
        as: 'organizations',
      },
    ];

    if (filter) {
      if (filter.id) {
        where = {
          ...where,
          ['id']: Utils.uuid(filter.id),
        };
      }

      if (filter.document_type) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_documents',
            'document_type',
            filter.document_type,
          ),
        };
      }

      if (filter.document_url) {
        where = {
          ...where,
          [Op.and]: Utils.ilike(
            'patient_documents',
            'document_url',
            filter.document_url,
          ),
        };
      }

      if (filter.active !== undefined) {
        where = {
          ...where,
          active: filter.active === true || filter.active === 'true',
        };
      }

      if (filter.organizations) {
        const listItems = filter.organizations.split('|').map((item) => {
          return Utils.uuid(item);
        });

        where = {
          ...where,
          organizationsId: { [Op.or]: listItems },
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
      const { rows, count } = await db.patient_documents.findAndCountAll(
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
          Utils.ilike('patient_documents', 'document_type', query),
        ],
      };
    }

    const records = await db.patient_documents.findAll({
      attributes: ['id', 'document_type'],
      where,
      limit: limit ? Number(limit) : undefined,
      offset: offset ? Number(offset) : undefined,
      orderBy: [['document_type', 'ASC']],
    });

    return records.map((record) => ({
      id: record.id,
      label: record.document_type,
    }));
  }
};
