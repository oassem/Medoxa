const db = require('../db/models');
const DepartmentsDBApi = require('../db/api/departments');
const processFile = require('../middlewares/upload');
const ValidationError = require('./notifications/errors/validation');
const csv = require('csv-parser');
const stream = require('stream');

module.exports = class DepartmentsService {
  static async create(data, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      await DepartmentsDBApi.create(data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async bulkImport(req, res, sendInvitationEmails = true, host) {
    const transaction = await db.sequelize.transaction();

    try {
      await processFile(req, res);
      const bufferStream = new stream.PassThrough();
      const results = [];

      await bufferStream.end(Buffer.from(req.file.buffer, 'utf-8')); // convert Buffer to Stream

      await new Promise((resolve, reject) => {
        bufferStream
          .pipe(csv())
          .on('data', (data) => results.push(data))
          .on('end', async () => {
            console.log('CSV results', results);
            resolve();
          })
          .on('error', (error) => reject(error));
      });

      await DepartmentsDBApi.bulkImport(results, {
        transaction,
        ignoreDuplicates: true,
        validate: true,
        currentUser: req.currentUser,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async update(data, id, currentUser) {
    const transaction = await db.sequelize.transaction();
    try {
      let departments = await DepartmentsDBApi.findBy({ id }, { transaction });

      if (!departments) {
        throw new ValidationError('departmentsNotFound');
      }

      const updatedDepartments = await DepartmentsDBApi.update(id, data, {
        currentUser,
        transaction,
      });

      await transaction.commit();
      return updatedDepartments;
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async deleteByIds(ids, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      await DepartmentsDBApi.deleteByIds(ids, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }

  static async remove(id, currentUser) {
    const transaction = await db.sequelize.transaction();

    try {
      await DepartmentsDBApi.remove(id, {
        currentUser,
        transaction,
      });

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  }
};
