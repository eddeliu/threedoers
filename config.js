(function() {
  var config, key, locals;

  config = {
    logLevel: 'info',
    cookieSecret: 'This is a secret',
    debug: false,
    rootDir: __dirname,
    logFile: __dirname + '/log/error.log',
    site: 'http://3doers.it',
    host: {
      ip: process.env.OPENSHIFT_NODEJS_IP,
      port: process.env.OPENSHIFT_NODEJS_PORT,
      protocol: 'http'
    },
    io: {
      port: 8000
    },
    db: {
      name: 'imake',
      host: 'mongodb://imake:3m1k2M4ng4@ds033617.mongolab.com:33617/'
    },
    mailer: {
      service: 'Mandrill',
      username: '3doers@gmail.com',
      password: 'tYhdoBQgtOtpeYn4ZSlyXg',
      noReply: 'no-reply@3doers.it'
    },
    registration: {
      activation: {
        subject: "Activate your account"
      }
    },
    project: {
      payed: {
        subject: "Project was payed."
      }
    },
    printing: {
      accept: {
        subject: "Your project was accepted by a printer"
      }
    },
    admins: {
      emails: ['3doers@gmail.com']
    },
    python: {
      path: __dirname + '/src/stlstats.py',
      bin: '~/app-root/data/3doers-pyenv/bin/python'
    },
    upload: {
      to: (process.env.OPENSHIFT_DATA_DIR || '') + '3doers/uploads/'
    },
    paypal: {
      port: 5000,
      api: {
        host: "api.sandbox.paypal.com",
        port: "",
        client_id: "AZrTbRDZWrirQKBM6U0xlh2QbDhy-YgzhviBgD9dIhV6EoXePHBPVGD99hD6",
        client_secret: "ENKeHRBEcHZ3TdTdNUHpkKqd9ktHYwTYZQur6XrGtY-BttLKsDRc6ZRa_uE-"
      }
    }
  };

  try {
    locals = require('./locals');
    for (key in locals) {
      config[key] = locals[key];
    }
  } catch (_error) {

  }

  module.exports = config;

}).call(this);
