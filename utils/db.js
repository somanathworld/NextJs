const {dbusername, dbpassword} = process.env
export const  dbconnect = `mongodb+srv://${dbusername}:${dbpassword}@cluster0.spoizjd.mongodb.net/practicedb?retryWrites=true&w=majority`