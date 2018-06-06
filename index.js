var express = require('express');
var graphqlHTTP = require('express-graphql');
var { makeExecutableSchema } = require('graphql-tools');

var app = express();

var users = [
    { id: "user_0", fname: "Gopi", lname: "Krishna", age: 25 },
    { id: "user_1", fname: "Prudvi", lname: "Raj", age: 22 },
    { id: "user_2", fname: "Punneth", lname: "Varma", age: 28 }
];

var friends = [
    { id: "friend_0", name: "Chari", age: 24, userIds:"user_0"},
    { id: "friend_1", name: "Naresh", age: 22, userIds:"user_1"},
    { id: "friend_2", name: "Sriram", age: 28, userIds: "user_2"}
];

var dogs = [
    { id: "dog_0", name: "Germanshepard", friendId:"friend_1"},
    { id: "dog_1", name: "Husky",  friendId:"friend_0"},
    { id: "dog_2", name: "Gray Hound", friendId: "friend_2"}
]

var typeDefs = `
    type Users {
        id:ID!
        fname: String!
        lname: String!
        age: Int
        friends: Friends
    }
    type Friends {
        id:ID!
        name:String!
        age:Int
        dogs: Dogs
    }
    type Dogs {
        id:ID!
        name: String!
    }
    type Query {
        allUsers:[Users!]
        user(id: String): Users
    }
    type Mutation {
        updateUser(id: String): Users
    }
`

var resolvers = {
    Query: {
        allUsers:(root, args, context) => {
            return users
        },
        user: (root, args, context) => {
            return users.find(user => {
                if(user.id.toString() === args.id.toString()) {
                    return user;
                }
            });
        }
    },
    Mutation: {
        updateUser:(root, args, context) => {
            return users.find(user => {
                if(user.id.toString() === args.id.toString()) {
                    user.fname = "GKR";
                    return user;
                }
            });
        }
    },
    Users: {
        friends: (root, args, context) => {
            return friends.find(friend => {
                if(friend.userIds.toString() === root.id.toString()) {
                    return friend;
                }
            });
        }
    },
    Friends: {
        dogs: (root, args, context) => {
            return dogs.find(dog => {
                if(dog.friendId.toString() === root.id.toString()) {
                    return dog;
                }
            });
        }
    }
}

var schema = makeExecutableSchema({
    typeDefs,
    resolvers,
});

app.use('/graphql', graphqlHTTP({
    schema: schema,
    rootValue: global,
    graphiql: true
}));

app.use(express.static(__dirname + '/public'));

app.listen(4000,()=>console.log("Listening to the graphql"));