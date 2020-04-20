import crypto from "crypto"


import * as MongoDB from 'mongodb'
const MongoClient = MongoDB.MongoClient;


const url = 'mongodb://localhost:27017';
const dbName = 'labAuth';




export default async function init() {
  let client = await MongoClient.connect(url, { useUnifiedTopology: true });

  const db = client.db(dbName);

  const sessionCollection = db.collection('session');


  return {
    async createTeacherSession(teacherUsername: string) {
      let sha = crypto.createHash('sha512');
      sha.update(Math.random().toString() + "10ß923ioqwenjadfsavdsölnuhgzxyftdgzftxdft76");
      let key = sha.digest("base64").toUpperCase();
    
      await sessionCollection.insertOne({teacherUsername: teacherUsername, sessKey: key})

    
      
      return key;
    }
  }
}
