var http = require('http');
var express = require('express');
var path = require('path');
var config = require('./config/config.js').info;

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

var mongoose = require('mongoose');
var databaseUrl = config.databaseUrl;
var database;

//데이터베이스 연결
console.log('데이터 베이스 연결을 시도 합니다');
mongoose.Promise = global.Promise;
mongoose.connect(databaseUrl);
database = mongoose.connection;

database.on('error', console.error.bind(console, 'mongoose connection error'));
database.on('open', function(){
	console.log('데이터베이스에 연결되었습니다 :' + databaseUrl);
	app.set('database',database);
});

//socket.io
var socketio = require('socket.io');

//cors사용 - 클라이언트에서 ajax로 요청하면 CORS 지원
var cors = require('cors');
app.use(cors());

// 라우팅 등록(분산처리)
/*var prt = require('./routes/contProcess');
app.use('/', prt);*/

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

io.sockets.on('connection', function(socket){
	console.log('connection info : ', socket.request.connection._peername);
	//소켓 객체에 클라이언트 Host,Port정보 속성으로 추가
	socket.remoteAddress = socket.request.connection._peername.address;
	socket.remotePort = socket.request.connection._peername.port;
	
	//message 이벤트를 받았을때의 처리
	socket.on('message', function(message){
		console.log("message 이벤트를 받았습니다.");
		console.dir(message);
		if(message.recepient == 'All'){
			//나를 포함한 모든 클라이언트에게 메시지 전달
			console.dir("나를 포함한 모든 클라이언트에게 message 이벤트를 전송합니다");
			//나를 포함한 모두에게
			io.sockets.emit('message', message);
			//나를 제외한 모두에게
//			socket.broadcast.emit('message', message);
		} else {
			if(message.command == 'chat'){
				if(login_ids[message.recepient]){
					io.sockets.connected[login_ids[message.recepient]].emit('message', message);
					sendResponse(socket, 'message', '200', '메시지를 전송했습니다.');
				}else{
					//응답 메시지 전송
					sendResponse(socket, 'login', '404', '상대방의 로그인 ID를 찾을 수 없습니다');
				}
			}else if(message.command == 'groupchat'){
				//방에 들어 있는 모든 사용자에게 메세지 전달
				io.sockets.in(message.roomId).emit('message', message);
				sendResponse(socket, 'message', '200', '방 ['+ message.recepient + ']의 모든 사용자들에게 메시지를 전송했습니다.');
			}
			
		}
	});
	
	socket.on('login', function(login){
		console.log('login 이벤트를 받았습니다.');
		console.dir(login);
		console.log("socket.login_id::"+socket.login_id);
		//기존 클라이언트 ID가 없으면 클라이언트 ID를 맽에 추가
		console.log('접속한 소켓의 ID : ' + socket.id);
		login_ids[login.id] = socket.id;
		socket.login_id = login.id;
		console.log('접속한 클라이언트 ID 갯수 : %d', Object.keys(login_ids).length);
		
		//응답 메시지 전송
		sendResponse(socket, 'login', '200', '로그인 되었습니다');
	});
	
	socket.on('logout', function(logout){
		console.log('logout 이벤트를 받았습니다.');
		console.dir(logout);
		delete login_ids[logout.id];
		socket.login_id = '';
		console.log('접속한 소켓의 ID : ' + socket.id);
		sendResponse(socket, 'logout', '200', '로그아웃 되었습니다');
	});
	
	
	socket.on('room', function(room){
		console.log('room 이벤트를 받았습니다');
		console.dir(room);
		
		if(room.command == 'create'){
			//방 체크
			if(io.sockets.adapter.rooms[room.roomId]){
				console.log('방이 이미 만들어져있습니다');
			}else{
				console.log('방을 새로 만듭니다');
				socket.join(room.roomId);
				
				var curRoom = io.sockets.adapter.rooms[room.roomId];
				curRoom.id = room.roomId;
				curRoom.name = room.roomName;
				curRoom.owner = room.roomOwner;
			}
		}else if(room.command == 'update'){
			if(io.sockets.adapter.rooms[room.roomId]){
				var curRoom = io.sockets.adapter.rooms[room.roomId];
				curRoom.id = room.roomId;
				curRoom.name = room.roomName;
				curRoom.owner = room.roomOwner;
			}else{
				console.log('방이 만들어져 있지 있습니다');
			}
		}else if(room.command == 'delete'){
			if(io.sockets.adapter.rooms[room.roomId]){
				delete io.sockets.adapter.rooms[room.roomId];
			}else{
				console.log('방이 만들어져 있지 있습니다');
			}
		}else if(room.command == 'join'){
			socket.join(room.roomId);
			sendResponse(socket, 'room', '200', '방에 입장 되었습니다');
		}else if(room.command == 'leave'){
			socket.leave(room.roomId);
			sendResponse(socket, 'room', '200', '방에서 나갔습니다');
		}
		
		var roomList = getRoomList();
		var output = {command : 'list', rooms : roomList};
		console.log('클라이언트로 보낼 데이터 : ' + JSON.stringify(output));
		
		io.sockets.emit('room', output);
	});
});