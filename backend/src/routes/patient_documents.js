const express = require('express');
const multer = require('multer');
const Patient_documentsService = require('../services/patient_documents');
const Patient_documentsDBApi = require('../db/api/patient_documents');
const wrapAsync = require('../helpers').wrapAsync;
const router = express.Router();
const { parse } = require('json2csv');
const { checkCrudPermissions } = require('../middlewares/check-permissions');

// Configure storage for uploaded files
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, 'uploads/patient_documents/');
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + '-' + file.originalname);
  },
});

const upload = multer({ storage: storage });

router.use(checkCrudPermissions('patient_documents'));

/**
 *  @swagger
 *  components:
 *    schemas:
 *      Patient_documents:
 *        type: object
 *        properties:
 *          document_type:
 *            type: string
 *            default: document_type
 *          document_url:
 *            type: string
 *            default: document_url
 */

/**
 *  @swagger
 * tags:
 *   name: Patient_documents
 *   description: The Patient_documents managing API
 */

/**
 *  @swagger
 *  /api/patient_documents:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
 *      summary: Add new item
 *      description: Add new item
 *      requestBody:
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                patient:
 *                  type: string
 *                  description: Patient ID
 *                document_type:
 *                  type: string
 *                  description: Document type
 *                document_file:
 *                  type: string
 *                  format: binary
 *                  description: The file to upload
 *                organizations:
 *                  type: string
 *                  description: Organization ID
 *      responses:
 *        200:
 *          description: The item was successfully added
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patient_documents"
 *        401:
 *          $ref: "#/components/responses/UnauthorizedError"
 *        405:
 *          description: Invalid input data
 *        500:
 *          description: Some server error
 */
router.post(
  '/',
  upload.single('document_file'),
  wrapAsync(async (req, res) => {
    const referer =
      req.headers.referer ||
      `${req.protocol}://${req.hostname}${req.originalUrl}`;
    const link = new URL(referer);

    // Build the data object, using the uploaded file's path
    const data = {
      ...req.body,
      document_url: req.file ? req.file.path : null, // Store file path in DB
    };

    await Patient_documentsService.create(
      data,
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
 *    tags: [Patient_documents]
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
 *                $ref: "#/components/schemas/Patient_documents"
 *    responses:
 *      200:
 *        description: The items were successfully imported
 *    content:
 *      application/json:
 *        schema:
 *          $ref: "#/components/schemas/Patient_documents"
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
    await Patient_documentsService.bulkImport(req, res, true, link.host);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patient_documents/{id}:
 *    put:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
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
 *        required: true
 *        content:
 *          multipart/form-data:
 *            schema:
 *              type: object
 *              properties:
 *                patient:
 *                  type: string
 *                  description: Patient ID
 *                document_type:
 *                  type: string
 *                  description: Document type
 *                document_file:
 *                  type: string
 *                  format: binary
 *                  description: The file to upload (optional, only if updating file)
 *                organizations:
 *                  type: string
 *                  description: Organization ID
 *      responses:
 *        200:
 *          description: The item data was successfully updated
 *          content:
 *            application/json:
 *              schema:
 *                $ref: "#/components/schemas/Patient_documents"
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
  upload.single('document_file'),
  wrapAsync(async (req, res) => {
    const data = {
      ...req.body,
      document_url: req.file ? req.file.path : req.body.document_url,
    };

    await Patient_documentsService.update(
      data,
      req.body.id || req.params.id,
      req.currentUser,
    );

    res.status(200).send(true);
  }),
);

/**
 * @swagger
 *  /api/patient_documents/{id}:
 *    delete:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
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
 *                $ref: "#/components/schemas/Patient_documents"
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
    await Patient_documentsService.remove(req.params.id, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patient_documents/deleteByIds:
 *    post:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
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
 *                $ref: "#/components/schemas/Patient_documents"
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
    await Patient_documentsService.deleteByIds(req.body.data, req.currentUser);
    const payload = true;
    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patient_documents:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
 *      summary: Get all patient_documents
 *      description: Get all patient_documents
 *      responses:
 *        200:
 *          description: Patient_documents list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patient_documents"
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
    const payload = await Patient_documentsDBApi.findAll(
      req.query,
      globalAccess,
      { currentUser },
    );

    if (filetype && filetype === 'csv') {
      const fields = ['id', 'document_type'];
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
 *  /api/patient_documents/count:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
 *      summary: Count all patient_documents
 *      description: Count all patient_documents
 *      responses:
 *        200:
 *          description: Patient_documents count successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patient_documents"
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
    const payload = await Patient_documentsDBApi.findAll(
      req.query,
      globalAccess,
      { countOnly: true, currentUser },
    );

    res.status(200).send(payload);
  }),
);

/**
 *  @swagger
 *  /api/patient_documents/autocomplete:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
 *      summary: Find all patient_documents that match search criteria
 *      description: Find all patient_documents that match search criteria
 *      responses:
 *        200:
 *          description: Patient_documents list successfully received
 *          content:
 *            application/json:
 *              schema:
 *                type: array
 *                items:
 *                  $ref: "#/components/schemas/Patient_documents"
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
  const payload = await Patient_documentsDBApi.findAllAutocomplete(
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
 *  /api/patient_documents/{id}:
 *    get:
 *      security:
 *        - bearerAuth: []
 *      tags: [Patient_documents]
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
 *                $ref: "#/components/schemas/Patient_documents"
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
    const payload = await Patient_documentsDBApi.findBy({ id: req.params.id });
    res.status(200).send(payload);
  }),
);

router.use('/', require('../helpers').commonErrorHandler);

module.exports = router;
