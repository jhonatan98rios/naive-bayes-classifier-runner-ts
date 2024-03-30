import mongoose from 'mongoose'
import * as dotenv from 'dotenv'
import { InternalServerError } from 'elysia';
import { handlePromise } from '../../utils/handlePromise';

dotenv.config()

let cachedDb: typeof mongoose | null = null;

export default class Database {

  static async connect() {
    mongoose.set("strictQuery", false);

    if (cachedDb) {
      return cachedDb;
    }

    const DATABASE_USER = process.env.DATABASE_USER
    const DATABASE_PASS = process.env.DATABASE_PASS
    const DATABASE_NAME = process.env.DATABASE_NAME
    const DATABASE_HOST = process.env.DATABASE_HOST

    const connectionString = `mongodb+srv://${DATABASE_USER}:${DATABASE_PASS}@${DATABASE_HOST}/${DATABASE_NAME}?retryWrites=true&w=majority`
    
    const [err, conn] = await handlePromise<typeof mongoose>(mongoose.connect(connectionString)) 
    if (err) throw new InternalServerError(`Database connection error: ${err}`)

    cachedDb = conn
    return conn
  }
}


