var net = require('net');
var readline = require('readline');
  
// const client = net.connect({port: 8080}, function(socket) {
//    console.log('connected to server!');
// });

const client = new net.Socket();
// 
client.connect(8080,'34.136.47.226', () => {
     console.log('connected to server!');
     promptUser();
});

const rl = readline.createInterface({
   input: process.stdin,
   output: process.stdout
});

//client.write('I am your client!\r\n');

client.on('data', function(data) {
   console.log('Server returns: ' + data);
   if (data.toString().includes("close connection")) {
      client.destroy();
   } else {
      promptUser();
   }
   //console.log(data.toString());
});


client.on('close', function() {
   console.log('disconnected from server');
   rl.close();
});



function promptUser() {

   rl.question('Enter something: ', function (input) {
       // Send user input to the server
       client.write(input);

       // Close the readline interface
       //rl.close();
   });
}



// As a group modify the code to 
// 1. so that the client application reads a user input from the console and sends it to the server
// to capitalize it.
// 2. If the user enters “exit” in the console, the client application ends, but the server remains
// open.
// 3. the client application reads user inputs and send them to the server. The client application
// keeps the connection open with the server, until user inputs an end command such as “exit”
// or “end”