
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
	
	
	/* select 가 change 될 경우 */
	$('select').change(function(){
		if($(this).val() == 0){					// select에서 0개를 선택할 경우
			alert('1개 이상을 선택해주세요.')		// 1개 이상을 선택하라는 문구 출력
		}//if
		
		else{											// 그 외
		
		
		name = $(this).parent().find('span:eq(0)').attr('value');		// 메뉴 이름 저장
		count = $(this).val();														// 주문 개수 저장
		price = $(this).parent().find('span:eq(1)').attr('value');		// 가격 저장
		sum+= count * price;														// 총합 계산(개수 * 가격) 후 변수에 저장
		
		$('#total').attr('value',sum);												// 총합을 input 에 출력
		
		/* 내역 출력 */
		
		//1) 이름을 td로 생성해서 저장
		tdName = $('<td/>').text(name);
		 tdName.attr('name',price);
		 
		/* 중복일 경우 */
		var flag = false;													 							//중복 여부 판단 변수 선언
		var lis = $('#listTable tr.list');															//추가된 tr 저장한 변수
		for(var i=0; i<lis.length; i++){
			if(name==$(lis[i]).find('td:eq(0)').text()){										//주문내역 table에 선택한 메뉴의 이름이 있을 경우
				alert(name+"가 "+count+ "개 추가되었습니다.");								//변경 내용 출력
				
				var currentCount = Number($(lis[i]).find('td:eq(2)').text());			//해당하는 tr(lis[i])의 자식요소(td)중 2번째의 값 저장
				currentCount += Number(count);
				$(lis[i]).find('td:eq(2)').text(currentCount);								//개수 수정 후 출력
				
				var currentPrice =Number($(lis[i]).find('td:eq(4)').text()); 			//해당하는 tr(lis[i])의 자식요소(td)중 3번째의 값 저장
				currentPrice += Number(count) * Number(price);
				$(lis[i]).find('td:eq(4)').text(currentPrice);									// 가격 수정 후 출력
				
				flag = true;																			// 중복 여부 : true 변환
			}//if-for
		}//for
		
		/* 중복이 아닐 경우 */
		if(!flag){
			tdCount = $('<td/>').text(count);																		// 주문 개수 td 생성
			tdPrice = $('<td/>').text(price*count);																// 가격 td 생성 -- (개수 속성의 text 값) * (금액 속성의 text값)
			tdButton = $('<td><button class="del" value="삭제">삭제</button></td>');			// 삭제 버튼 생성
			tdPlus = $('<td><button class="plus" value="추가">+</button></td>');				// 추가(+) 버튼 생성
         	tdDown = $('<td><button class="down" value="감소">-</button></td>');			// 감소(-) 버튼 생성

			//2) tr에 td들 붙이기
			var tr = $('<tr/>');
	        tr.append(tdName);
	        tr.append(tdPlus);
	        tr.append(tdCount);
	        tr.append(tdDown);
	        tr.append(tdPrice);
	        tr.append(tdButton);
	
			tr.attr('class','list'); //tr의 속성 설정 -- 다른 tr들과 동적으로 추가한 tr 구분함
			
			//3) tr을 table에 붙이기
				$('#listTable').append(tr);
			}//if
		}//else - 0개일 경우
		$('.menuCount').val('0'); //select값 초기화
	});//select
	
				
				
	/* 주문내역의 삭제 버튼을 누를 경우 */
	$("#listTable").on("click", ".del", function() { 					//listTable안의 btn을 선택
		sum -= $(this).parent().parent().find('td:eq(4)').text(); 	//this(btn)의 부모(td)의 부모(tr)의 자식요소(td)중 3번째의 text 저장
		$('#total').attr('value',sum);											//최종금액 내용 설정
   	 	$(this).parent().parent().remove();       							//this(btn)의 부모(td)의 부모(tr)를 삭제
   	 	$('.menuCount').val('0');												//select에서 선택된 값 초기화
     });//click
	
	
	/* 주문완료 버튼을 누를 경우 */
	$('#btn').click(function(){
		window.open('pay.html','주문내역','width=380, height=450');		//결제 창 띄움
		sum=0;																				//sum 변수 초기화
	})//btn click
	
	/* 이미지에 마우스를 올리거나 내릴 경우 (hover 사용) */
	$('.food').hover(function() { 
		//마우스를 올렸을 때
	    var src = $(this).attr('src');								// 이미지 경로 저장
	   $(this).attr('src',src.replace('.PNG','_1.PNG'));		// 설명이 추가된 이미지로 전환
	  }, function() {
		//마우스를 내렸을 때
	   var src = $(this).attr('src');
	   $(this).attr('src',src.replace('_1.PNG','.PNG'));		// 설명이 없는 기존의 이미지로 전환
	}); //hover


	/* 수량 감소 (-) 버튼 클릭시 발생 이벤트 */
   $(document).on("click",".down",function(){
      var cnt = $(this).parents('tr').find('td:eq(2)').text();						// 버튼이 눌린 부모요소('tr')의 3번째 td -- 수량 text 저장
      if(cnt !=0){
      	$(this).parents('tr').find('td:eq(2)').text(parseInt(cnt)-1);   			// 수량 감소
      
	    var pri = $(this).parents('tr').find('td:eq(0)').attr('name');   			// 버튼이 눌린 부모요소('tr')의 1번째 td -- 이름 text 저장
	    var pricetext = $(this).parents('tr').find('td:eq(4)').text()				// 버튼이 눌린 부모요소('tr')의 5번째 td -- 가격 text 저장
	    $(this).parents('tr').find('td:eq(4)').text(parseInt(pricetext-pri));   // 주문금액 감소
	    var totalsum = parseInt($('#total').val()) 									// 총 합계 저장
	    $('#total').val( totalsum -= parseInt(pri));									// 총 합계에서 줄어든 금액 감소
      }//if
   })//click
   
      /* 수량 증가(+) 버튼 클릭시 발생 이벤트 */
   $(document).on("click",".plus",function(){
      var cnt = $(this).parents('tr').find('td:eq(2)').text();
      $(this).parents('tr').find('td:eq(2)').text(parseInt(cnt)+1);   			// 수량 증가
      
      var cnt1 = $(this).parents('tr').find('td:eq(2)').text();
      var pri = $(this).parents('tr').find('td:eq(0)').attr('name');   
      $(this).parents('tr').find('td:eq(4)').text(parseInt(pri*cnt1));  			// 주문금액 증가
      
      var totalsum = parseInt($('#total').val()) 									// 합계의 가격
      $('#total').val( totalsum += parseInt(pri));
   });//click
   
 });//function(document ready)  