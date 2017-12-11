/*
* GET home page.
*/
 
exports.index = function(req, res){
    var message = '';
	var sess = req.session; 
	userId = req.session.userId;
	
	
	if(userId == null){
		res.render('login',{message: message});
	}else{
		res.redirect('index');
	}
};