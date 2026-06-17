import 'dotenv/config';
import 'reflect-metadata';

import './shared/config/env.validation.js';

import './container/index.js';

import { MongoConnect } from './infrastructure/database/mongo/mongoConnect.js';

import { startServer } from './presentation/http/http_server.js';

async function startApp() {
  try {
    console.log('🔄 Starting application...');

    const mongoConnect = new MongoConnect();
    await mongoConnect.connectDB();
    startServer();

    console.log('✅ Application started successfully');
  } catch (error) {
    console.error('❌ Failed to start app', error);
    process.exit(1);
  }
}

startApp();
