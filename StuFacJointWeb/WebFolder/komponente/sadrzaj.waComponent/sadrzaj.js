
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'sadrzaj';
	// @endregion// @endlock

	this.load = function (data) {// @lock

//	$$(getHtmlId("richText1")).setValue("Trenutno nemamo tvoje podatke.");
	// @region namespaceDeclaration// @startlock
	var btnStatistika = {};	// @button
	var btnProfil = {};	// @button
	// @endregion// @endlock

	// eventHandlers// @lock

	btnStatistika.click = function btnStatistika_click (event)// @startlock
	{// @endlock
		if(waf.directory.currentUser != null){
			$$(getHtmlId("cmpLijevi")).removeComponent();
			$$(getHtmlId("cmpDesni")).removeComponent();
			$$(getHtmlId("cmpLijevi")).disable();
			$$(getHtmlId("cmpDesni")).disable();
			$$(getHtmlId("cmpCijeli")).enable();
			$$(getHtmlId("cmpCijeli")).loadComponent({
				path: "/komponente/statistika.waComponent",
				onSuccess: function(){
					
				}
			});
		}
	};// @lock
	$$(getHtmlId("cmpCijeli")).removeComponent();
	if(waf.directory.currentUser != null){
		$$(getHtmlId("cmpLijevi")).loadComponent({
			path: "/komponente/profilFakulteta.waComponent",
			onSuccess: function(){
				
			}
		});
		$$(getHtmlId("cmpDesni")).loadComponent({
			path: "/komponente/interesi.waComponent",
			onSuccess: function(){
			}
		});
	}
	
	btnProfil.click = function btnProfil_click (event)// @startlock
	{// @endlock
		if(waf.directory.currentUser != null){
			$$(getHtmlId("cmpCijeli")).removeComponent();
					$$(getHtmlId("cmpCijeli")).disable();
					$$(getHtmlId("cmpLijevi")).enable();
					$$(getHtmlId("cmpDesni")).enable();
			$$(getHtmlId("cmpLijevi")).loadComponent({
				path: "/komponente/profilFakulteta.waComponent",
				onSuccess: function(){
					
				}
			});
			$$(getHtmlId("cmpDesni")).loadComponent({
				path: "/komponente/interesi.waComponent",
				onSuccess: function(){
				}
			});
		}
	};// @lock

	// @region eventManager// @startlock
	WAF.addListener(this.id + "_btnStatistika", "click", btnStatistika.click, "WAF");
	WAF.addListener(this.id + "_btnProfil", "click", btnProfil.click, "WAF");
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
