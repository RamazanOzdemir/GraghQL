const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');


const app = express();

// allow cross-orgin request
app.use(cors());

const uri = "mongodb+srv://rmzn:test1234@clusterfirst-cnnel.mongodb.net/GraphQLProje?retryWrites=true&w=majority";
mongoose.connect(uri,{ useNewUrlParser: true });
mongoose.connection.once('open',()=>{
  console.log("connection to db");
});

app.use('/graphql',graphqlHTTP({
  schema,
  graphiql : true
}));

app.listen(4000,()=>{
  console.log('now listining for request on port 4000');
})
