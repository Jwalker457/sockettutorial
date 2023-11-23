
const moment = require('moment');
var net = require('net');

// const { connect } = require('http2');
// const { threadId } = require('worker_threads');

var server = net.createServer(function(socket) {
   console.log('client connected');

   socket.on('end', function() {
      console.log('client disconnected');
   });

   socket.on('data', function(data) {
      let text = data.toString();
      ///console.log(data.toString());
      //socket.write(text.toUpperCase());

      if (text == "DATE") {
         // Return Date 
         socket.write(moment().format("YYYY-MM-DD") + "/n");
      } else if (text == "TIME") {
         socket.write(moment().format("HH,mm,ss" + "/n"));
      } else if (text == "EXIT") {
         socket.end("ending connection");
      } else {
         socket.write("Invalid Input!");
      }


   });

   

   //socket.pipe(socket);
});



server.listen(8080, function() {
   console.log('server is listening');
});