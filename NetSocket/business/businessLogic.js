exports.data_process = function(io){
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
//				socket.broadcast.emit('message', message);
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
};

