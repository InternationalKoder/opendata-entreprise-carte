//import module 
var http = require("http");  
var url = require("url");  
  
function start(client,route,handle)  
{  
    //creat http serveur  
    http.createServer(function(request,response){  
        var pathname = url.parse(request.url).pathname;  
        console.log("Request for " + pathname + " received.");  
        route(client,handle,pathname,response);  
    }).listen(8888);   //port 
  
    console.log("Server has started.");  
}  
  
exports.start = start;  