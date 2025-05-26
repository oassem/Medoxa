const express = require('express');
const cors = require('cors');
const app = express();
const passport = require('passport');
const path = require('path');
const fs = require('fs');
const bodyParser = require('body-parser');
const db = require('./db/models');
const config = require('./config');
const swaggerUI = require('swagger-ui-express');
const swaggerJsDoc = require('swagger-jsdoc');
const authRoutes = require('./routes/auth');
const fileRoutes = require('./routes/file');
const searchRoutes = require('./routes/search');
const pexelsRoutes = require('./routes/pexels');
const organizationForAuthRoutes = require('./routes/organizationLogin');
const openaiRoutes = require('./routes/openai');
const contactFormRoutes = require('./routes/contactForm');
const usersRoutes = require('./routes/users');
const appointment_rulesRoutes = require('./routes/appointment_rules');
const appointmentsRoutes = require('./routes/appointments');
const departmentsRoutes = require('./routes/departments');
const doctor_availabilitiesRoutes = require('./routes/doctor_availabilities');
const holidaysRoutes = require('./routes/holidays');
const imaging_investigationsRoutes = require('./routes/imaging_investigations');
const imaging_order_itemsRoutes = require('./routes/imaging_order_items');
const imaging_ordersRoutes = require('./routes/imaging_orders');
const insurancesRoutes = require('./routes/insurances');
const invoice_itemsRoutes = require('./routes/invoice_items');
const invoicesRoutes = require('./routes/invoices');
const lab_order_itemsRoutes = require('./routes/lab_order_items');
const lab_ordersRoutes = require('./routes/lab_orders');
const lab_testsRoutes = require('./routes/lab_tests');
const medicationsRoutes = require('./routes/medications');
const patient_documentsRoutes = require('./routes/patient_documents');
const patientsRoutes = require('./routes/patients');
const pharmacy_order_itemsRoutes = require('./routes/pharmacy_order_items');
const pharmacy_ordersRoutes = require('./routes/pharmacy_orders');
const sick_leavesRoutes = require('./routes/sick_leaves');
const visitsRoutes = require('./routes/visits');
const rolesRoutes = require('./routes/roles');
const permissionsRoutes = require('./routes/permissions');
const organizationsRoutes = require('./routes/organizations');

const getBaseUrl = (url) => {
  if (!url) return '';
  return url.endsWith('/api') ? url.slice(0, -4) : url;
};

const options = {
  definition: {
    openapi: '3.0.0',
    info: {
      version: '1.0.0',
      title: 'Medoxa',
      description:
        'Medoxa Online REST API for Testing and Prototyping application. You can perform all major operations with your entities - create, delete and etc.',
    },
    servers: [
      {
        url: getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || config.swaggerUrl,
        description: 'Development server',
      },
    ],
    components: {
      securitySchemes: {
        bearerAuth: {
          type: 'http',
          scheme: 'bearer',
          bearerFormat: 'JWT',
        },
      },
      responses: {
        UnauthorizedError: {
          description: 'Access token is missing or invalid',
        },
      },
    },
    security: [
      {
        bearerAuth: [],
      },
    ],
  },
  apis: ['./src/routes/*.js'],
};

const specs = swaggerJsDoc(options);
app.use(
  '/api-docs',
  function (req, res, next) {
    swaggerUI.host =
      getBaseUrl(process.env.NEXT_PUBLIC_BACK_API) || req.get('host');
    next();
  },
  swaggerUI.serve,
  swaggerUI.setup(specs),
);

app.use(cors({ origin: true }));
require('./auth/auth');

app.use(bodyParser.json());

app.use('/api/auth', authRoutes);
app.use('/api/file', fileRoutes);
app.use('/api/pexels', pexelsRoutes);
app.enable('trust proxy');

app.use(
  '/api/users',
  passport.authenticate('jwt', { session: false }),
  usersRoutes,
);

app.use(
  '/api/appointment_rules',
  passport.authenticate('jwt', { session: false }),
  appointment_rulesRoutes,
);

app.use(
  '/api/appointments',
  passport.authenticate('jwt', { session: false }),
  appointmentsRoutes,
);

app.use(
  '/api/departments',
  passport.authenticate('jwt', { session: false }),
  departmentsRoutes,
);

app.use(
  '/api/doctor_availabilities',
  passport.authenticate('jwt', { session: false }),
  doctor_availabilitiesRoutes,
);

app.use(
  '/api/holidays',
  passport.authenticate('jwt', { session: false }),
  holidaysRoutes,
);

app.use(
  '/api/imaging_investigations',
  passport.authenticate('jwt', { session: false }),
  imaging_investigationsRoutes,
);

app.use(
  '/api/imaging_order_items',
  passport.authenticate('jwt', { session: false }),
  imaging_order_itemsRoutes,
);

app.use(
  '/api/imaging_orders',
  passport.authenticate('jwt', { session: false }),
  imaging_ordersRoutes,
);

app.use(
  '/api/insurances',
  passport.authenticate('jwt', { session: false }),
  insurancesRoutes,
);

app.use(
  '/api/invoice_items',
  passport.authenticate('jwt', { session: false }),
  invoice_itemsRoutes,
);

app.use(
  '/api/invoices',
  passport.authenticate('jwt', { session: false }),
  invoicesRoutes,
);

app.use(
  '/api/lab_order_items',
  passport.authenticate('jwt', { session: false }),
  lab_order_itemsRoutes,
);

app.use(
  '/api/lab_orders',
  passport.authenticate('jwt', { session: false }),
  lab_ordersRoutes,
);

app.use(
  '/api/lab_tests',
  passport.authenticate('jwt', { session: false }),
  lab_testsRoutes,
);

app.use(
  '/api/medications',
  passport.authenticate('jwt', { session: false }),
  medicationsRoutes,
);

app.use(
  '/api/patient_documents',
  passport.authenticate('jwt', { session: false }),
  patient_documentsRoutes,
);

app.use(
  '/api/patients',
  passport.authenticate('jwt', { session: false }),
  patientsRoutes,
);

app.use(
  '/api/pharmacy_order_items',
  passport.authenticate('jwt', { session: false }),
  pharmacy_order_itemsRoutes,
);

app.use(
  '/api/pharmacy_orders',
  passport.authenticate('jwt', { session: false }),
  pharmacy_ordersRoutes,
);

app.use(
  '/api/sick_leaves',
  passport.authenticate('jwt', { session: false }),
  sick_leavesRoutes,
);

app.use(
  '/api/visits',
  passport.authenticate('jwt', { session: false }),
  visitsRoutes,
);

app.use(
  '/api/roles',
  passport.authenticate('jwt', { session: false }),
  rolesRoutes,
);

app.use(
  '/api/permissions',
  passport.authenticate('jwt', { session: false }),
  permissionsRoutes,
);

app.use(
  '/api/organizations',
  passport.authenticate('jwt', { session: false }),
  organizationsRoutes,
);

app.use(
  '/api/openai',
  passport.authenticate('jwt', { session: false }),
  openaiRoutes,
);

app.use('/api/contact-form', contactFormRoutes);

app.use(
  '/api/search',
  passport.authenticate('jwt', { session: false }),
  searchRoutes,
);

app.use('/api/org-for-auth', organizationForAuthRoutes);

app.use('/uploads', express.static(path.join(__dirname, '../uploads')));

const publicDir = path.join(__dirname, '../public');

if (fs.existsSync(publicDir)) {
  app.use('/', express.static(publicDir));

  app.get('*', function (request, response) {
    response.sendFile(path.resolve(publicDir, 'index.html'));
  });
}

const uploadDir = path.join(__dirname, '..', 'uploads', 'patient_documents');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const PORT = process.env.NODE_ENV === 'dev_stage' ? 3000 : 8080;

db.sequelize.sync().then(function () {
  app.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
});

module.exports = app;
