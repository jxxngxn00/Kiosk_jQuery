$(function() {

	//1. select 가 change 되면
	//2. 메뉴 이름을 변수로 받고

	let sum = 0;
	$('select').change(function() {
		let name = $(this).parent().find('span:eq(0)').attr('value');  // 메뉴명
		let price = $(this).parent().find('span:eq(1)').attr('value');	// 가격
		let count = $(this).val();
		sum += count * price;
		$('#total').attr('value', sum);

		let td = $('<td/>');
		let tr = $('<tr/ class="ttr">');

		td.text(name);

		let tdPrice = td.text(price);
		let tdCount = td.text(count);
		let del = $('<td><button class="del">삭제</button></td>');

		tr.append($('<td/>').text(name));
		tr.append($('<td/>').text(price));
		tr.append($('<td/>').text(count));
		tr.append(del);


		$('#listTable').append(tr);
		
	$("#listTable").on("click", ".del", function() { //listTable안의 btn을 선택
   		$(this).parent().parent().remove();       //this(btn)의 부모(td)의 부모(tr)를 삭제
     });
		
		

	});	// 메뉴의 총합


	$('#btn').click(function() {
		if (confirm("결제하시겠습니까?") == true) {    //확인
			document.removefrm.submit();
		} else {   //취소
			$('.ttr').remove();
			return false;
		}

	})

	// 주문하기 창 : 결제하시겠습니까
	// 취소 버튼 누르면 초기화



	// 0개일때 주문하기 누를 경우, 1개 이상 주문해주세요 얼럿트창
	
	
	 
	//2. 메뉴 이름을 변수로 받고
	//3. select option value를 변수로 받고
	//4. 따로 sum 만들어서 value(갯수) * 가격 계산한걸 집어넣고
	//5. sum을 총합에 띄우기
	//6. 주문하기 -> alert 최종결과 알림 -> 초기화	

})	
