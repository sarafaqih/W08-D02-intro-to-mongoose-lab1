const customer = require('./models/customer.js');

const dotenv = require('dotenv');
dotenv.config();
const mongoose = require('mongoose');

const prompt = require('prompt-sync')();

const username = prompt('What is your name? ');

console.log(`Welcome ${username}`);

const userAction = prompt('What action you would like to take? (1. Create, 2. View, 3. Update, 4. Delete, 5. Quit)');


async function CreateCustomer(customerName, customerAge){
    const customerData = {
        name: customerName,
        age: customerAge
    }
    const newCustomer = await customer.create(customerData)
    console.log("New Customer", newCustomer)
}

async function getAllCustomers(){
    const customers = await customer.find({})
    console.log("Customers:", customers)
}

async function updateCustomer(){
    const customers = await customer.find({}, {id: 1, name:1, age:1})
    console.log("Below is a list of customers: ")
    console.log(customers)
    const customerid = prompt('Copy and paste the id of the customer you would like to update here: ');
    const updatedCustomerName = prompt('What is the customers new name?');
    const updatedCustomerAge = prompt('What is the customers new age?');

    const updatedCustomer = await customer.findByIdAndUpdate(customerid, {name:updatedCustomerName, age: updatedCustomerAge})
    console.log("Updated Customer", updatedCustomer)

}

async function deleteCustomer(){
    const customers = await customer.find({}, {id: 1, name:1, age:1})
    console.log("Below is a list of customers: ")
    console.log(customers)
    const customerid = prompt('Copy and paste the id of the customer you would like to delete here: ');

    const deletedCustomer = await customer.findByIdAndDelete(customerid)
    console.log("Deleted Customer", deletedCustomer)

}




const connect = async () => {
    // Connect to MongoDB using the MONGODB_URI specified in our .env file.
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
  
    // Call the runQueries function, which will eventually hold functions to work
    // with data in our db.
    await runQueries()
  
    // Disconnect our app from MongoDB after our queries run.
    await mongoose.disconnect();
    console.log('Exisiting ...');
    // Close our app, bringing us back to the command line.
    process.exit();
  };
  
  // queries.js
  const runQueries = async () => {
      console.log('Queries running.');
      if(userAction === '1'){
        console.log(`${username} would like to Create`);
    
        const customerName = prompt('What is the customer name?');
        const customerAge = prompt('What is the customer age?');
    
       await CreateCustomer(customerName, customerAge)
    
    }
    else if(userAction === '2'){
        console.log(`${username} would like to View`);
        await getAllCustomers()    
    }
    else if(userAction === '3'){
        console.log(`${username} would like to Update`);
        await updateCustomer()
    }
    else if(userAction === '4'){
        console.log(`${username} would like to Delete`);
        await deleteCustomer()
    }
    else if(userAction === '5'){
        //quit=true
        console.log(`${username} would like to Quit`);
        mongoose.connection.close()
        console.log('Exisiting ... ')
    }
    else {
        console.log(`Dear ${username}, please enter a valid action number!`); 
    }
  };
      // The functions calls to run queries in our db will go here as we write them.
  
  connect()
