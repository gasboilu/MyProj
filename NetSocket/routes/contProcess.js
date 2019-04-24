var express = require('express');
var router = express.Router();
var dataP = require('../businessData/dataProcess').process; 

// 라우팅 등록
router.route('/process/login').post(function (req,res){
	console.log('/process/login 처리함');
	var id = req.body.id;
	var password = req.body.pwd;
	dataP.init(req.app.get("database"));
	dataP.getUser(id,password,function(err,data){
		if(err){throw err;}
		
		if(data){
			var username = data[0].name;
			res.writeHead('200', {'Content-Type' : 'text/html; charset=utf-8'});
			res.write('<h1>로그인 성공</h1>');
			res.write('<div><p>사용자 아이디 : ' + id + '</p></div>');
			res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
			res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
			res.end();
		}else{
			res.writeHead('200', {'Content-Type' : 'text/html; charset=utf-8'});
			res.write('<h1>로그인 실패</h1>');
			res.write('<div><p>아이디와 비밀번호를 다시 확인 하십시오</p></div>');
			res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
			res.end();
		}
	});
});


router.route('/process/login2').get(function (req,res){
	console.log('/process/login2 처리함');
	var id = req.query.id;
	var password = req.query.pwd;
	dataP.init(req.app.get("database"));
	dataP.getUser(id,password,function(err,data){
		if(err){throw err;}
		
		if(data){
			var username = data[0].name;
			res.writeHead('200', {'Content-Type' : 'text/html; charset=utf-8'});
			res.write('<h1>로그인 성공</h1>');
			res.write('<div><p>사용자 아이디 : ' + id + '</p></div>');
			res.write('<div><p>사용자 이름 : ' + username + '</p></div>');
			res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
			res.end();
		}else{
			res.writeHead('200', {'Content-Type' : 'text/html; charset=utf-8'});
			res.write('<h1>로그인 실패</h1>');
			res.write('<div><p>아이디와 비밀번호를 다시 확인 하십시오</p></div>');
			res.write('<br><br><a href="/login.html">다시 로그인 하기</a>');
			res.end();
		}
	});
});

module.exports = router;
