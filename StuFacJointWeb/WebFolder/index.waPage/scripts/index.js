
WAF.onAfterInit = function onAfterInit() {// @lock

// @region namespaceDeclaration// @startlock
	var documentEvent = {};	// @document
// @endregion// @endlock

// eventHandlers// @lock

	
	documentEvent.onLoad = function documentEvent_onLoad (event)// @startlock
	{// @endlock
		$$("cmpPrijava").loadComponent({
			path : "/komponente/login.waComponent",
			userData : {},
			onSuccess: function(){
			}
		});
		if (waf.directory.currentUser() != null){
			if (waf.directory.currentUser() != null){
				$$("cmpSadrzaj").loadComponent({
					path : "/komponente/sadrzaj.waComponent",
					onSuccess: function(){
					}
				});	
			}
		}
		else {
			$$("cmpSadrzaj").loadComponent({
				path : "/komponente/pocetna.waComponent",
				userData : {},
				onSuccess: function(){
				}
			});		
		}
//		$$("component2").loadComponent({
//			path : "/komponente/podnozje.waComponent",
//			userData : {},
//			onSuccess: function(){
//			}
//		});
	};// @lock
	

// @region eventManager// @startlock
	WAF.addListener("document", "onLoad", documentEvent.onLoad, "WAF");
// @endregion
};// @endlock
