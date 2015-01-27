include(solution.getFolder("path")+"configData/podaci.js");
include(ds.getModelFolder().path + 'ssjs/posaljiMail.js');
include(ds.getModelFolder().path + 'ssjs/funkcijeBaza.js');
include(ds.getModelFolder().path + 'ssjs/funkcijeKorisnik.js');

var mysql = require('waf-mysql');

function dohP(rq, rs){
	rs.contentType = 'application/json';
	rs.body = JSON.stringify(dohvatiPodatke());
}

function dohvatiPodatke(){
	var result = {
		naziv : "",
		ulica : "",
		kucniBroj : "",
		postanskiBroj : "",
		mjesto : "",
		kontaktEmail : "",
		kontaktTelefon : "",
		logo : "",
		webStranica : "",
		visokoUciliste : "",
		status : false,
//		dataChanged : {
//			naziv : false,
//			ulica : false,
//			kucniBroj : false,
//			postanskiBroj : false,
//			mjesto : false,
//			kontaktEmail : false,
//			kontaktTelefon : false,
//			logo : false,
//			webStranica : false,
//			visokoUciliste : false
//		},
		message : ""
	};
	try{
		if(currentUser() != null){
			var dbconn = mysql.connect(mysql_params);
			var podaci = dohvatiIzBaze('SELECT naziv, ulica, kucniBroj, postanskiBroj, mjesto, kontaktEmail, kontaktTelefon, logo, webStranica, visokoUciliste_idVisokogUcilista FROM fakultet WHERE idFakulteta='+currentSession().storage.id); //SLOŽITI SESIJU
			if (podaci.length){
				result.naziv = podaci[0].naziv;
				result.ulica = podaci[0].ulica;
				result.kucniBroj = podaci[0].kucniBroj;
				result.postanskiBroj = podaci[0].postanskiBroj;
				result.mjesto = podaci[0].mjesto;
				result.kontaktEmail = podaci[0].kontaktEmail;
				result.kontaktTelefon = podaci[0].kontaktTelefon;
				result.logo = podaci[0].logo;
				result.webStranica = podaci[0].webStranica;
				result.visokoUciliste = podaci[0].visokoUciliste_idVisokogUcilista;
//				if(podaci[0].visokoUciliste_idVisokogUcilista){
//					var uciliste = dohvatiIzBaze('SELECT naziv FROM visokoUciliste WHERE idVisokogUcilista =' + podaci[0].visokoUciliste_idVisokogUcilista);
//					result.visokoUciliste = uciliste[0].naziv;
//				}
				result.message = "Dohvaćeni su traženi podaci.";
				result.status = true;
			}
			
			else {
				result.message = "Ne postoje podaci za traženi fakultet!";
			}
			dbconn.close();
		}
		else {
			result.message = "Niste autorizirani dohvaćati tražene podatke!";
		}
	}
	catch(e){
		result.message = "Pogreška kod povezivanja s bazom!" + e.message;
	}
	return result;
}

function azurirajPodatke(podaci){
	var result = {
		status : false,
		message : ""
	};
	try{
		if(currentUser() != null){
			var r = ispravnostEmaila(podaci.kontaktEmail);
			if(r.status) {
				var dbconn = mysql.connect(mysql_params);
				var query = 'UPDATE fakultet SET ';
				query += ' naziv = "' + podaci.naziv + '"';
				query += ', ulica = "' + podaci.ulica + '"';
				query += ', kucniBroj = "' + podaci.kucniBroj + '"';
				query += ', postanskiBroj = ' + podaci.postanskiBroj;
				query += ', mjesto = "' + podaci.mjesto + '"';
				query += ', kontaktEmail = "' + podaci.kontaktEmail +'"';
				query += ', kontaktTelefon = "' + podaci.kontaktTelefon + '"';
				query += ', webStranica = "' + podaci.webStranica + '"';
				query += ', visokoUciliste_idvisokogUcilista = ' + podaci.visokoUciliste;
				query += ' WHERE idFakulteta = ' + currentSession().storage.id;
				var res = dbconn.execute(query);
				dbconn.close();
				result.status = true;
				result.message = "Podaci su uspješno ažurirani";
			}
			else{
				result.message = r.message;
			}
		}
		else{
			
		}
	}
	catch(e){
		result.message = "Neuspješno spajanje na bazu!";
	}
	return result;
}

function promjenaLozinke(pass){
	var result = {
		status: false,
		message : ""
	};
	try{
		if(currentUser() != null){
			var dbconn = mysql.connect(mysql_params);
			var query= 'UPDATE fakultet SET lozinka = "' + directory.computeHA1(currentSession().storage.email, pass) + '" WHERE idFakulteta = ' + currentSession().storage.id;
			var res = dbconn.execute(query);
			dbconn.close();
			var msg = {
				adresa : currentSession().storage.email,
				kaj : "lozinka"
			};
//			posaljiInfoPromjenePodataka(msg); //POSLOŽITI ZA SLANJE EMAILA
			result.status = true;
			result.message = "Lozinka je uspješno ažurirana";
		}
	}
	catch(e){
		result.message = "Neuspješno spajanje na bazu!";
	}	
	return result;
}

function promjenaEmaila(email, lozinka){
	var result = {
		status: false,
		message : ""
	};
	var err, emailRegexStr, isValid;
	var s = provjeriKorisnika(currentSession().storage.email, lozinka);
	if (email != null && currentUser() != null && s.status) {
		emailRegexStr = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
		isValid = emailRegexStr.test(email);
		if (!isValid) {
			result.message = "Email nije ispravan!";
		} 
		else { 
			var r = provjeriEmailFakulteta(email);
			if(r.status){
				result.message =  r.message;
			}
			else {
				try{
					var dbconn = mysql.connect(mysql_params);
					var query= 'UPDATE fakultet SET email = "' + email + '", lozinka = "' +directory.computeHA1(email, lozinka)+'" WHERE idFakulteta = ' + currentSession().storage.id;
					var res = dbconn.execute(query);
					dbconn.close();
					var msg = {
						adresa : email,
						kaj : "email"
					};
//					posaljiInfoPromjenePodataka(msg); //POSLOŽITI ZA SLANJE EMAILA O PROMJENI PODATAKA
					result.status = true;
					result.message = "Adresa elektroničke pošte je uspješno ažurirana";
				}
				catch(e){
					result.message =  "Pogreška kod povezivanja sa bazom! " + e.message; 
				}
			}
		}
	}
	else {
		result.message = "Niste autorizirani za promjenu!";
	}
	return result;
}

//var msg = {
//	adresa : "davorin_spicko@yahoo.com",
//	kaj : "email"
//};
//posaljiInfoPromjenePodataka(msg);

function provjeriKorisnika(e, l){
	var result = {
		status : false,
		message : ""
	};
	if(currentUser() != null){
		try{
			var k = dohvatiIzBaze('SELECT * FROM fakultet WHERE idFakulteta ='+currentSession().storage.id);
			if(k[0].lozinka == directory.computeHA1(e, l)){
				result.status = true;
				result.message = "Autoriziran";
			}
			else
				result.message = "Niste autorizirani za ovu akciju!";
		}
		catch(e){
			result.message =  "Pogreška kod povezivanja sa bazom! " + e.message; 
		}
	}
	return result;
}