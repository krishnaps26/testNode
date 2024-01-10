const mongoose = require('mongoose')
const app = require('./app')
const portNo = 5000

mongoose.connect('mongodb+srv://yadavkshitij392001:YRvexDx3LNZcyJwD@cluster0.j1cjxrv.mongodb.net/').then(con => {
    console.log("database connected");
})

app.listen(portNo,()=>{
    console.log(`server is running on port ${portNo}`);
});
