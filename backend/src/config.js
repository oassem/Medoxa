const os = require('os');
const path = require('path');

const config = {
  gcloud: {
    bucket: 'fldemo-files',
    hash: '74805ce28732d8c90a30ea66ec0f84fd',
  },
  bcrypt: {
    saltRounds: 12,
  },
  admin_pass: '2231a1c1',
  user_pass: 'c69e460bf391',
  admin_email: 'admin@flatlogic.com',
  providers: {
    LOCAL: 'local',
    GOOGLE: 'google',
    MICROSOFT: 'microsoft',
  },
  secret_key: process.env.SECRET_KEY || 'mySuperSecretKey',
  remote: '',
  port: process.env.NODE_ENV === 'production' ? '' : '8080',
  hostUI: process.env.NODE_ENV === 'production' ? '' : 'http://localhost',
  portUI: process.env.NODE_ENV === 'production' ? '' : '3000',
  portUIProd: process.env.NODE_ENV === 'production' ? '' : ':3000',
  swaggerUI: process.env.NODE_ENV === 'production' ? '' : 'http://localhost',
  swaggerPort: process.env.NODE_ENV === 'production' ? '' : ':8080',
  google: {
    clientId: process.env.GOOGLE_CLIENT_ID || '',
    clientSecret: process.env.GOOGLE_CLIENT_SECRET || '',
  },
  microsoft: {
    clientId: process.env.MS_CLIENT_ID || '',
    clientSecret: process.env.MS_CLIENT_SECRET || '',
  },
  uploadDir: path.join(__dirname, '../uploads'),
  email: {
    from: 'Medoxa <app@flatlogic.app>',
    host: 'sandbox.smtp.mailtrap.io',
    port: 587,
    auth: {
      user: process.env.EMAIL_USER || '8b2f229dd32c01',
      pass: process.env.EMAIL_PASS || '08363c3ddd9f50',
    },
    tls: {
      rejectUnauthorized: false,
    },
  },
  roles: {
    super_admin: 'Super Administrator',
    admin: 'Administrator',
    user: 'Medical Intern',
  },
  project_uuid: '2231a1c1-a63e-4528-8359-c69e460bf391',
  flHost:
    process.env.NODE_ENV === 'production' ||
      process.env.NODE_ENV === 'dev_stage'
      ? 'https://flatlogic.com/projects'
      : 'http://localhost:3000/projects',
};

config.pexelsKey = process.env.PEXELS_KEY || 'DixuYMDWS28d6aHGNT9fVrveCen6SbadVTr1T9N4R1u1vfthOD05DyuO';
config.pexelsQuery = 'Abstract healthcare technology concept';
config.host =
  process.env.NODE_ENV === 'production' ? config.remote : 'http://localhost';
config.apiUrl = `${config.host}${config.port ? `:${config.port}` : ``}/api`;
config.swaggerUrl = `${config.swaggerUI}${config.swaggerPort}`;
config.uiUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}/#`;
config.backUrl = `${config.hostUI}${config.portUI ? `:${config.portUI}` : ``}`;

module.exports = config;
