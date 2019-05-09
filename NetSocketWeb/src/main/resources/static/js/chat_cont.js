var host = "localhost";
var port = "3000";
var socket;

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
    			//자기자신쪽 메시지
    			if(memObj.mid == msgObj.from_id){
    				strHtml = "<div class='msg-wrap cl'>";
    				strHtml += "	 <div class='msg-bx'>";
    				strHtml += "		<div class='msg'>" + msgObj.message + "</div>";
    				strHtml += "		<span class='readCh'> " + msgObj.message_view + " </span>";
    				strHtml += "		<span class='timestamp'>" + msgObj.message_date + "</span>";
    				strHtml += "	</div>";
    				strHtml += "</div>";
        		}else{//상대방쪽 메시지
        			strHtml = "<div class='msg-wrap sv'>";
        			strHtml += "	<div class='visual'>";
        			strHtml += "		<img src='/img/chat/mom_1.png' alt='' />";
        			strHtml += "	</div>";
        			strHtml += "	<div class='msg-bx'>";
        			strHtml += "		<span class='name'>" + msgObj.from_name + "</span>";
        			strHtml += "		<div class='msg'>" + msgObj.message + "</div>";
        			strHtml += "		<span class='timestamp'>" + msgObj.message_date + "</span>";
        			strHtml += "	</div>";
        			strHtml += "</div>";
        		}
    			
    			$(".talkWrap").append(strHtml);
    			break;
    		}
    		console.log("msg ::" + msgList[i].message);
    	}
    	console.log("ajax data result::" + data.result);
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
}

var htmlCont = {
    talkTimeLine : function(msgObj) {
    	var timeLine = "";
    	timeLine += " <div class='timeline'>";
		timeLine += " 	<span class='date'>" + msgObj.message_day + "</span>";
		timeLine += " </div>";
		$(".talkWrap").append(timeLine);
    }
}

//서버에 연결하는 함수 정의
function connectToServer(params){
	deviceCont.init();

	//1. socket network 접속 가능 여부 확인
	socket.on("connect", function(){
		println("웹 소켓 서버에 연결되었습니다. : " + " http://" + host + ":" + port);
		println(socket.connected);
		//접속성공시에 채팅방여부 확인 시작
		deviceCont.setAjaxProcess(params,"/chat/talkProcessing",deviceCont.resultRoomProcess);
		
		socket.on("message", function(message){
			console.log(JSON.stringify(message));
			
			println("<p>수신 메시지 :" + message.sender + ", " + message.recepient + ", " + message.command + ", "
					+ message.type + ", " + message.data + "</p>");
		});
		
		socket.on("response", function(response){
			console.log(JSON.stringify(response));
			println("응답 메시지를 받았습니다" + response.command + ", " + response.code + ", " + response.message);
		});
		
		
		socket.on("room", function(response){
			console.log(JSON.stringfy(response));
			println("<p>방 이벤트 :" + data.command + "</p>");
			println("<p>방 리스트를 받았습니다.</p>");
			if(data.command == "list"){
				var roomCount = data.rooms.length;
				$("#roomList").html("<p>방 리스트" + roomCount + "개</p>");
				for( var i=0; i<roomCount ; i++){
					$("#roomList").append("<p>방 #" + i + ":" + data.rooms[i].id + ", " + data.rooms[i].name + ", " + data.rooms[i].owner + "</p>");
				}
			}
			
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