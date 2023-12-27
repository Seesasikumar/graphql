const express = require('express');
const{graphqlHTTP} = require('express-graphql');
const {GraphQLSchema, GraphQLObjectType, GraphQLList, GraphQLInt, GraphQLString} = require('graphql');
const fs = require('fs');
const path= require('path');
const cors = require('cors');
const app = express();

const jsonData = fs.readFileSync(path.resolve(__dirname, 'db.json'), 'utf-8');
const data = JSON.parse(jsonData);

const UserType = new GraphQLObjectType({
    name: 'User',
    fields:{
        userid:{type:GraphQLInt},
        name:{type:GraphQLString},
        email:{type: GraphQLString},
    },
});

//app.use(cors());
const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields:{
        users:{
            type: new GraphQLList(UserType),           
            resolve: ()=>data.users          
        },
    },
});

const schema = new GraphQLSchema(
    {
        query: RootQuery,
    }
);

app.use(cors());
app.use(
    '/graphql',
    graphqlHTTP({
        schema:schema,
        graphiql: true,
    })
);

const PORT = 3001;
app.listen(PORT, ()=>{
    console.log(`app is running on port ${PORT}`);
})

