//include(ds.getModelFolder().path + 'ssjs/podaci.js');
include(solution.getFolder("path")+"configData/podaci.js");

function posaljiAktivacijskuPoruku(poruka){
	// *** Korisniku se šalje aktivacijski email za potvrdu elektroničke pošte
	var result = {
		status : true,
		message : ""
	};
	var mail = require("waf-mail/mail");
	var message = new mail.Mail();
	
	message.addField("From", "StuFacJoint aplikacija");
	message.addField("To", poruka.adresa);
	message.addField("Subject", "Aktivacija korisničkog računa - StuFacJoint");
	message.addField('Content-Type', 'text/html');
	

	var tekst = "Poštovani, <br><br> molimo Vas da aktivirate svoj korisnički račun i potvrdite svoju elektronsku poštu. <br><br>";
	tekst += '<a href="' + podaciServera.address + 'aktiviraj?ac=' + poruka.link + '">AKTIVIRAJ MOJ KORISNIČKI RAČUN</a><br><br>';
	message.setBody(tekst);
	
	
	try{
		message.send(email_params.address, email_params.port, email_params.isSSL, email_params.username, email_params.password);
		result.status = true;
		result.message = "Poruka je uspješno poslana.";
	}
	catch(e){
		result.message = "Neuspjelo slanje poruke!" + e.message;
	}
	return result;
}

function posaljiInfoPromjenePodataka(poruka){
	var result = {
		status : false,
		message : ""
	};
	var mail = require("waf-mail/mail");
	var message = new mail.Mail();
	var salji = true;
	message.addField("From", "StuFacJoint aplikacija");
	message.addField("To", poruka.adresa);
	message.addField("Subject", "Promjena korisničkih podataka");
	message.addField('Content-Type', 'text/html');
	
	if(poruka.kaj == "mail"){
		var tekst = "Poštovani, <br><br> promjenjena je adresa elektroničke pošte na Vašem računu. Ukoliko vi niste izvršili promjenu, molimo Vas da nas kontaktirate. <br><br>";
	}
	else if (poruka.kaj == "lozinka"){
		var tekst = "Poštovani, <br><br> promjenjena je lozinka za pristup Vašem računu. Ukoliko vi niste izvršili promjenu, molimo Vas da nas kontaktirate. <br><br>";
	}
	else {
		salji = false;
	}
	message.setBody(tekst);
	if (salji){
		try{
			message.send(email_params.address, email_params.port, email_params.isSSL, email_params.username, email_params.password);
			result.status = true;
			result.message = "Poruka je uspješno poslana";
		}
		catch(e){
			result.message = "Neuspjelo slanje! " + e.message;
		}
	}
	return result;
}