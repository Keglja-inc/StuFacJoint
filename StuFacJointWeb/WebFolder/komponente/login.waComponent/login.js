
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {
	
	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'login';
	// @endregion// @endlock
	
	this.load = function (data) {// @lock
	
	function prikazi(){ //Prikazuje elemente za prijavu u sustav
		$("#"+getHtmlId('logoutContainer')).css({"top": "60px"});
		$("#"+getHtmlId('logoutContainer')).fadeOut(0);
		$("#"+getHtmlId('loginContainer')).fadeIn(900);
		
	}
	function sakrij (){ //Sakriva elemente za prijavu i pokazuje elemente za odjavu iz sustava
		$("#"+getHtmlId('logoutContainer')).css({"top": "0px"});
		$("#"+getHtmlId('logoutContainer')).fadeIn(900);
		$("#"+getHtmlId('loginContainer')).fadeOut(0);
		
	}
	
	function signIn() {
			waf.directory.loginByPassword($$(getHtmlId('loginNameTextField')).getValue(), $$(getHtmlId('loginPasswordTextField')).getValue(), {
				onSuccess: function(data){
					if(data.result){
						$$(getHtmlId('signInStatusMessage')).setValue("Prijavljeni ste kao: " + waf.directory.currentUser().fullName);
						$$(getHtmlId('loginNameTextField')).setValue("");
						$$(getHtmlId('loginPasswordTextField')).setValue("");
						$$(getHtmlId('errorMessageRichText')).setValue("");
						
						sakrij();
						window.location = "index.html";
						
					} else {
						$$(getHtmlId('errorMessageRichText')).setValue("Pogrešni podaci za prijavu.");
						$$(getHtmlId('signInStatusMessage')).setValue("");
						$$(getHtmlId('loginNameTextField')).setValue("");
						$$(getHtmlId('loginPasswordTextField')).setValue("");
						$$(getHtmlId('loginNameTextField')).focus();
					}
				}
			});
	}
	
	//Ako je korisnik prijavljen pokaži određene komponente, odnosno pokaži početnu tranicu ako to nije slučaj
	if (WAF.directory.currentUser() != null) { //Postoji prijavljeni korisnik
		sakrij();
		$$(getHtmlId('signInStatusMessage')).setValue("Prijavljeni ste kao: " + waf.directory.currentUser().fullName);
	} else {
		prikazi();	
	};
				
		//Pritiskom tipke enter poziva se funkcija za prijavu sve dok polja za unos podataka prijave imaju focus
	$("#"+getHtmlId('loginContainer')).on('keyup', 'input', function (e) {
	   	if ( e.keyCode == 13 ){
	   		signIn();
	    }
	});
		
	// @region namespaceDeclaration// @startlock
	var loginButton = {};	// @button
	var logoutButton = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	loginButton.click = function loginButton_click (event)// @startlock
	{// @endlock
		signIn();
	};// @lock

	logoutButton.click = function logoutButton_click (event)// @startlock
	{// @endlock
		if(	waf.directory.logout() ){
			sakrij();
			window.location = "index.html";
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_loginButton", "click", loginButton.click, "WAF");
	WAF.addListener(this.id + "_logoutButton", "click", logoutButton.click, "WAF");
	// @endregion// @endlock

	};// @lock

}// @startlock
return constructor;
})();// @endlock
