<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core"%>
<%@ taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="format-detection" content="telephone=no" />
    <meta name="viewport" content="user-scalable=no" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no, target-densitydpi=medium-dpi" />
    <title>실시간 톡</title>
    <link rel="stylesheet" type="text/css" href="/css/common.css">
    <script src="/js/webfont.js"></script>
    <script type="text/javascript" src="/js/jquery-3.3.1.js"></script>
	<script type="text/javascript" src="/js/socket.io.js"></script>
	<script type="text/javascript">
	 	var host = "localhost";
	 	var port = "3000";
	 	var socket;
	 	var params = ${jsonParams};
	 	$(function(){
	 		console.log(params.user_id);
	 		connectToServer();
	 		//신규 -> 채팅방을 관리? 채팅방 ID가 필요
	 		
	 		  //1> 채팅방 만들기
	 		  //2> 채팅방 입장
	 		
	 		//기존방
	 		  //1> 채팅방 입장
	 		
    	});
    	
    	//서버에 연결하는 함수 정의
     	function connectToServer(){
     		
     		var options = {"forceNew" : true};
     		var url = "http://" + host + ":" + port;
     		console.log("socket url : "+url);
     		socket = io.connect(url,options);

     		//1. socket network 접속 가능 여부 확인
     		socket.on("connect", function(){
     			println("웹 소켓 서버에 연결되었습니다. :" + url);
     			println(socket.connected);
     			//2. 채팅방 신규인지 아닌지 체크
     			
     			$.ajax({
		        	type: "post",
			 	    url: "/chat/talkProcessing",
			 	    data: params,
			 	    dataType: "json",
			 	    success: function(data) {
			 	    	console.log("ajax data result::"+data.result);
			 	     },
			 	    error: function() {
			 	    	
			 	    }
			 	 });
     			
     			
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
	</script>
</head>

<!-- 라운지에서 진입시 talkChat에 lounge class만 추가해 주세요  -->
<body class="talkChat lounge">

<div id="app" class="talk">
    <header class="header">
        <a href="#" class="btn-left">
            <img src="http://down.wjthinkbig.com/bookclub/lounge2/img/v3/common/btn_back.png" alt="뒤로가기" />
        </a>
        <h1>
            <img src="http://down.wjthinkbig.com/bookclub/lounge2/img/v3/common/tit_main-tab4.png" />
        </h1>
    </header>
    <section class="container">
        <article class="talkWrap">
            <div class="timeline">
                <span class="date">2019년 1월 17일</span>
            </div>
            <div class="msg-wrap sv">
                <div class="visual">
                    <img src="/img/chat/mom_1.png" alt="선생님" />
                </div>
                <div class="msg-bx">
                    <span class="name">김웅진</span>
                    <div class="msg">
                        너가 얼마나 공부를 많이했어? 너가 얼마나 공부를 많이했어? 너가 얼마나 공부를 많이했어? 너가 얼마나 공부를 많이했어? 너가 얼마나 공부를 많이했어?
                    </div>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>

            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        내가 공부를 하던 말던!
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>

            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        웅진이처럼 난 라운지를 하겠어! 웅진이처럼 난 라운지를 하겠어! 웅진이처럼 난 라운지를 하겠어! 웅진이처럼 난 라운지를 하겠어! 웅진이처럼 난 라운지를 하겠어!
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>

            <div class="timeline">
                <span class="date">2019년 1월 17일</span>
            </div>

            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        조금만 더노력하면 좋은 결과를
                        얻을 수 있을거야! 최선을 다하면
                        적어도 후회는 없으니깐!
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>

            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        짧은글
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>
            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        짧은글
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>
            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        짧은글
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>
            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        짧은글
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>
            <div class="msg-wrap cl">
                <div class="msg-bx">
                    <div class="msg">
                        짧은글
                    </div>
                    <span class="readCh">읽음</span>
                    <span class="timestamp">오후 3:33</span>
                </div>
            </div>
        </article>
    </section>
    <footer class="foot">
        <textarea name="in_txt" id="in_txt" placeholder="입력해주세요.">${test}</textarea>
        <button type="button">전송</button>
    </footer>
</div>
<!-- script -->
</body>
</html>