import * as crypto from "crypto"
import * as tgm from "./../authTgm/authTgm"
import delay from "delay"


import * as MongoDB from 'mongodb'
const MongoClient = MongoDB.MongoClient;


const url = 'mongodb://localhost:27017';
const dbName = 'labAuth';




export default async function init(salt: string) {
  let client: MongoDB.MongoClient
  
  while (true) {
    try {
      client = await MongoClient.connect(url, { useUnifiedTopology: true });
      break;
    }
    catch(e) {
      console.error("Failed to connect to DB, retrying in 5sec")
      await delay(5000)
    }
  }
  

  const db = client.db(dbName);

  const sessionCollection = db.collection('session');
  const cardCollection = db.collection('card');

  sessionCollection.deleteMany({})


  return {
    async createTeacherSession(teacherUsername: string) {
      let sha = crypto.createHash('sha512');
      sha.update(Math.random().toString() + salt);
      let key = sha.digest("base64")
    
      await sessionCollection.insertOne({teacherUsername: teacherUsername, sessKey: key})

    
      
      return key;
    },

    getCardData(hashedCardId: string) {
      return cardCollection.findOne({id: hashedCardId})
    },

    async startUnit(sessKey: string, metaData: any) {
      metaData.start = new Date()
      delay(metaData.hours * 60 * 60 * 1000).then(() => {
        this.destroySession(sessKey)
      })
      await sessionCollection.findOneAndUpdate({sessKey}, {sessKey, metaData})
    },

    async getUnitData(sessKey: string) {
      let e = await sessionCollection.findOne({sessKey})
      delete e.sessKey
      return e
    },

    async getLdapAuthData(username: string, password: string) {
      try {
        return await tgm.auth(username, password)
      }
      catch(e) {
        return null
      }
    },

    async saveCardData(personData: any, cardId: string) {
      await cardCollection.insertOne({cardId, personData})
    },
    
    async destroySession(sessKey: string) {
      await sessionCollection.updateOne({sessKey}, { $unset: {sessKey} })
    },

    isStudent(data: any) {
      if (!data) return null
      return data.type === "student"
    },

    async registerStudent(studentData: any, lessonData: any) {
      // await cardCollection.insertOne(data)
    },
  }

  
}
