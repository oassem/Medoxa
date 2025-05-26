const express = require('express');
const PatientsService = require('../services/patients');
const PatientsDBApi = require('../db/api/patients');
const wrapAsync = require('../helpers').wrapAsync;
const router = express.Router();
const { parse } = require('json2csv');
const { checkCrudPermissions } = require('../middlewares/check-permissions');

router.use(checkCrudPermissions('patients'));

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Patients:
 *        type: object
 *        properties:
 *          full_name_en:
 *            type: string
 *            default: full_name_en
 *          full_name_ar:
 *            type: string
 *            default: full_name_ar
 *          nationality:
 *            type: string
 *            default: nationality
 *          identifier:
 *            type: string
 *            default: identifier
 *          address:
 *            type: string
 *            default: address
 *          emergency_contact_name:
 *            type: string
 *            default: emergency_contact_name
 *          emergency_contact_phone:
 *            type: string
 *            default: emergency_contact_phone
 *          medical_history:
 *            type: string
 *            default: medical_history
 *          allergies:
 *            type: string
 *            default: allergies
 *          current_medications:
 *            type: string
 *            default: current_medications
 *          family_history:
 *            type: string
 *            default: family_history
 *          phone:
 *            type: string
 *            default: "+123456789"
 *          email:
 *            type: string
 *            default: "example@email.com"
 *          
 *          
 */

/**
 *  @swagger
 * tags:
 *   name: Patients
 *   description: The Patients managing API
 */

/**
 *  @swagger
 *  /api/patients:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Patients"
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patients"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post(
  '/',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await PatientsService.create(
      req.body.data,
      req.currentUser,
      true,
      link.host,
    );
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 * /api/budgets/bulk-import:
 *  post:
 *    security:
 *      - bearerAuth: []
 *    tags: [Patients]
 *    summary: Bulk import items
 *    description: Bulk import items
 *    requestBody:
 *      required: true
 *      content:
 *        application/json:
 *         schema:
 *          properties:
 *            data:
 *              description: Data of the updated items
 *              type: array
 *              items:
 *                $ref: "#/components/schemas/Patients"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Patients"
 *      401:
 *        $ref: "#/components/responses/UnauthorizedError"
 *      405:
 *        description: Invalid input data
 *      500:
 *        description: Some server error
 *
 */
router.post(
  '/bulk-import',
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);
    await PatientsService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patients/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Update the data of the selected item
 *      description: Update the data of the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to update
 *          required: true
 *          schema:
 *            type: string
 *      requestBody:
 *        description: Set new item data
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                id:
 *                  description: ID of the updated item
 *                  type: string
 *                data:
 *                  description: Data of the updated item
 *                  type: object
 *                  $ref: "#/components/schemas/Patients"
 *              required:
 *                - id
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patients"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.put(
  '/:id',
  wrapAsync(async (req, res) => {
    await PatientsService.update(req.body.data, req.body.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 * @swagger
 *  /api/patients/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Delete the selected item
 *      description: Delete the selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: Item ID to delete
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: The item was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patients"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.delete(
  '/:id',
  wrapAsync(async (req, res) => {
    await PatientsService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patients/deleteByIds:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Delete the selected item list
 *      description: Delete the selected item list
 *      requestBody:
 *        required: true
 *        content:
 *          application/json:
 *            schema:
 *              properties:
 *                ids:
 *                  description: IDs of the updated items
 *                  type: array
 *      responses:
 *        200:
 *          description: The items was successfully deleted
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patients"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Items not found
 *        500:
 *          description: Some server error
 */
router.post(
  '/deleteByIds',
  wrapAsync(async (req, res) => {
    await PatientsService.deleteByIds(req.body.data, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patients:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Get all patients
 *      description: Get all patients
 *      responses:
 *        200:
 *          description: Patients list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patients"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/',
  wrapAsync(async (req, res) => {
    const filetype = req.query.filetype;
    const globalAccess = req.currentUser.app_role.globalAccess;
    const currentUser = req.currentUser;
    const payload = await PatientsDBApi.findAll(req.query, globalAccess, {
      currentUser,
    });

    if (filetype && filetype === 'csv') {
      const fields = [
        'id',
        'full_name_en',
        'full_name_ar',
        'nationality',
        'identifier',
        'address',
        'emergency_contact_name',
        'emergency_contact_phone',
        'medical_history',
        'allergies',
        'current_medications',
        'family_history',
        'phone',
        'email',
        'date_of_birth',
      ];
      const opts = { fields };
      try {
        const csv = parse(payload.rows, opts);
        res.status(200).attachment(csv);
        res.send(csv);
      } catch (err) {
        console.error(err);
      }
    } else {
      res.status(200).send(payload);
    }
  }),
);

/**
 *  @swagger
 *  /api/patients/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Count all patients
 *      description: Count all patients
 *      responses:
 *        200:
 *          description: Patients count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patients"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/count',
  wrapAsync(async (req, res) => {
    const globalAccess = req.currentUser.app_role.globalAccess;
    const currentUser = req.currentUser;
    const payload = await PatientsDBApi.findAll(req.query, globalAccess, {
      countOnly: true,
      currentUser,
    });

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patients/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Find all patients that match search criteria
 *      description: Find all patients that match search criteria
 *      responses:
 *        200:
 *          description: Patients list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patients"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Data not found
 *        500:
 *          description: Some server error
 */
router.get('/autocomplete', async (req, res) => {
  const globalAccess = req.currentUser.app_role.globalAccess;
  const organizationId = req.currentUser.organization?.id;
  const payload = await PatientsDBApi.findAllAutocomplete(
    req.query.query,
    req.query.limit,
    req.query.offset,
    globalAccess,
    organizationId,
  );

  res.status(200).send(payload);
});

/**
 * @swagger
 *  /api/patients/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patients]
 *      summary: Get selected item
 *      description: Get selected item
 *      parameters:
 *        - in: path
 *          name: id
 *          description: ID of item to get
 *          required: true
 *          schema:
 *            type: string
 *      responses:
 *        200:
 *          description: Selected item successfully received
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patients"
 *        400:
 *          description: Invalid ID supplied
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        404:
 *          description: Item not found
 *        500:
 *          description: Some server error
 */
router.get(
  '/:id',
  wrapAsync(async (req, res) => {
    const payload = await PatientsDBApi.findBy({ id: req.params.id });
    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
