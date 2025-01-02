const customer = require('./models/cutstomer.js');

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Welcome ${username}`);

const userAction = prompt('What action you would like to take? (1. Create, 2. View, 3. Update, 4. Delete, 5. Quit)');

let quit=false

if(userAction === '1'){
    console.log(`${username} would like to Create`);
}
else if(userAction === '2'){
    console.log(`${username} would like to View`);
}
else if(userAction === '3'){
    console.log(`${username} would like to Update`);
}
else if(userAction === '4'){
    console.log(`${username} would like to Delete`);
}
else if(userAction === '5'){
    quit=true
    console.log(`${username} would like to Quit`);
}
else {
    console.log(`Dear ${username}, please enter a valid action number!`); 
}

const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  
    // Call the runQueries function, which will eventually hold functions to work
    // with data in our db.
    await runQueries()
  
    // Disconnect our app from MongoDB after our queries run.
    if(quit===true){
    await mongoose.disconnect();
    console.log('Disconnected from MongoDB');
  }
    // Close our app, bringing us back to the command line.
    process.exit();
  };
  
  // queries.js
  const runQueries = async () => {
      console.log('Queries running.');
      //await createTodo();
      //await getAllToDos()
      //await getToDoById()
      //await findOneToDo()
      //await UpdateOneToDoByID()
      // await UpdateOneToDo()
      // await UpdateManyToDo()
      // await deleteOneToDo()
      //await deleteToDoByID()
    };
      // The functions calls to run queries in our db will go here as we write them.
  
  connect()
