import 'dotenv/config';
import 'reflect-metadata';

// Validate env
import './shared/config/env.validation.js';

// Load DI container
import './container/index.js';

import { MongoConnect } from './infrastructure/database/mongo/mongoConnect.js';

import { startServer } from './presentation/http/http_server.js';

async function startApp() {
  try {
    console.log('🔄 Starting application...');

    // DB connection
    const mongoConnect = new MongoConnect();
    await mongoConnect.connectDB();

    // Start server
    startServer();

    console.log('✅ Application started successfully');
  } catch (error) {
    console.error('❌ Failed to start app', error);
    process.exit(1);
  }
}

startApp();
