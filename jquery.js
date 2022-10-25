
 $(function(){
	
	/* 전역변수 선언 */
	var sum =0;		// 총합
	var name;			// 이름
	var count;			// 갯수
	var price;			// 금액
	
	
	var tdName;		// 주문내역_이름
	var tdCount;		// 주문내역_개수
	var tdPrice;			// 주문내역_금액
	var tdButton;		// 주문내역_삭제버튼
	
	
		//1. select 가 change 될 경우
	$('select').change(function(){
		if($(this).val() == 0){					// select에서 0개를 선택할 경우
			alert('1개 이상을 선택해주세요.')		// 1개 이상 선택 문구 출력
		}//if
		
		else{											// 그 외
		
		//2. 메뉴 이름 저장
		name = $(this).parent().find('span:eq(0)').attr('value');
		//3. 주문 개수 저장
		count = $(this).val();
		//4. 가격 저장 후 총합 계산
		price = $(this).parent().find('span:eq(1)').attr('value');
		sum+= count * price;
		
		//5. 총합을 input 에 출력
		$('#total').attr('value',sum);
		
		/* 내역 출력 */
		
		//1) 이름을 td로 생성해서 저장
		tdName = $('<td/>').text(name);
		
		/* 중복일 경우 */
		var flag = false;													//중복 여부 판단 변수 선언
		var lis = $('#listTable tr.list');								//추가된 tr 저장한 변수
		for(var i=0; i<lis.length; i++){
			if(name==$(lis[i]).find('td:eq(0)').text()){			//주문내역 table에 선택한 메뉴의 이름이 있을 경우
				alert(name+"가 "+count+ "개 추가되었습니다.");	//변경 내용 출력
				
				var currentCount = Number($(lis[i]).find('td:eq(1)').text());			//해당하는 tr(lis[i])의 자식요소(td)중 2번째의 값 저장
				currentCount += Number(count);
				$(lis[i]).find('td:eq(1)').text(currentCount);	//개수 수정 후 출력
				
				var currentPrice =Number($(lis[i]).find('td:eq(2)').text()); 			//해당하는 tr(lis[i])의 자식요소(td)중 3번째의 값 저장
				currentPrice += Number(count) * Number(price);
				$(lis[i]).find('td:eq(2)').text(currentPrice);		// 가격 수정 후 출력
				
				flag = true;
			}//if-for
		}//for
		
		if(!flag){															//중복이 아닐 경우
			tdCount = $('<td/>').text(count);
			tdPrice = $('<td/>').text(price*count);
			tdButton = $('<td><button class="del" value="삭제">삭제</button></td>');
		
		//2) tr에 td들 붙이기
			var tr = $('<tr/>');
			tr.append(tdName);
			tr.append(tdCount);
			tr.append(tdPrice);
			tr.append(tdButton);
			
			tr.attr('class','list'); //tr의 속성 설정 -- 다른 tr들과 동적으로 추가한 tr 구분함
		
		//3) tr을 table에 붙이기
			$('#listTable').append(tr);
			}//if
		}//else - 0개일 경우
		
	});//select
	
				
				
	/* 주문내역의 삭제 버튼을 누를 경우 */
	$("#listTable").on("click", ".del", function() { 					//listTable안의 btn을 선택
		sum -= $(this).parent().parent().find('td:eq(2)').text(); 	//this(btn)의 부모(td)의 부모(tr)의 자식요소(td)중 3번째의 text 저장
		$('#total').attr('value',sum);											//최종금액 내용 설정
   	 	$(this).parent().parent().remove();       							//this(btn)의 부모(td)의 부모(tr)를 삭제
     });
	
	
	/* 주문완료 버튼을 누를 경우 */
	$('#btn').click(function(){
		res = confirm('결제 하시겠습니까?');			//결제 여부를 묻는 알림창 출력
		if(res){												//확인을 눌렀을 경우
			alert('결제 완료되었습니다 : 최종 금액 '+sum+' 원');
		} else{												//취소를 눌렀을 경우
		 	alert('처음 화면으로 돌아갑니다.');
		}
		$('.list').remove();								//추가한 tr 모두 삭제
		$('#total').attr('value',0);						//최종금액 내용 0으로 설정
			sum=0;											//sum 변수 초기화
	})//btn click
	
}); //function