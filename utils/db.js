const {dbusername, dbpassword} = process.env
export const  dbconnect = `mongodb+srv://${dbusername}:${dbpassword}@cluster0.spoizjd.mongodb.net/fakestore?retryWrites=true&w=majority`
