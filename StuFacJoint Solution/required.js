var mojaPrijava = function (mail, password) {
	var result = {error: 2014, errorMessage : "Neuspješna prijava!"};
	
	include(solution.getFolder("path")+"configData/loginStuFacJointWeb.js");
	
	if (mail != "" && password != "") {
		
		//umjesto emaila se za korisnike iz direktorija upisujemo samo username -> koji je sadržan u varijabli mail
		if (directory.internalStore.User({name: mail}) != null) {
			return false;
		} 
		else { //we will handle login
			var korisnik = dohvatiIzBaze('SELECT * FROM fakultet WHERE email ="' + mail+'" AND aktiviran=1');
			
			if (korisnik[0] != null) {
				if(korisnik[0].lozinka == directory.computeHA1(mail, password) && korisnik[0].blokiran==0){
						
					var theGroups = [];
					{
//					switch (korisnik[0].grupa) { **** ovo još nije implementirano u bazu niti u aplikaciju
//						case "Admin":
//							theGroups = ['Admin'];
//							break;

//						case "Moderator":
//							theGroups = ['Interna'];
//							break;
//						
//						case "Fakultet":
//							theGroups = ['Voditelj'];
//							break;
//						
//						case "Ucenik":
//							theGroups = ['Organizator'];
//							if(organizatorKlasa != null){
//								ime = organizatorKlasa.puniNaziv;
//							}
//							else{
//								ime = mail;
//							}
//							break;
//						
//						default:
//							ime = mail;
//					}
				}
					var vrijemeSpajanja = new Date();
					
//					//Kreiraj sesiju
					result = {
						ID: korisnik[0].idFakulteta,
						fullName : korisnik[0].naziv,
						storage: {
							email : korisnik[0].email,
							id : korisnik[0].idFakulteta,
							time: vrijemeSpajanja
						}
					};
					//Zabilježi prijavu u sustav **** Nije još implementirano
//					var novaPrijava = ds.PrijavauSustav.createEntity();
//					novaPrijava.time = vrijemeSpajanja;
//					novaPrijava.korisnik = korisnikKlasa.uuid;
//					novaPrijava.save();
				}
			}
			return result;
		}
		
	} 
	else {
		return result;
	}
};
