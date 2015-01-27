
(function Component (id) {// @lock

// Add the code that needs to be shared between components here

function constructor (id) {

	// @region beginComponentDeclaration// @startlock
	var $comp = this;
	this.name = 'pocetna';
	// @endregion// @endlock

	this.load = function (data) {// @lock

	$$(getHtmlId("cmpRegistracija")).loadComponent({
			path : "/komponente/registracija.waComponent",
			userData : {},
			onSuccess: function(){
				
		}
	});
	// @region namespaceDeclaration// @startlock
	// @endregion// @endlock

	// eventHandlers// @lock

	// @region eventManager// @startlock
	// @endregion// @endlock

	};// @lock


}// @startlock
return constructor;
})();// @endlock
