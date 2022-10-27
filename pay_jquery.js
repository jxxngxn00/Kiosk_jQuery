$(function(){
	window.resizeTo(500, 700);										// 결제창 크기 설정 -- alert창이 보일 수 있는 크기로 지정
	var totalVal = $("#total", opener.document).val();		// 메뉴 페이지(opener)의 총합 금액을 불러와서 변수로 저장함
   	$('#pay_total').val(totalVal);										// 결제창에 총합금액 출력
   	
   var total = $(".list", opener.document);						// 메뉴 페이지(opener)에서 동적으로 추가된 tr(.list)를 변수(배열)로 저장함
   
	total.each(function(){												// 여러개이므로 each() 사용
		var tr=$('<tr/>');		 
		var td = $(this).find('td'); 									// 동적으로 추가한 tr(.list)중 한개의 $('td')요소 저장 (여러 개이므로 배열) 
		
		var pName = td.eq(0).text();								// 1번째 td(메뉴 이름)의 내용
		tr.append($('<td/>').text(pName));						// tr에 추가
		
		var pCount = td.eq(2).text();								// 3번째 td(메뉴 이름)의 내용
		tr.append($('<td />').text(pCount));						// tr에 추가
		
		var pPrice = td.eq(4).text();									// 5번째 td(메뉴 이름)의 내용
		tr.append($('<td />').text(pPrice));						// tr에 추가
		
		tr.attr('class','list');												// 동적으로 추가한 tr에 클래스 이름 부여 : list
		$('table#payTable').append(tr);								// table에 tr 추가
	});//each
	
	/* 현금/카드/간편 결제 버튼을 누를 때 */
	$('.payButton').click(function(){
		res = confirm('영수증을 출력 하시겠습니까?');				// 영수증 출력 여부를 묻는 알림창 출력
		if(res){																// 확인을 눌렀을 경우
			alert('영수증이 출력됩니다.');									// 영수증 출력을 알리는 알림창 출력
		}//if
		alert('결제가 완료되었습니다. 처음 화면으로 돌아갑니다.');	// 결제 완료 알림창 출력
		
		
		$('.list', opener.document).remove();						// opener의 동적으로 추가한 tr 모두 삭제
		$('#total', opener.document).attr('value',0);			// opener의 최종금액 내용 초기화
		$('.menuCount', opener.document).val('0');			// opener의 select 모두 0으로 초기화
		$(opener.location).attr("href","home.html"); 			// opener의 주소 home.html(초기화면)으로 이동
		window.close();													// 창을 닫음
	});//click
	
});//function