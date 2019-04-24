var http = require('http');
var express = require('express');
var path = require('path');
const mariadb = require('mariadb');
var config = require('./config/config.js').info;
const business = require('./business/businessLogic');

var bodyParser = require('body-parser');
//익스프레스 객체생성
var app = express();

//기본 속성 설정
app.set('port', process.env.PORT || config.webport);

//body-parser를 사용해 application/x-www-form-urlencoded 파싱
app.use(bodyParser.urlencoded({ extended : false}));
//body-parser를 사용해 application/json 파싱
app.use(bodyParser.json());
//정적 공통경로 설정
app.use(express.static(path.join(__dirname, 'views')));

const pool = mariadb.createPool({host : 'localhost', port:'3306', user:'user1', password:'1234', database:'chat', connectionLimit:5});
app.set('pool',pool);

//socket.io
var socketio = require('socket.io');

//cors사용 - 클라이언트에서 ajax로 요청하면 CORS 지원
var cors = require('cors');
app.use(cors());

var expressErrorHandler = require('express-error-handler');
var errorHandler = expressErrorHandler({
	static : {
		'404'  : './views/error.html'
	}
});

app.use(expressErrorHandler.httpError(404));
app.use(errorHandler);

//익스프레스 서버 시작
var server = http.createServer(app).listen(app.get('port'), function(){
	console.log('테스트 서버를 시작했습니다. :' + app.get('port'));
});

//socket io 서버시작
var io = socketio.listen(server);
console.log('socket.io 요청을 받아들일 준비가 되어있습니다.');

var login_ids = {};

function sendResponse(socket, command, code, message){
	var statusObj = {command:command, code:code, message:message};
	socket.emit('response', statusObj);
}

function getRoomList(){
	var roomList = [];
	
	Object.keys(io.sockets.adapter.rooms).forEach(function(roomId){
		console.log('current room id : ' + roomId);
		var outRoom = io.sockets.adapter.rooms[roomId];
		
		var foundDefault = false;
		var index = 0;
		Object.keys(outRoom.sockets).forEach(function(key){
			console.log('#' + index + ':' + key + ', ' + outRoom.sockets[key]);
			
			if(roomId == key){
				foundDefault = true;
				console.log("this is default room.");
			}
			index++;
		});
		
		if(!foundDefault){
			roomList.push(outRoom);
		}
	});
	
	console.log('[ROOM LIST]');
	console.dir(roomList);
	
	return roomList;
	
}

business.data_process(io);



