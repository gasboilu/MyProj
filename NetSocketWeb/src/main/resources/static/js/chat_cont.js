var deviceCont = {
    init : function() {
      
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

//교사 입장
function targetChating(userId,userName,paId,paName){
	var f = confirm(paName+" 부모님과 채팅을 하시겠습니까?");
	if(f){
		$("#user_id").val(userId);
		$("#user_name").val(userName);
		$("#target_id").val(paId);
		$("#target_name").val(paName);
		document.infomation.submit();
	}
}

//부모입장
function resultTargetChat(userId,userName,paId,paName){
	$("#parentId").val(paId);
	$("#parentName").val(paName);
	$("#ptargetId").val(userId);
	$("#ptargetName").val(userName);
	document.infomationP.submit();
}

$(document).ready(function(){
	/* $("#searchName").on("keyup", function(){
		var searchName =  $(this).val();
	}); */
	
	$("#closeBack").on("click", function(){
		var f = confirm("채팅창에서 나가시겠습니까?");
		var deviceChk = deviceCont.getDeviceCheck();
		if(f){
			if(deviceChk == "android"){
				window.conn.cancel();	
			}else {
				deviceCont.sendToApp("cancel");
			}
		}
	});
	
	$("#searchBtn").on("click", function(){
		var searchName =  $("#in_txt").val();
		var stId = $("#st_id").val();
		var method = "SEARCH_CHATLIST";
		var dataObj = {
				search_name : searchName,
				st_id : stId
		};
		
		$.ajax({
        	type: "post",
	 	    url: "/ajax.wjth?method="+method,
	 	    data: dataObj,
	 	    dataType: "json",
	 	    success: function(data) {
	 	    	var list = data.chatList;
	 	    	console.log(list);
	 	    	$(".list-wrap").children().remove();
	 	    	if(list.length > 0){
	 	    		for(var i=0; i<list.length ; i++){
		 	    		var htmlStr = "<div class='list-item no1' ontouchstart='' onclick='targetChating(\""+list[i].st_id+"\",\""+list[i].st_name+"\",\""+list[i].pa_id+"\",\""+list[i].pa_name+"\")'>";
		                htmlStr += "		<a href='#'>";
		                htmlStr += "			<div class='visual'></div>";
		                htmlStr += "			<div class='info'>";
		                htmlStr += "				<div class='g-info'>";
		                htmlStr += "					<span class='name'>" + list[i].pa_name + " 부모님</span>";
		                htmlStr += "					<span class='child'>(" + list[i].ch_name + ")</span>";
		                htmlStr += "				</div>";
		                htmlStr += "				<div class='date'>";
		                htmlStr += "					<span class='timestamp'>" + list[i].creDtime + "</span>";
		                if(list[i].msgCount > 0){
		                	htmlStr += "				<em class='ico new'></em>";	
		                }
		                htmlStr += "				</div>";
		                htmlStr += " 			</div>";
		                htmlStr += "		</a>";
		                htmlStr += "	</div>";
		                $(".list-wrap").append(htmlStr);
		 	    	}
	 	    	}else{
	 	    		$(".list-wrap").append("<div class='list-item no1' ontouchstart=''><a href='#'>검색정보가 없습니다</a></div>");
	 	    	}
	 	     },
	 	    error: function() {
	 	    	
	 	    }
	 	 });
	});
});
