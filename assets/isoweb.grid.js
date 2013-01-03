/**
  *
  * Author  : Airlangga bayu seto
  * Email   : qu4ck@iso.web.id
  * Version : 0.1 alpha
  *
  */

(function($){
	var wScroll, width, height, opsi;
	
	$.fn.isoGrid = function(option){
		var opsi = $.extend({
					 url		: ""
					,colModel	: []
					,colData	: []
					,width		: "400"
					,height		: "200"					
				}, option);
				
		wScroll = parseInt(opsi.width)+parseInt(17);
		width	= opsi.width;
		height	= opsi.height;
		colModel = opsi.colModel;
		
		if(opsi.url != ""){
			if(opsi.colModel.length > 0){
				var showData 	= $.ajaxPost(opsi.url);
			}else{
				alert("Data Model Can't Empty.");
			}
		}else{
			alert("Url Can't Empty.");
		}
	};	
	
	$.ajaxPost 	= function(uri){
		if(uri != ""){
			$.ajax({
				url		: uri
				,type	: "post"
				,dataType: "json" 
				,success	: function(data, e){
					if(e == 'success'){
						$.setData(data);
					}else{
						alert("No. data Found.");
					}
				}
				,error	: function(err,msg){
					if(err.status == '404' || err.status == '500' || err.status == '505'){
						alert("Error : "+ msg);
					}else{
						alert("Error Ajax load Pages "+ msg);
					}
				}
			});
		}else{
			alert("Url Can't Empty");
		}
	}
	
	$.setData	= function(data){	
		if(data.list.length > 0){
			var myGrid = "<div style=\"border:1px solid;width:"+ wScroll+"px;\"> \
				<div id=\"dv_grid\" style=\"width:"+ wScroll +"px;\"> \
					<table id=\"tb_grid\" style=\"width:"+ width +"px;\" cellpadding=\"0\" cellspacing=\"0\"> \
						<thead> \
							<tr>";
							$(colModel).each(function(k,v){
								myGrid +="<th style=\"width:"+ v.width +"px\">"+ v.display +"</th>";
							});
			myGrid += " </tr> \
					</thead> \
				</table>";
			myGrid +="<div id=\"dv_grid\" style=\"overflow-y:scroll;width:"+ wScroll +"px;max-height:"+ height +"px;\"> \
			<table id=\"tb_grid\" style=\"width:"+ width +"px;\" cellpadding=\"0\" cellspacing=\"0\"> \
				<tbody>";
			$(data.list).each(function(k,v){
				myGrid += "<tr>";
					$(colModel).each(function(i,r){
						myGrid +="<td style=\"width:"+ r.width +"px\">"+ v[r.name] +"</td>";
					});	
				myGrid +="</tr>";
			});
			myGrid += " </table>\
				<div>\
			</div>";
			
			$("#testing").replaceWith(myGrid);
		}else{
			alert("No. data Found.");
		}
	}
	
})(jQuery);