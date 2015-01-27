//include(ds.getModelFolder().path + 'ssjs/podaci.js');
include(solution.getFolder("path")+"configData/podaci.js");

include(ds.getModelFolder().path + 'ssjs/posaljiMail.js');

var mysql = require('waf-mysql');

function testConnection(){ 
	// *** Funkcija testira uspješnost spajanja na bazu: uspjelo vraća true, neuspjelo; poruku sa opisom zakaj nije
	
	try{
		var dbconn = mysql.connect(mysql_params);
		dbconn.close();
		return true; // Spajanje na bazu je uspjelo!
	}
	catch(e){
		return "Pogreška kod spajanja na bazu! " + e.message;
	}
}

function dohvatiIzBaze(upit){ 
	// *** Funckija za upisani mySQL upit vraća polje objekata
	
	try{
		var dbconn = mysql.connect(mysql_params);
		var r = dbconn.execute(upit);
		var brojRedova = dbconn.getResultCount();
		var res = new Array();
		var n = r.getNextRow();
		while(n){
			res.push(n);
			n = r.getNextRow();
		}
		dbconn.close();
		return res;
	}
	catch(e){
		return "Pogreška kod dohvaćanja iz baze! " + e.message;
	}
	
}

function brisiZapisIzBaze(id, tablica){
	// *** Funkcija briše iz upisane tablice, redak koji ima zadani stupac
	
	try{
		var dbconn = mysql.connect(mysql_params);
		var status = dbconn.execute('DELETE FROM ' + tablica +' WHERE idFakulteta='+id);
		if (status.getAffectedRowCount()){
			return "Brisanje iz baze bilo je uspješno";
		}
		else{
			return "Neuspješno brisanje!";
		}
	}
	catch(e){
		return "Neuspješno brisanje!" + e.message;
	}
}
//brisiZapisIzBaze(9, "fakultet");
//dohvatiIzBaze("SELECT * FROM fakultet");
//var a = dohvatiIzBaze('SELECT * FROM fakultet WHERE email = "davorin_spicko@yahoo.com"');
//a[0].email;