var database;
exports.process = {
	init : function (data){
		if(database === undefined){
			console.log("데이터 init");
			database = data;
		}
	},
	getUser : function (id,password,callback){
		//user 컬렉션 참조
		var users = database.collection('users');
		//아이디와 비밀번호를 사용해 검색
		users.find({"id" : id, "password" : password}).toArray(function(err, docs){
			if(err){
				callback(err,null);
				return;
			}
			
			if(docs.length > 0){
				console.log('아이디 [%s], 비밀번호 [%s]가 일치하는 사용자 찾음.', id, password);
				callback(null,docs);
			}else{
				console.log("일치하는 사용자를 찾지 못함");
				callback(null,null);
			}
		});
	}
};

//module.exports.process = process;


