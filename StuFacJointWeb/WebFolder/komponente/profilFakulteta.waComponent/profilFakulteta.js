
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'profilFakulteta';
	// @endregion// @endlock

	this.load = function (data) {// @lock
	
	var fakultet;
	$.ajax({
		type : "GET",
		url : "/36fcbb6a6a49380106b4f9a2db8bb78e",
		contentType : "application/json; charset=utf-8"
	}).done(function(data){
		fakultet = data;
		$.ajax({
			url : "/ucilista"
		}).done(function(data){

			$.each(data.podaci, function(item){
				if(fakultet.visokoUciliste == data.podaci[item].idVisokogUcilista)
					$$(getHtmlId("cbVisokaUcilista")).addOption(data.podaci[item].idVisokogUcilista, data.podaci[item].naziv, true);
				else
					$$(getHtmlId("cbVisokaUcilista")).addOption(data.podaci[item].idVisokogUcilista, data.podaci[item].naziv);
			});
			postavi();
			onemoguci();
		}).fail(function(){
			$comp.removeComponent();
			
			alert("Neuspješna inicijalizacija");
		}).always(function(){
			
		});
	});
	
	
	
	// @region namespaceDeclaration// @startlock
	var btnSpremiLozinku = {};	// @buttonImage
	var btnSpremiEmail = {};	// @buttonImage
	var cbVisokaUcilista = {};	// @combobox
	var txtWebStranica = {};	// @textField
	var txtKontaktEmail = {};	// @textField
	var txtKontaktTelefon = {};	// @textField
	var txtMjesto = {};	// @textField
	var txtKucniBroj = {};	// @textField
	var txtPostanskiBroj = {};	// @textField
	var txtUlica = {};	// @textField
	var txtNaziv = {};	// @textField
	var btnSpremi = {};	// @buttonImage
	var btnUredi = {};	// @buttonImage
	var image1 = {};	// @image
	// @endregion// @endlock
	
	
	function onemoguci(){
		$$(getHtmlId("txtNaziv")).disable();
		$$(getHtmlId("txtUlica")).disable();
		$$(getHtmlId("txtKucniBroj")).disable();
		$$(getHtmlId("txtPostanskiBroj")).disable();
		$$(getHtmlId("txtMjesto")).disable();
		$$(getHtmlId("txtKontaktEmail")).disable();
		$$(getHtmlId("txtKontaktTelefon")).disable();
		$$(getHtmlId("txtWebStranica")).disable();
		$$(getHtmlId("cbVisokaUcilista")).disable();
	}
	function omoguci(){
		$$(getHtmlId("txtNaziv")).enable();
		$$(getHtmlId("txtUlica")).enable();
		$$(getHtmlId("txtKucniBroj")).enable();
		$$(getHtmlId("txtPostanskiBroj")).enable();
		$$(getHtmlId("txtMjesto")).enable();
		$$(getHtmlId("txtKontaktEmail")).enable();
		$$(getHtmlId("txtKontaktTelefon")).enable();
		$$(getHtmlId("txtWebStranica")).enable();
		$$(getHtmlId("cbVisokaUcilista")).enable();
	}
	
	function postavi(){
		$$(getHtmlId("txtNaziv")).setValue(fakultet.naziv);
		$$(getHtmlId("txtUlica")).setValue(fakultet.ulica);
		$$(getHtmlId("txtKucniBroj")).setValue(fakultet.kucniBroj);
		$$(getHtmlId("txtPostanskiBroj")).setValue(fakultet.postanskiBroj);
		$$(getHtmlId("txtMjesto")).setValue(fakultet.mjesto);
		$$(getHtmlId("txtKontaktEmail")).setValue(fakultet.kontaktEmail);
		$$(getHtmlId("txtKontaktTelefon")).setValue(fakultet.kontaktTelefon);
		$$(getHtmlId("txtWebStranica")).setValue(fakultet.webStranica);
	}
	
	
	// eventHandlers// @lock

	btnSpremiLozinku.click = function btnSpremiLozinku_click (event)// @startlock
	{// @endlock
		if($$(getHtmlId("txtNovaLozinka")).getValue() == $$(getHtmlId("txtNovaLozinkaPonovljena")).getValue() && ($$(getHtmlId("txtNovaLozinka")).getValue() != "" && $$(getHtmlId("txtNovaLozinkaPonovljena")).getValue()!="")){
			var r = pozivFakultetiModule.azurirajLozinku($$(getHtmlId("txtNovaLozinka")).getValue());
				if(r.status){
					onemoguci();
					$("#"+getHtmlId("rtxtPoruka")).css({"color" : "green"});
					$$(getHtmlId("accordion1")).collapse(2);
					$$(getHtmlId("txtNovaLozinka")).setValue("");
					$$(getHtmlId("txtNovaLozinkaPonovljena")).setValue("");
				}
				else{
					$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
				}
				$$(getHtmlId("rtxtPoruka")).setValue(r.message);
		}
		else{
			$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
			$$(getHtmlId("rtxtPoruka")).setValue("Upisane lozinke nisu iste ili ih niste upisali!");
		}
	};// @lock

	btnSpremiEmail.click = function btnSpremiEmail_click (event)// @startlock
	{// @endlock
		if($$(getHtmlId("txtNoviEmail")).getValue() == $$(getHtmlId("txtNoviEmailPonovljeni")).getValue() && ($$(getHtmlId("txtNoviEmail")).getValue() != "" && $$(getHtmlId("txtNoviEmailPonovljeni")).getValue()!="")){
			if($$(getHtmlId("txtLozinka")).getValue()!=""){
				var r = pozivFakultetiModule.azurirajEmail($$(getHtmlId("txtNoviEmail")).getValue(), $$(getHtmlId("txtLozinka")).getValue());
				if(r.status){
					$$(getHtmlId("btnSpremi")).hide();
					$$(getHtmlId("btnUredi")).show();
					onemoguci();
					$("#"+getHtmlId("rtxtPoruka")).css({"color" : "green"});
					$$(getHtmlId("accordion1")).collapse(1);
				}
				else{
					$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
				}
				$$(getHtmlId("rtxtPoruka")).setValue(r.message);
			}
			else {
				$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
				$$(getHtmlId("rtxtPoruka")).setValue("Niste upisali lozinku!");
			}
			
		}
		else{
			$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
			$$(getHtmlId("rtxtPoruka")).setValue("Upisane adrese elektronočke pošte nisu iste!");
		}
	};// @lock

	cbVisokaUcilista.change = function cbVisokaUcilista_change (event)// @startlock
	{// @endlock
		fakultet.visokoUciliste = this.getValue();

	};// @lock

	txtWebStranica.change = function txtWebStranica_change (event)// @startlock
	{// @endlock
		fakultet.webStranica = this.getValue();
	};// @lock

	txtKontaktEmail.change = function txtKontaktEmail_change (event)// @startlock
	{// @endlock
		fakultet.kontaktEmail = this.getValue();
	};// @lock

	txtKontaktTelefon.change = function txtKontaktTelefon_change (event)// @startlock
	{// @endlock
		fakultet.kontaktTelefon = this.getValue();
	};// @lock

	txtMjesto.change = function txtMjesto_change (event)// @startlock
	{// @endlock
		fakultet.mjesto = this.getValue();
	};// @lock

	txtKucniBroj.change = function txtKucniBroj_change (event)// @startlock
	{// @endlock
		fakultet.kucniBroj = this.getValue();
	};// @lock

	txtPostanskiBroj.change = function txtPostanskiBroj_change (event)// @startlock
	{// @endlock
		fakultet.postanskiBroj = this.getValue();
	};// @lock

	txtUlica.change = function txtUlica_change (event)// @startlock
	{// @endlock
		fakultet.ulica = this.getValue();
	};// @lock

	txtNaziv.change = function txtNaziv_change (event)// @startlock
	{// @endlock
		fakultet.naziv = this.getValue();
	};// @lock

	btnSpremi.click = function btnSpremi_click (event)// @startlock
	{// @endlock
		var r = pozivFakultetiModule.azurirajProfil(fakultet);
		if(r.status){
			$$(getHtmlId("btnSpremi")).hide();
			$$(getHtmlId("btnUredi")).show();
			onemoguci();
			$("#"+getHtmlId("rtxtPoruka")).css({"color" : "green"})
		}
		else{
			$("#"+getHtmlId("rtxtPoruka")).css({"color" : "red"});
		}
		$$(getHtmlId("rtxtPoruka")).setValue(r.message);
	};// @lock

	btnUredi.click = function btnUredi_click (event)// @startlock
	{// @endlock
		$$(getHtmlId("btnSpremi")).show();
		$$(getHtmlId("btnUredi")).hide();
		omoguci();
	};// @lock

	image1.mouseout = function image1_mouseout (event)// @startlock
	{// @endlock
		$$(getHtmlId("rtxtPromjenaSlike")).hide();
	};// @lock

	image1.mouseover = function image1_mouseover (event)// @startlock
	{// @endlock
		$$(getHtmlId("rtxtPromjenaSlike")).show();
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_btnSpremiLozinku", "click", btnSpremiLozinku.click, "WAF");
	WAF.addListener(this.id + "_btnSpremiEmail", "click", btnSpremiEmail.click, "WAF");
	WAF.addListener(this.id + "_cbVisokaUcilista", "change", cbVisokaUcilista.change, "WAF");
	WAF.addListener(this.id + "_txtWebStranica", "change", txtWebStranica.change, "WAF");
	WAF.addListener(this.id + "_txtKontaktEmail", "change", txtKontaktEmail.change, "WAF");
	WAF.addListener(this.id + "_txtKontaktTelefon", "change", txtKontaktTelefon.change, "WAF");
	WAF.addListener(this.id + "_txtMjesto", "change", txtMjesto.change, "WAF");
	WAF.addListener(this.id + "_txtKucniBroj", "change", txtKucniBroj.change, "WAF");
	WAF.addListener(this.id + "_txtPostanskiBroj", "change", txtPostanskiBroj.change, "WAF");
	WAF.addListener(this.id + "_txtUlica", "change", txtUlica.change, "WAF");
	WAF.addListener(this.id + "_txtNaziv", "change", txtNaziv.change, "WAF");
	WAF.addListener(this.id + "_btnSpremi", "click", btnSpremi.click, "WAF");
	WAF.addListener(this.id + "_btnUredi", "click", btnUredi.click, "WAF");
	WAF.addListener(this.id + "_image1", "mouseout", image1.mouseout, "WAF");
	WAF.addListener(this.id + "_image1", "mouseover", image1.mouseover, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
