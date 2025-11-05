import mongoose from 'mongoose'

const MONGO_URL = process.env.MONGO_URL

// DON'T throw at module import time. Some environments (like previews or
// when running parts of the app without a DB) should be able to import this
// file. Throwing inside dbConnect keeps errors local to runtime DB usage.

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (!MONGO_URL) {
    throw new Error(
      'Please define the MONGO_URL environment variable inside .env.local'
    )
  }
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      bufferCommands: false,
    }

    cached.promise = mongoose.connect(MONGO_URL, opts).then((mongoose) => {
      return mongoose
    })
  }

  try {
    cached.conn = await cached.promise
  } catch (e) {
    cached.promise = null
    throw e
  }

  return cached.conn
}

export default dbConnect