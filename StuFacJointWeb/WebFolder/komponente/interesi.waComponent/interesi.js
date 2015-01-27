
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'interesi';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	// @region namespaceDeclaration// @startlock
	var imageButton3 = {};	// @buttonImage
	var button5 = {};	// @button
	var button4 = {};	// @button
	var imageButton2 = {};	// @buttonImage
	var imageButton1 = {};	// @buttonImage
	// @endregion// @endlock
	
	var jedan = "#"+getHtmlId("tablica1");
	var dva = "#"+getHtmlId("tablica2");
	
	var oznaceni1 = [];
	var oznaceni2 = [];
	var dataSet1 = [];
	var dataSet2 = [];
	var t1, t2;
	
	$$(getHtmlId("dialog1")).closeDialog();
	
	dohvatiPodatke(jedan, "?naziv="+ waf.directory.currentUser().fullName+ "&invert=true");
	dohvatiPodatke(dva, "?naziv=" + waf.directory.currentUser().fullName);
	
	function dohvatiPodatke(ref, a){
		dataSet1 = [], dataSet2 = [];
		$.ajax({
			url : "/interesi"+a
		}).done(function(data){
			$.each(data.podaci, function(item){
				if (ref == jedan)
					dataSet1.push([data.podaci[item].idInteresa, data.podaci[item].naziv]); 
				else if (ref == dva)
					dataSet2.push([data.podaci[item].idInteresa, data.podaci[item].naziv]); 
			});
			if (ref == jedan)
				popuniTabelu(ref, dataSet1);
			else if (ref == dva)
				popuniTabelu(ref, dataSet2);
		}).fail(function(){
			alert("Neuspješno dohvaćanje podataka");
		});
	}
	
	function dodajInterese(podatak){
		$.ajax({
			type : "POST",
			url : "/9901834da4475939bb5e164289036020",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(podatak)
		}).done(function(msg){
			$$(getHtmlId("rtxtPoruka")).setValue(msg.message);
			$("#"+getHtmlId("rtxtPoruka")).css({"color":"green"});
		}).fail(function (msg){
			$$(getHtmlId("rtxtPoruka")).setValue(msg.message);
			$("#"+getHtmlId("rtxtPoruka")).css({"color":"red"});
		});
	}
	function ukloniInterese(podatak){
		$.ajax({
			type : "POST",
			url : "/9daa57206fb309c1121936fc6dc6208e",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(podatak)
		}).done(function(msg){
			$$(getHtmlId("rtxtPoruka")).setValue(msg.message);
			$("#"+getHtmlId("rtxtPoruka")).css({"color":"green"});
		}).fail(function (msg){
			$$(getHtmlId("rtxtPoruka")).setValue(msg.message);
			$("#"+getHtmlId("rtxtPoruka")).css({"color":"red"});
		});
	}
	
	
	function popuniTabelu(ref, dataSet){
		var selected = [];
		var oznaceni = [];
//		$(ref).css({"height": "400px"});
		$(ref).dataTable({
	        "data": dataSet,
	        "destroy" : true,
	        "columns": [
	            {   "title": "ID" ,
	            	"width" : "1px"
	            },
	            { "title": "NAZIV" }
	        ],
	        "scrollY": "400px",
	        "scrollCollapse": true,
	        "paging": false,
	        "jQueryUI": true,
	        "processing": true,
	        "rowCallback": function( row, data ) {
	        	
	            if ( $.inArray(data.DT_RowId, selected) !== -1 ) {
	                $(row).addClass('selected');
	            }
	        }
	    });
	    
	    $(ref +' tbody').on('click', 'tr', function () {
	        var id = this.id;
	        var index = $.inArray(id, selected);
	 		
	        if ( index === -1 ) {
	            selected.push( id );
	            
	        } else {
	            selected.splice( index, 1 );
	        }
	 
	        $(this).toggleClass('selected');
	        
			//moje dodano
			var dataId = $(this).first().context.children[0].innerText;
	        if(ref == jedan)
	        	var io = oznaceni1.indexOf(dataId);
	        else if (ref == dva)
	        	var io = oznaceni2.indexOf(dataId);
	        
	        if( io> -1){
	        	if(ref == jedan)
	        		oznaceni1.splice(io, 1);
	        	else if(ref == dva)
	        		oznaceni2.splice(io, 1);
	    	}
	        else{
	        	if (ref == jedan)
	        		oznaceni1.push(dataId);
	        	else if (ref == dva)
	        		oznaceni2.push(dataId);
	    	}
//	        console.log(oznaceni1, oznaceni2);
	    } );
	}
	
	
	 
    
	// eventHandlers// @lock

	imageButton3.click = function imageButton3_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("dialog1")).displayDialog();
	};// @lock

	button5.click = function button5_click (event)// @startlock
	{// @endlock
		var tekst = $$(getHtmlId("txtNoviInteres")).getValue();
		if(tekst != ""){
			var pod = [tekst];
			dodajInterese(pod);
			$$(getHtmlId("txtNoviInteres")).setValue("");
		}
		$$(getHtmlId("dialog1")).closeDialog(); //ok button
		dohvatiPodatke(jedan, "?naziv="+ waf.directory.currentUser().fullName+ "&invert=true");
		dohvatiPodatke(dva, "?naziv=" + waf.directory.currentUser().fullName);
	};// @lock

	button4.click = function button4_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("dialog1")).closeDialog(); //cancel button
	};// @lock

	imageButton2.click = function imageButton2_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("rtxtPoruka")).setValue("");
		var pod = oznaceni2.slice(0);
		var b = ukloniInterese(pod);
		oznaceni1 = [];
		oznaceni2 = [];
		$(jedan).empty();
		$(dva).empty();
		dohvatiPodatke(jedan, "?naziv="+ waf.directory.currentUser().fullName+ "&invert=true");
		dohvatiPodatke(dva, "?naziv=" + waf.directory.currentUser().fullName);
	};// @lock

	imageButton1.click = function imageButton1_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("rtxtPoruka")).setValue("");
		var pod = oznaceni1.slice(0);
		var b = dodajInterese(pod);
		oznaceni1 = [];
		oznaceni2 = [];
		$(jedan).empty();
		$(dva).empty();
		dohvatiPodatke(jedan, "?naziv="+ waf.directory.currentUser().fullName+ "&invert=true");
		dohvatiPodatke(dva, "?naziv=" + waf.directory.currentUser().fullName);
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_imageButton3", "click", imageButton3.click, "WAF");
	WAF.addListener(this.id + "_button5", "click", button5.click, "WAF");
	WAF.addListener(this.id + "_button4", "click", button4.click, "WAF");
	WAF.addListener(this.id + "_imageButton2", "click", imageButton2.click, "WAF");
	WAF.addListener(this.id + "_imageButton1", "click", imageButton1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
