var fs = require('fs');

var serverModule = {};
exports.serverModule = serverModule;

var checkUrls = function(url){
	return fs.existsSync(url) ? url : 'index.html';
};

serverModule.getFileNameFromUrl = function(url){
	if(url.match(/\?/)) return {url : url.split("?")[0].substr(1), data: url.split("?")[1]};
	return {url : checkUrls(url.substr(1))};
};

serverModule.getDataOnly = function(wholeData){
	var seperatedNameComment = wholeData.split("&");
	var onlyNameAndComment = seperatedNameComment.map(function(part){
		return part.split("=")[1];
	});
	return onlyNameAndComment;
};

serverModule.appendCurrentDate = function(text){
	var date = new Date();
	return date.toDateString()+ " "+date.toLocaleTimeString() + " " +text;
};

serverModule.replaceJoiners = function(dataWithJoiners){
	if(dataWithJoiners.match(/\+/g)) return dataWithJoiners.replace(/\+/g, ' ');
	return dataWithJoiners;
};

var putPTag= function(data){
	return data.split("\n").map(function(text){ return '<p>'+ text +'</p>' }).join("");
}

serverModule.makeParagraph = function(text){
	if(text.match(/\n/)) return putPTag(text);
	return '<p>'+ text +'</p>';
};

serverModule.decorateText = function(data){
	return serverModule.replaceJoiners(data[0]) + ' ' + serverModule.replaceJoiners(data[1])+'\n';
};

serverModule.getReversedList = function(text){
	return text.split('\n').reverse().join("\n");
};