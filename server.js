var http = require('http');
var fs = require('fs');
var module = require('./serverModule.js').serverModule;

const PORT = 3000;

var getDataForGuest = function(url,list){
		fs.writeFileSync(url,fs.readFileSync('./templates/guestBookHeader.html','utf8'));
		fs.appendFileSync(url,list);
		fs.appendFileSync(url, fs.readFileSync('./templates/guestBookFooter.html','utf8'));
		return fs.readFileSync(url);
};

var handleRequest = function(request, response){
	var dataAndUrl = module.getFileNameFromUrl(request.url);
	var data = fs.readFileSync(dataAndUrl.url);

	if(dataAndUrl.data){
		var fullData = module.getDataOnly(dataAndUrl.data);
		var text = module.decorateText(fullData);
		var withDate = unescape(module.appendCurrentDate(text));
		fs.appendFileSync('user_data.txt',withDate);
		var reversedList = module.getReversedList(fs.readFileSync('user_data.txt','utf8'));
		var paragraphedList = module.makeParagraph(reversedList);
		var data = getDataForGuest(dataAndUrl.url,paragraphedList);
	}

	console.log(request.connection.remoteAddress);

	response.write(data,'utf8');
    response.end();
}

var connecToServer = function(port){
	var server = http.createServer(handleRequest);
	server.listen(port, function(){
	    console.log("Server listening on: ", port);
	});
};

connecToServer(PORT);


