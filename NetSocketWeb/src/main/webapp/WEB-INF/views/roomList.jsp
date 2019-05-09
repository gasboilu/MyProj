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
    <script type="text/javascript">
    	$(function(){
	    	$("#targetList").css("height",$(".talkList").height());
	    	
	    	//채팅유저리스트 목록을 팝업으로 보여준다 OR 전체화면을 덮는 팝업으로 모바일버전과의 호환을 겨냥해서
	    	$("#chatUserBtn").on("click",function (){
	    		$("#targetList").slideToggle('fast');
	    		//화면리셋필요
	    		$('.chkb:checked').each(function() { 
	    			$(this).prop("checked",false);
	    		});
	    	});
	    	
	    	$("#chatingBtn").on("click", function(){
	    		var chked="";
	    		var chkedNm="";
	    		$('.chkb:checked').each(function() { 
	    			let chkData = $(this).val().split("|");
	    			chked += "|" + chkData[0];
	    			chkedNm += "|" + chkData[1];
	    	   	});
	    		newChatingConnect(chked,chkedNm);
	    	});
    	});
    	
	 	function newChatingConnect(paId, paName){
 			//talk방 입장 submit
 			$("#target_id").val(paId);
 			$("#target_name").val(paName);
 			document.infomation.submit();
	 	}
	 	
	 	function existChatingConnect(roomId){
 			//talk방 입장 submit
 			$("#room_id").val(roomId);
 			document.infomation.submit();
	 	}
    </script>
</head>
<body class="talkList">
<form id="infomation" name="infomation" action="/chat/talk" method="post">
	<input type="hidden" id="user_id" name="user_id" value="${chatInfo.stId}" />
	<input type="hidden" id="user_name" name="user_name" value="${chatInfo.stName}" />
	<input type="hidden" id="target_id" name="target_id" value="" />
	<input type="hidden" id="target_name" name="target_name" value="" />
	<input type="hidden" id="room_id" name="room_id" value="" />
	<input type="hidden" id="from_type" name="from_type" value="ITUTOR" />
	<input type="hidden" id="target_type" name="target_type" value="SOTONG" />
</form>
<div id="targetList" class="targetList" style="background-color: white;">
	<table class="targetUserTb">
		<colgroup>
			<col width="80%"/>
			<col width="20%"/>
		</colgroup>
		<tr>
			<td colspan="2" style="text-align: right;"><input  type="button" id="chatingBtn" value="채팅"></td>
		</tr>
		<c:forEach var="chat" items="${chatList}">
			<tr>
				<td>${chat.PA_NAME} 부모님(${chat.CH_NAME})</td>
				<td><input type="checkbox" class="chkb" value="${chat.PA_ID}|${chat.PA_NAME}"></td>
			</tr>
		</c:forEach>
	</table>
</div>
<div id="app">
    <header class="header">
        <h1>
            <img src="http://down.wjthinkbig.com/bookclub/lounge2/img/v3/common/tit_main-tab4.png" />
        </h1>
        <a href="#" class="btn-right">
            <img src="http://down.wjthinkbig.com/bookclub/lounge2/img/v3/common/btn_close.png" alt="닫기" />
        </a>
    </header>
    <section class="container">
        <div class="list-wrap">
			<c:forEach var="room" items="${roomList}">
				<div class="list-item no1" onclick="existChatingConnect('${room.room_id}')">
	                <a href="#">
	                    <div class="visual"></div>
	                    <div class="info">
	                        <div class="g-info">
	                            <span class="name">${room.room_name}</span>
	                        </div>
	                        <div class="date">
	                            <span class="timestamp">${room.upd_date}</span>
	                            <em class="ico new"></em>
	                        </div>
	                    </div>
	                </a>
	            </div>
			</c:forEach>
        </div>
    </section>
    <footer class="foot">
    	<button type="button" id="chatUserBtn">채팅목록</button>
        <textarea name="in_txt" id="in_txt" placeholder="이름 또는 초성 입력 가능"></textarea>
        <em></em>
        <button type="button">검색</button>
    </footer>
</div>
<!-- script -->
<script>

</script>
</body>
</html>