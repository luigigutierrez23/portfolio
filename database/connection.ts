import { connect } from 'mongoose';

const dbConnection = async () => {
  try {
    await connect( process.env.MONGO_URI, (error) => {
        if(error) { throw error; }
        console.log('Database connection Ok');
    });
  } catch (error) {
    throw new Error('Database error');
  }
};

export default dbConnection;