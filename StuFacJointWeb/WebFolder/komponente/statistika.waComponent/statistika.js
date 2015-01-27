
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'statistika';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	//GLOBALNA KONFIGURACIJA GRAFA
	{
		Chart.defaults.global = {
		    animation: true,
		    animationSteps: 60,
		    animationEasing: "easeOutQuart",
		    showScale: true,
		    scaleOverride: false,
		    scaleSteps: null,
		    scaleStepWidth: null,
		    scaleStartValue: null,
		    scaleLineColor: "rgba(0,0,0,.1)",
		    scaleLineWidth: 1,
		    scaleShowLabels: true,
		    scaleLabel: "<%=value%>",
		    scaleIntegersOnly: true,
		    scaleBeginAtZero: false,
		    scaleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		    scaleFontSize: 12,
		    scaleFontStyle: "normal",
		    scaleFontColor: "#666",
		    responsive: false,
		    maintainAspectRatio: true,
		    showTooltips: true,
		    tooltipEvents: ["mousemove", "touchstart", "touchmove"],
		    tooltipFillColor: "rgba(0,0,0,0.8)",
		    tooltipFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		    tooltipFontSize: 14,
		    tooltipFontStyle: "normal",
		    tooltipFontColor: "#fff",
		    tooltipTitleFontFamily: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
		    tooltipTitleFontSize: 14,
		    tooltipTitleFontStyle: "bold",
		    tooltipTitleFontColor: "#fff",
		    tooltipYPadding: 6,
		    tooltipXPadding: 6,
		    tooltipCaretSize: 8,
		    tooltipCornerRadius: 6,
		    tooltipXOffset: 10,
		    tooltipTemplate: "<%if (label){%><%=label%>: <%}%><%= value %>",
		    multiTooltipTemplate: "<%= value %>",
		    onAnimationProgress: function(){},
		    onAnimationComplete: function(){}
		};
	}
	//KRAJ GLOBALNE KONFIGURACIJE
	
	//KONFIGURACIJA CHART
	var pieOptions = {
	    segmentShowStroke : true,
	    segmentStrokeColor : "#fff",
	    segmentStrokeWidth : 2,
	    percentageInnerCutout : 50, 
	    animationSteps : 100,
	    animationEasing : "easeOutBounce",
	    animateRotate : true,
	    animateScale : false,
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<segments.length; i++){%><li><span style=\"background-color:<%=segments[i].fillColor%>\"></span><%if(segments[i].label){%><%=segments[i].label%><%}%></li><%}%></ul>"
	};
	
	//KONFIGURACIJA LINIJSKOG
	var lineOptions = {
	    scaleShowGridLines : true,
	    scaleGridLineColor : "rgba(0,0,0,.05)",
	    scaleGridLineWidth : 1,
	    bezierCurve : true,
	    bezierCurveTension : 0.4,
	    pointDot : true,
	    pointDotRadius : 4,
	    pointDotStrokeWidth : 1,
	    pointHitDetectionRadius : 20,
	    datasetStroke : true,
	    datasetStrokeWidth : 2,
	    datasetFill : true,
	    legendTemplate : "<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].lineColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>"
	};
	
	function daysInMonth(month, year){
		return new Date(year, month, 0).getDate();
	}
	
	function postaviDane(mjesec, godina){
		if(mjesec == null || parseInt(mjesec) < 1 || parseInt(mjesec) > 12){
			mjesec = 1;
		}
		if(godina == null || parseInt(godina) < 2015 || parseInt(godina) > 2017){
			godina = 2015;
		}
		var d = daysInMonth(mjesec, godina);
		
		var dani = [];
		for (i = 0; i<parseInt(d); i++){
			dani.push(i+1);
		}
		return dani;
	}
	function postaviMjesece (godina){
		var mjeseci = ["Siječanj", "Veljača", "Ožujak", "Travanj", "Svibanj", "Lipanj", "Srpanj", "Kolovoz", "Rujan", "Listopad", "Studeni", "Prosinac"];
		return mjeseci;
	}
	
	function dohvatiPodatke(){
		$("#"+getHtmlId("tablicaIspisa")).empty();
		var podatak = [$$(getHtmlId("cbMjeseci")).getValue()==null? 1 : $$(getHtmlId("cbMjeseci")).getValue(), $$(getHtmlId("cbGodine")).getValue()== null ? 2015 : $$(getHtmlId("cbGodine")).getValue()];
		$.ajax({
			type : "POST",
			url : "/c5bd18f9fbf91eff0f1fabf9cf25aa4f",
			contentType : "application/json; charset=utf-8",
			data : JSON.stringify(podatak)
		}).done(function(data){
			var proslijedi = 0;
			console.log(data);
			if($$(getHtmlId("cbCijelaGodina")).getValue()){
				
				proslijedi = postaviMjesece(podatak[1]);
			}
			else {
				proslijedi = postaviDane(podatak[0], podatak[1]);
			}
			if (!proslijedi)
				nacrtajGrafove (proslijedi, data.data);
			else
				alert("Neispravni zahtjev!");
		}).fail(function (msg){
			alert("Neuspješno dohvaćanje statistike!");
		});
		
	}
	
	
	function nacrtajGrafove(labele, podaci){

		var data1 = {
		    labels: labele,
		    datasets: [
		        {
		            label: "Ukupan broj sati u "  + date.getFullYear() + ".",
		            fillColor: "rgba(220,220,220,0.2)",
		            strokeColor: "rgba(220,220,220,1)",
		            pointColor: "rgba(220,220,220,1)",
		            pointStrokeColor: "#fff",
		            pointHighlightFill: "#fff",
		            pointHighlightStroke: "rgba(220,220,220,1)",
		            data: podaci
		        }
		    ]
		};	
		$$(getHtmlId("graf")).rebuild();
		var ctx1 = $("#"+getHtmlId("graf")).get(0).getContext("2d");
		var myNewChart1 = new Chart(ctx1).Line(data1, lineOptions);
	}
	// @region namespaceDeclaration// @startlock
	var button1 = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	button1.click = function button1_click (event)// @startlock
	{// @endlock
		dohvatiPodatke
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_button1", "click", button1.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
