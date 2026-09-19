import dns from 'dns';
import mongoose from 'mongoose';

import { DEV_DB_URL, NODE_ENV, PROD_DB_URL } from './serverConfig.js';
dns.setServers(['0.0.0.0', '1.1.1.1']);
export default async function connectDB() {
  try {
    if (NODE_ENV == 'development') {
      await mongoose
        .connect(DEV_DB_URL, {
          dbName: 'clientDB'
        })
        .then(() => {
          console.log('DB connect Successfully');
        })
        .catch((e) => {
          console.log('Error is occured : ', e);
        });
    } else if (NODE_ENV == 'production') {
      await mongoose
        .connect(PROD_DB_URL, {
          dbName: 'ProdUser'
        })
        .then(() => {
          console.log('DB connect successfully...');
        })
        .catch((e) => {
          console.log('error occured, ', e);
        });
    }
  } catch (e) {
    console.error(e);
  }
}
