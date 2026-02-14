import mongoose from 'mongoose';

let mongoServer: any;

export const connectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    try {
      const { MongoMemoryServer } = await import('mongodb-memory-server');
      mongoServer = await MongoMemoryServer.create();
      const mongoUri = mongoServer.getUri();

      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongoUri);
      }
    } catch (error) {
      console.log('MongoDB Memory Server not available, using test database');
      const mongoUri = process.env.MONGODB_URI_TEST || 'mongodb://localhost:27017/auth-service-test';
      if (mongoose.connection.readyState !== 1) {
        await mongoose.connect(mongoUri);
      }
    }
  }
};

export const disconnectDB = async () => {
  if (process.env.NODE_ENV === 'test') {
    await mongoose.disconnect();
    try {
      await mongoServer?.stop();
    } catch (error) {
      // Ignore error if mongoServer is not available
    }
  }
};

export const clearDB = async () => {
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    const collection = collections[key];
    await collection.deleteMany({});
  }
};
