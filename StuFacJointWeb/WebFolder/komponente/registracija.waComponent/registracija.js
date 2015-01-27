
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'registracija';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	// @region namespaceDeclaration// @startlock
	var btnRegistriraj = {};	// @button
	var txtPonovljenaLozinka = {};	// @textField
	var imgErrPonovljenaLozinka = {};	// @image
	var imgErrLozinka = {};	// @image
	var txtLozinka = {};	// @textField
	var txtPonovljeniEmail = {};	// @textField
	var txtEmail = {};	// @textField
	var imgErrPonovljeniEmail = {};	// @image
	var imgErrEmail = {};	// @image
	// @endregion// @endlock

	// eventHandlers// @lock

	btnRegistriraj.click = function btnRegistriraj_click (event)// @startlock
	{// @endlock

		provjeraPonovljenogEmaila();
		provjeraPonovljeneLozinke();
				
		if(!eroriUnosa.email && !eroriUnosa.ponovljeniEmail && !eroriUnosa.lozinka && !eroriUnosa.ponovljenaLozinka){
			var pod = {
				email: $$(getHtmlId("txtEmail")).getValue(),
				lozinka : $$(getHtmlId("txtLozinka")).getValue()
			};
			$$(getHtmlId("btnRegistriraj")).disable();
			$$(getHtmlId("imgProgress")).show();
			registracijaModule.dodajKorisnikaAsync({
				onSuccess: function (data){
					if(data.status) {
						$$(getHtmlId("container1")).hide();
						$("#"+getHtmlId("container2")).css({"top": "0px"});
					}
					else {
						alert("Pogreška kod registracije! Molimo pokušajte ponovno." + data.message);
						$$(getHtmlId("btnRegistriraj")).enable();
						$$(getHtmlId("imgProgress")).hide();
					}
				},
				onError: function(err){
					console.log(err.message);
				},
				params : [pod]
			});
//			var s = registracijaModule.dodajKorisnika(pod);
//			if(s.status){
//				$$(getHtmlId("container1")).hide();
//				$("#"+getHtmlId("container2")).css({"top": "0px"});
//			}
//			else{
//				alert("Pogreška kod registracije! Molimo pokušajte ponovno." + s.message);
//			}
		}
	};// @lock
	
	var eroriUnosa = {
		email : false,
		ponovljeniEmail : false,
		lozinka : false,
		ponovljenaLozinka : false
	};
	
	function ocistiSveUnose(){
		$$(getHtmlId("txtEmail")).setValue("");
		$$(getHtmlId("txtPonovljeniEmail")).setValue("");
		$$(getHtmlId("txtLozinka")).setValue("");
		$$(getHtmlId("txtPonovljenaLozinka")).setValue("");
		
		$$(getHtmlId("imgErrEmail")).hide();
		$$(getHtmlId("imgErrPonovljeniEmail")).hide();
		$$(getHtmlId("imgErrLozinka")).hide();
		$$(getHtmlId("imgErrPonovljenaLozinka")).hide();
	}
	

	function provjeraPonovljenogEmaila(){
		if($$(getHtmlId("txtEmail")).getValue()==""){
			$$(getHtmlId("imgErrEmail")).show();
			$$(getHtmlId("txtEmail")).setErrorMessage({message: "Niste upisali e-mail!", tooltip: false});
			eroriUnosa.email = true;
		}
		else{
			$$(getHtmlId("imgErrEmail")).hide();
			$$(getHtmlId("txtEmail")).setErrorMessage({message: "", tooltip: false});
			eroriUnosa.email = false;
		}
		
		if($$(getHtmlId("txtPonovljeniEmail")).getValue()!=""){
			$$(getHtmlId("imgErrPonovljeniEmail")).hide();
			$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "", tooltip: false});
			eroriUnosa.ponovljeniEmail = false;
			
			if($$(getHtmlId("txtEmail")).getValue() == $$(getHtmlId("txtPonovljeniEmail")).getValue()){
				$$(getHtmlId("imgErrPonovljeniEmail")).hide();
				$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "", tooltip: false});
				eroriUnosa.ponovljeniEmail = false;
					
				var emailRegexStr = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
				var isValid = emailRegexStr.test($$(getHtmlId("txtPonovljeniEmail")).getValue());
				
				if (!isValid) {
					$$(getHtmlId("imgErrPonovljeniEmail")).show();
					$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "Niste upisali ispravan e-mail!", tooltip: false});
					eroriUnosa.ponovljeniEmail = true;

				}
				else{
//					ds.Korisnik.provjeriMail1($$(getHtmlId("txtPonovljeniEmail")).getValue(),{
					
					registracijaModule.provjeriMailAsync({
						onSuccess: function(data){
							if(data.status){
								$$(getHtmlId("imgErrPonovljeniEmail")).show();
								$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: data.message, tooltip: false});
								eroriUnosa.ponovljeniEmail = true;
							}
							else{
								$$(getHtmlId("imgErrPonovljeniEmail")).hide();
								$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "", tooltip: false});
								eroriUnosa.ponovljeniEmail = false;
							}
						},
						onError : function (err){
							console.log(err);
						},
						params: [$$(getHtmlId("txtPonovljeniEmail")).getValue()]
					});
				}
								
			}
			else{
				$$(getHtmlId("imgErrPonovljeniEmail")).show();
				$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "Upisani e-mailovi nisu isti!", tooltip: false});
				eroriUnosa.ponovljeniEmail = true;
			}
		}
		else{
			$$(getHtmlId("imgErrPonovljeniEmail")).show();
			$$(getHtmlId("txtPonovljeniEmail")).setErrorMessage({message: "Niste ponovili e-mail!", tooltip: false});
			eroriUnosa.ponovljeniEmail = true;
		}
	}
	
	function provjeraLozinke(){
		if($$(getHtmlId("txtLozinka")).getValue()!=""){
			$$(getHtmlId("imgErrLozinka")).hide();
			$$(getHtmlId("txtLozinka")).setErrorMessage({message: "", tooltip: false});
			eroriUnosa.lozinka = false;
		}
		else{
			$$(getHtmlId("imgErrLozinka")).show();
			$$(getHtmlId("txtLozinka")).setErrorMessage({message: "Niste upisali lozinku!", tooltip: false});
			eroriUnosa.lozinka = true;
		}
	}
	function provjeraPonovljeneLozinke(){
		if($$(getHtmlId("txtPonovljenaLozinka")).getValue()!=""){
			$$(getHtmlId("imgErrPonovljenaLozinka")).hide();
			$$(getHtmlId("txtPonovljenaLozinka")).setErrorMessage({message: "", tooltip: false});
			eroriUnosa.ponovljenaLozinka = false;
			
			if($$(getHtmlId("txtLozinka")).getValue() == $$(getHtmlId("txtPonovljenaLozinka")).getValue()){
				$$(getHtmlId("imgErrPonovljeniEmail")).hide();
				$$(getHtmlId("txtPonovljenaLozinka")).setErrorMessage({message: "", tooltip: false});
				eroriUnosa.ponovljenaLozinka = false;
				
			}
			else{
				$$(getHtmlId("imgErrPonovljenaLozinka")).show();
				$$(getHtmlId("txtPonovljenaLozinka")).setErrorMessage({message: "Upisani lozinke nisu iste!", tooltip: false});
				eroriUnosa.ponovljenaLozinka = true;
			}
		}
		else{
			
			$$(getHtmlId("imgErrPonovljenaLozinka")).show();
			$$(getHtmlId("txtPonovljenaLozinka")).setErrorMessage({message: "Niste ponovili lozinku!", tooltip: false});
			eroriUnosa.ponovljenaLozinka = true;
		}
	}
	
	
	txtPonovljenaLozinka.blur = function txtPonovljenaLozinka_blur (event)// @startlock
	{// @endlock
		provjeraPonovljeneLozinke();
	};// @lock

	imgErrPonovljenaLozinka.mouseout = function imgErrPonovljenaLozinka_mouseout (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrPonovljenaLozinka")).hide();
	};// @lock

	imgErrPonovljenaLozinka.mouseover = function imgErrPonovljenaLozinka_mouseover (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrPonovljenaLozinka")).show();
	};// @lock

	imgErrLozinka.mouseout = function imgErrLozinka_mouseout (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrLozinka")).hide();
	};// @lock

	imgErrLozinka.mouseover = function imgErrLozinka_mouseover (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrLozinka")).show();
	};// @lock

	txtLozinka.blur = function txtLozinka_blur (event)// @startlock
	{// @endlock
		provjeraLozinke();
	};// @lock

	txtPonovljeniEmail.blur = function txtPonovljeniEmail_blur (event)// @startlock
	{// @endlock
		provjeraPonovljenogEmaila();
	};// @lock

	txtEmail.blur = function txtEmail_blur (event)// @startlock
	{// @endlock
		provjeraPonovljenogEmaila();
	};// @lock
	
	$("#"+getHtmlId('container1')).on('keyup', 'input', function (e) {
	   	if ( e.keyCode == 13 ){
	   		alert("Stisnul si enter");
	    }
	});
	
	imgErrPonovljeniEmail.mouseout = function imgErrPonovljeniEmail_mouseout (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrPonovljeniEmail")).hide();
	};// @lock

	imgErrPonovljeniEmail.mouseover = function imgErrPonovljeniEmail_mouseover (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrPonovljeniEmail")).show();
	};// @lock

	imgErrEmail.mouseout = function imgErrEmail_mouseout (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrEmail")).hide();
	};// @lock

	imgErrEmail.mouseover = function imgErrEmail_mouseover (event)// @startlock
	{// @endlock
		$$(getHtmlId("txtErrEmail")).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_btnRegistriraj", "click", btnRegistriraj.click, "WAF");
	WAF.addListener(this.id + "_txtPonovljenaLozinka", "blur", txtPonovljenaLozinka.blur, "WAF");
	WAF.addListener(this.id + "_imgErrPonovljenaLozinka", "mouseout", imgErrPonovljenaLozinka.mouseout, "WAF");
	WAF.addListener(this.id + "_imgErrPonovljenaLozinka", "mouseover", imgErrPonovljenaLozinka.mouseover, "WAF");
	WAF.addListener(this.id + "_imgErrLozinka", "mouseout", imgErrLozinka.mouseout, "WAF");
	WAF.addListener(this.id + "_imgErrLozinka", "mouseover", imgErrLozinka.mouseover, "WAF");
	WAF.addListener(this.id + "_txtLozinka", "blur", txtLozinka.blur, "WAF");
	WAF.addListener(this.id + "_txtPonovljeniEmail", "blur", txtPonovljeniEmail.blur, "WAF");
	WAF.addListener(this.id + "_txtEmail", "blur", txtEmail.blur, "WAF");
	WAF.addListener(this.id + "_imgErrPonovljeniEmail", "mouseout", imgErrPonovljeniEmail.mouseout, "WAF");
	WAF.addListener(this.id + "_imgErrPonovljeniEmail", "mouseover", imgErrPonovljeniEmail.mouseover, "WAF");
	WAF.addListener(this.id + "_imgErrEmail", "mouseout", imgErrEmail.mouseout, "WAF");
	WAF.addListener(this.id + "_imgErrEmail", "mouseover", imgErrEmail.mouseover, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
