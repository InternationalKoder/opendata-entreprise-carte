function select(client,response)  
{  
    console.log("Request handler 'select' was called.");  
    //  excute sql script 
    client.query("select * from teacher;",function(error,results){  
        console.log("in callback function.\n");  
        if (error)  
        {  
            console.log("error");  
            console.log('GetData Error: ' + error.message);  
            client.end();  
            return;  
        }  
        if(results.rowCount > 0)  
        {  
            //callback(results);   
            //outpout format in json
            response.writeHead(200,{"Content-Type":"application/json"});         
  
            //transform result string to json, print in the web
  
 response.write(JSON.stringify(results)); response.end(); } });}  
  
exports.select = select;  