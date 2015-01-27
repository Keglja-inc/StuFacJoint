//include(ds.getModelFolder().path + 'ssjs/podaci.js');
include(solution.getFolder("path")+"configData/podaci.js");
include(ds.getModelFolder().path + 'ssjs/posaljiMail.js');

var mysql = require('waf-mysql');

function provjeriEmailFakulteta(emailAdresa){
	// *** Funkcija provjerava dostupnost elektroničke pošte
	// *** korisničko ime je uzapravo email, funkcija vraća true ako je zauzeti, a false u suprotnome
	var result = {
		status : false,
		message : ""
	};
	try{
		var dbconn = mysql.connect(mysql_params);
		var r = dbconn.select("*", "fakultet", {
			email : emailAdresa
		});
		var brojRedova = dbconn.getResultCount();
		dbconn.close();
		var n = r.getNextRow(); //rezultat je uvijek 1, getResultCount() daje bar jedan red, sa podacima o bazi, 
								//zato treba ići u sljedeći di su podaci iz baze, odnosno null ako ih nema
		if(brojRedova>0 && n!= null && n.aktiviran==1){
			result.status = true;
			result.message = "Postoji korisnik sa upisanom adresom elektroničke pošte!";
		}
	}
	catch(e){
		result.message = "Pogreška kod provjere! " + e.message; 
	}
	return result;
}

function ispravnostEmaila(email){
	var result = {
		status : false,
		message : "Neispravana adresa elektroničke pošte!"
	};
	var err, emailRegexStr, isValid;
	emailRegexStr = /^[a-zA-Z0-9.-_]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
	isValid = emailRegexStr.test(email);
	if (isValid) {
		result.message = "Adresa elektroničke pošte je ispravna.";
		result.status = true;
	} 
	return result;
}

function registracijaKorisnika(korisnik){
	// *** Funckcija provjerava na strani servera za postojanje korisničkog imena, tj. email-a,
	// *** provjerava ispravnost toga maila te ukoliko je sve u redu dodaje korisnika u bazu
	var result = {
		message : "Niste upisali email!",
		status : false
	};
	if (korisnik.email != null) {
		var s = ispravnostEmaila(korisnik.email);
		if(!s.status){
			result.message = s.message;
		}
		else { 
			var t = provjeriEmailFakulteta(korisnik.email);
			if(t.status){
				result.message =  t.message;
			}
			else {
				try{
					var dbconn = mysql.connect(mysql_params);
					var hash = directory.computeHA1(korisnik.email, korisnik.lozinka);
					var datum = new Date().toISOString().slice(0, 19).replace('T', ' ');
					var ak = directory.computeHA1(korisnik.email+korisnik.lozinka, 'Ovo je salt za aktivacijski kod'+datum);
					var r = dbconn.execute('INSERT INTO fakultet (email, lozinka, aktivacijskiKod, zadnjaIzmjena) VALUES("'+korisnik.email+'","'+hash+'","' + ak + '", "'+datum+'")');
					dbconn.close();
					var msg = {
						adresa : korisnik.email,
						link : ak
					};
					posaljiAktivacijskuPoruku(msg);
					result.status =  true;
					result.message = "Korisnik je uspješno registriran.";
				}
				catch(e){
					result.message =  "Pogreška kod povezivanja sa bazom! " + e.message; 
				}
			}
		}
	}
	return result;
}

function aktivacijaKorisnika(kod){
	// *** Funkcija aktivira korisnika putem linka koji mu je poslan na email
	var result = {
		message : "Neuspješna aktivacija!"
	};
	try{
		var dbconn = mysql.connect(mysql_params);
		var status = dbconn.execute('UPDATE fakultet SET aktiviran=1 WHERE aktivacijskiKod="'+kod+'"');
		if (status.getAffectedRowCount()){
			result.message = "Aktivacija korisničkog računa je bila uspješna, možete se prijaviti sa vašim emailom i lozinkom.";
		}
		dbconn.close();
	}
	catch(e){
		return "Pogreška kod povezivanja sa bazom!" + e.message;
	}
	return result;
}

function aktivirajEmail(rq, rs){
	// *** Funkcija je za poziv xhr requesta
	
	var param = rq.urlQuery.split("&");
	var podaci = new Array();
	var temp;
	for (i=0;i<param.length;i++){
		temp = param[0].split("=");
		podaci.push({
			naziv : temp[0],
			vrijednost : temp[1]
		});
	}
	return aktivacijaKorisnika(podaci[0].vrijednost);
}

function promjeniEmail(email){
	var result = {
		message : "Pogreška kod promjene adrese elektroničke pošte!"
	};
	try{
		if(currentUser() != null){
			var dbconn = mysql.connect(mysql_params);
			var status = dbconn.execute('UPDATE fakultet SET email = ' + email +' WHERE idFakulteta="'+currentSession().sifra+'"'); //SLOŽITI SESIJU
			if (status.getAffectedRowCount()){
				result.message = "Promjena adrese elektroničke pošte je bila uspješna.";
			}
			dbconn.close();
		}
		else {
			result.message = "Niste autorizirani mijenjati ovaj podatak!";
		}
	}
	catch(e){
		result.message = "Pogreška kod povezivanja s bazom!" + e.message;
	}
	return result;
}

function promjeniLozinku (lozinka){
	var result = {
		message : "Pogreška kod promjene lozinke!"
	};
	try{
		if(currentUser() != null){
			var dbconn = mysql.connect(mysql_params);
			var status = dbconn.execute('UPDATE fakultet SET lozinka = ' + lozinka +' WHERE idFakulteta="'+currentSession().sifra+'"'); //SLOŽITI SESIJU
			if (status.getAffectedRowCount()){
				result.message = "Promjena lozinke je bila uspješna.";
			}
			dbconn.close();
		}
		else {
			result.message = "Niste autorizirani mijenjati ovaj podatak!";
		}
	}
	catch(e){
		result.message = "Pogreška kod povezivanja s bazom!" + e.message;
	}
	return result;
}

//TESTIRANJA

//var korisnik = {
//	email : "testiranje@gmail.com",
//	lozinka : "test"
//}; // probni podatak za upis u bazu

//registracijaKorisnika(korisnik);

//aktivacijaKorisnika("as454asd84fas5sf484asf4saf84fas64fa");