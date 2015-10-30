var show = function(){
	document.getElementById("waterFlower").style.visibility = 'visible';
};

var hideIt = function(){
	setTimeout(show,1000);
	document.getElementById("waterFlower").style.visibility = 'hidden';
};

var hide = function(){
	hideIt();
};
