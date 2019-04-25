<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
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
	 	function chatingConnect(userId, userName, paId, paName){
	 		var f = confirm("채팅에 접속하시겠습니까?");
	 		if(f){
	 			//talk방 입장 submit
	 			$("#user_id").val(userId);
	 			$("#user_name").val(userName);
	 			$("#target_id").val(paId);
	 			$("#target_name").val(paName);
	 			document.infomation.submit();
	 		}
	 	}
    </script>
</head>
<body class="talkList">
<form id="infomation" name="infomation" action="/chat/talk" method="post">
	<input type="hidden" id="user_id" name="user_id" value="" />
	<input type="hidden" id="user_name" name="user_name" value="" />
	<input type="hidden" id="target_id" name="target_id" value="" />
	<input type="hidden" id="target_name" name="target_name" value="" />
	<input type="hidden" id="service_type" name="from_type" value="ITUTOR" />
	<input type="hidden" id="target_type" name="target_type" value="SOTONG" />
</form>
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

            <div class="list-item no1" onclick="chatingConnect('','','','')">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">오후 3:33</span>
                            <em class="ico new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no2" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">오후 3:33</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no3" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">오후 3:33</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no4" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no5" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no6" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no7" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no8" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no9" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>

            <div class="list-item no10" ontouchstart="">
                <a href="#">
                    <div class="visual"></div>
                    <div class="info">
                        <div class="g-info">
                            <span class="name">김하나 부모님</span>
                            <span class="child">(김웅진, 김웅녀)</span>
                        </div>
                        <div class="date">
                            <span class="timestamp">3월 3일</span>
                            <em class="new"></em>
                        </div>
                    </div>
                </a>
            </div>
        </div>
    </section>
    <footer class="foot">
    	<div>
			<input type="text" id="hostInput" value="localhost" />
			<input type="text" id="portInput" value="3000" />
			<input type="button" id="connectButton" value="연결하기"/>
		</div>
    	<input type="text" id="roomIdInput" value="meeting01" />
		<input type="text" id="roomNameInput" value="청춘들의 대화" />
		<input type="button" id="joinRoomButton" value="방 입장하기" />
		<input type="button" id="leaveRoomButton" value="방 나가기" />
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