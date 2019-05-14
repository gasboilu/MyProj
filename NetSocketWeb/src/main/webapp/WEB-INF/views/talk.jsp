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
	<script type="text/javascript" src="/js/common.js"></script>
	<script type="text/javascript" src="/js/chat_cont.js"></script>
	<script type="text/javascript">
		var params = ${jsonParams};
		$(function(){
			connectToServer(params);
			//신규 -> 채팅방을 관리? 채팅방 ID가 필요
			
			  //1> 채팅방 만들기
			  //2> 채팅방 입장
			$("#textSendBtn").on("click",function(){
				var message = $("#in_txt").val();
				var roomInfo = roomData.getRoomInfo();
				channelCont.sendMessage(roomInfo,message);
			});
			//기존방
			  //1> 채팅방 입장
				
		});
	</script>
</head>

<!-- 라운지에서 진입시 talkChat에 lounge class만 추가해 주세요  -->
<body class="talkChat lounge">
<input type="hidden" id="roomInfo"/>
<input type="hidden" id="userId" value="${sessionScope.userId}"/>
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
        </article>
    </section>
    <footer class="foot">
        <textarea name="in_txt" id="in_txt" placeholder="입력해주세요."></textarea>
        <button type="button" id="textSendBtn">전송</button>
    </footer>
</div>
<!-- script -->
</body>
</html>