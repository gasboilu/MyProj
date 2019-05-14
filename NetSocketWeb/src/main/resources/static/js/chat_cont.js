var host = "localhost";
var port = "3000";
var socket;

var roomData = {
	setRoomInfo : function(roomObj){
		$("#roomInfo").val(JSON.stringify(roomObj));
	},
	getRoomInfo : function(){
		return JSON.parse($("#roomInfo").val());
	},
	getJsonRoomInfo : function(){
		return $("#roomInfo").val();
	}
};

var htmlCont = {
	strHtml : "",
    talkTimeLine : function(msgObj) {
    	var timeLine = "";
    	timeLine += " <div class='timeline'>";
		timeLine += " 	<span class='date'>" + msgObj.message_day + "</span>";
		timeLine += " </div>";
		$(".talkWrap").append(timeLine);
    },
    myviewHtml : function(msgObj){
    	this.strHtml = "<div class='msg-wrap cl'>";
    	this.strHtml += "	 <div class='msg-bx'>";
    	this.strHtml += "		<div class='msg'>" + msgObj.message + "</div>";
    	this.strHtml += "		<span class='readCh'> " + msgObj.message_view + " </span>";
    	this.strHtml += "		<span class='timestamp'>" + msgObj.message_date + "</span>";
    	this.strHtml += "	</div>";
    	this.strHtml += "</div>";
    },
    yourviewHtml : function(msgObj){
    	this.strHtml = "<div class='msg-wrap sv'>";
    	this.strHtml += "	<div class='visual'>";
    	this.strHtml += "		<img src='/img/chat/mom_1.png' alt='' />";
    	this.strHtml += "	</div>";
    	this.strHtml += "	<div class='msg-bx'>";
    	this.strHtml += "		<span class='name'>" + msgObj.from_name + "</span>";
    	this.strHtml += "		<div class='msg'>" + msgObj.message + "</div>";
    	this.strHtml += "		<span class='timestamp'>" + msgObj.message_date + "</span>";
    	this.strHtml += "	</div>";
    	this.strHtml += "</div>";
    }
};

var deviceCont = {
    init : function() {
    	var options = {"forceNew" : true};
    	var url = "http://" + host + ":" + port;
    	console.log("socket url : "+url);
    	socket = io.connect(url,options);
    	console.log(socket);
    },
    setAjaxProcess : function(params,urlStr,callback){
    	//2. 채팅방 신규인지 아닌지 체크
		 $.ajax({
			type : "post",
			url : urlStr,
			data : params,
			dataType : "json",
			success : callback,
			error : function() {
				//나중에 통합으로 처리 변경
			}
		});
    },
    resultRoomProcess : function(data){
    	var roomInfo = data.resultData.roomInfo;
    	roomData.setRoomInfo(roomInfo);
    	var msgList = data.resultData.msgList;
    	var dateCheck = "";
    	for(var i = 0 ; i < msgList.length ; i++){
    		var msgObj = msgList[i];
    		//타임라인 체크필요
    		if(dateCheck.length == 0){
    			dateCheck = msgObj.day;
    			htmlCont.talkTimeLine(msgObj);
    		}else{
    			if(dateCheck != msgObj.day){
    				dateCheck = msgObj.day;
    				htmlCont.talkTimeLine(msgObj);
    			}
    		}
    		
    		for(var j = 0; j < msgObj.member.length ; j++){
    			var memObj = msgObj.member[j];
    			var strHtml = "";
    			if(memObj.mid == msgObj.from_id){
    				//자기자신쪽 메시지
    				htmlCont.myviewHtml(msgObj);
        		}else{
        			//상대방쪽 메시지
        			htmlCont.yourviewHtml(msgObj);
        		}
    			
    			$(".talkWrap").append(htmlCont.strHtml);
    			break;
    		}
    	}
    	
    	//1. socket채널 방생성(채팅방 등록) command : create
    	channelCont.createRoom(roomInfo);
    	channelCont.loginRoom(roomInfo);
    	//방아이디,이름,주체자 ID
    	//2. 채팅방 입장 command : join
    	
    },
    getDeviceCheck : function(){
		var varUA = navigator.userAgent.toLowerCase(); //userAgent 값 얻기
		if (varUA.match('android') != null) { 
		    return "android";
		} else if (varUA.indexOf("iphone")>-1||varUA.indexOf("ipad")>-1||varUA.indexOf("ipod")>-1) { 
			return "ios";
		} else {
			return null;
		}
	},

    /**
	 * @ DEVICE 연동
	 * @ ios와 연동을 위해 함수 호출을하기 위해 만든 함수.
	 * @ 연동문자열
	 *  */
	sendToApp : function( $val ) {
		var src = String( "toapp://"+$val );
	    var src2  = src.replace(/\n/gi,"%0A"); //줄바꿈 적용. 2013.02.20. NDH
		var html = "<IFRAME id='toAppFrame' style='' src='"+src2+"' frameborder='no' scrolling='0' width='0' height='0'></IFRAME>";

		$('body').append(html);
		$('#toAppFrame').remove();
	}
};


var channelCont = {
	createRoom : function(roomInfo){
		var output = {
			command : "create",
			roomId : roomInfo.room_id,
			roomName : roomInfo.room_name, 
			roomOwner : roomInfo.from_id
		};
		console.log("서버로 보낼 데이터 : " + JSON.stringify(output));
		
		if(socket == undefined){
			alert("서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.");
			return;
		}
		
		socket.emit("room", output);
	},
	loginRoom : function (roomInfo){
		var output = {id : roomInfo.from_id, today:"20190510135922"};
		console.log("서버로 보낼 데이터 :" + JSON.stringify(output));
		
		if(socket == undefined){
			alert("서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.");
			return;
		}
		
		socket.emit("login", output);
	},
	joinRoom : function (roomInfo){
		var output = {command : "join", roomId : roomInfo.room_id};
		console.log("서버로 보낼 데이터 : " + JSON.stringify(output));
		
		if(socket == undefined){
			alert("서버에 연결되어 있지 않습니다. 먼저 서버에 연결하세요.");
			return;
		}
		socket.emit("room", output);
	},
	sendMessage : function(roomInfo,msg){
		
		var memList = roomInfo.member;
		for(var i=0 ; i<memList.length ; i++){
			var member = memList[i];
			delete member.room_add_date;
			delete member.room_enter_date;
			delete member.room_out_date;
			delete member.room_status;
			if(roomInfo.from_id == member.mid) member.view = "1";
			else member.view = "0";
		}
		
		var output = {recepient : "All"};
		var msgData = {
			room_id : roomInfo.room_id,
			from_id : roomInfo.from_id,
			from_name : roomInfo.from_name,
			message : msg,
			message_view : "1",
			message_type : "T",
			message_date : dateInfo.getDate(),
			member : memList
		}
		console.log("서버로 보낼 데이터 :" + JSON.stringify(output));
		
		if(socket == undefined){
			alert("서버와 연결되어있지 않습니다. 서버와 연결을 먼저 시도해주세요~~~~~~!");
			return;
		}
		socket.emit("message", output, msgData);
	}
};


//서버에 연결하는 함수 정의
function connectToServer(params){
	deviceCont.init();

	//1. socket network 접속 가능 여부 확인
	socket.on("connect", function(){
		println("웹 소켓 서버에 연결되었습니다. : " + " http://" + host + ":" + port);
		println(socket.connected);
		//접속성공시에 채팅방여부 확인 시작
		deviceCont.setAjaxProcess(params,"/chat/talkProcessing",deviceCont.resultRoomProcess);
		
		socket.on("message", function(msgInfo){
			console.log(JSON.stringify(msgInfo));
			
			println("<p>수신 메시지 :" + msgInfo.from_id + ", " + msgInfo.recepient + ", " + msgInfo.command + ", "
					+ msgInfo.type + ", " + msgInfo.message + "</p>");
			console.log(new Date().strFormat(msgInfo.message_date,"yyyyMMdd"));
			/*var userId = $("#userId").val();
			var msgObj = {
				message : msgInfo.message,
				message_view : msgInfo.message_view,
				message_date : msgInfo.,
				from_name : msgInfo.from_name
			};
			if(message.sender == userId){
				htmlCont.myviewHtml(msgObj);
			}else{
				htmlCont.yourviewHtml(msgObj);
			}
			$(".talkWrap").append(htmlCont.strHtml);
			$("#in_txt").val("");*/
		});
		
		socket.on("response", function(response){
			console.log(JSON.stringify(response));
			println("응답 메시지를 받았습니다" + response.command + ", " + response.code + ", " + response.message);
		});
		
		
		socket.on("room", function(response){
			console.log(JSON.stringify(response));
			//println("<p>방 이벤트 :" + data.command + "</p>");
			println("<p>방 리스트를 받았습니다.</p>");
			/*if(data.command == "list"){
				var roomCount = data.rooms.length;
				$("#roomList").html("<p>방 리스트" + roomCount + "개</p>");
				for( var i=0; i<roomCount ; i++){
					$("#roomList").append("<p>방 #" + i + ":" + data.rooms[i].id + ", " + data.rooms[i].name + ", " + data.rooms[i].owner + "</p>");
				}
			}*/
			
		});
	});
	
	socket.on("disconnect", function(){
		println("웹 소켓 연결이 종료되었습니다.");
	});
}

function println(data){
	console.log(data);
	$("#result").append("<p>" + data + "</p>");
}