include(solution.getFolder("path")+"configData/podaci.js");

include(ds.getModelFolder().path + 'ssjs/funkcijeBaza.js');
include(ds.getModelFolder().path + 'ssjs/funkcijeKorisnik.js');

var mysql = require('waf-mysql');

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

// /interesi 								-> dohvaća sve interese 
// /interesi?fakultet=1 					-> dohvaća interese koje ima fakultet sa zadanim IDom
// /interesi?fakultet=1&invert=true 		-> dohvaća sve interese koje fakultet sa zadanim IDom nema
// /interesi?naziv=Fakultet bla bla			-> isto ko i sa fakultetom samo prek naziva i ide u kombinaciji sa invert

function popisInteresa (rq, rs){
	
	var param = rq.urlQuery.split("&");
	var fakultet = "", invert = false, naziv = "", promjena = "";

	if(param[0] != ""){
		var temp; //ima naziv argnumenta i njegovu vrijednost
		for(i=0; i<param.length; i++){
			temp = param[i].split("=");
			switch(temp[0]){
				case "fakultetID":
					fakultet = temp[1];
					break;
				case "invert":
					if(temp[1] == "true")
//						invert = temp[1];
						invert = true;
					break;
				case "naziv":
					naziv = temp[1];
					break;
				case "promjena":
					promjena = temp[1];
					promjena = promjena.slice(0, 19).replace('T', ' ');
					break;
				default:
			}
		}
	}
				
	try{
		var dbconn = mysql.connect(mysql_params);
		if(naziv != "") {
			var query = 'SELECT idFakulteta FROM fakultet WHERE naziv = "' + naziv + '"';
			var r = dohvatiIzBaze(query);
			fakultet = r[0].idFakulteta;
		}
		
		var queryString3 = 'SELECT idInteresa, naziv FROM interes';
				
		if(fakultet != "" || promjena != ""){
			var ubaceni = 0, dostupni = param.length;
			if(fakultet != ""){
				if(invert==true) {
					queryString3 = 'SELECT idInteresa, naziv FROM interes WHERE idInteresa NOT IN (SELECT idInteresa FROM interes LEFT JOIN ponuda_interesa ON interes.idInteresa = ponuda_interesa.interes_idInteresa WHERE fakultet_idFakulteta = ' + fakultet +')';
				}
				else {
					queryString3 += ' LEFT JOIN ponuda_interesa ON idInteresa = interes_idInteresa WHERE fakultet_idFakulteta = ' + fakultet;
				}
			}
			if(promjena != ""){
				queryString3 += 'zadnjaIzmjena > "' + promjena + '"';
			}
			
		}
				
		var r3 = dbconn.execute(queryString3);
		var brojRedova = r3.getRowsCount();
		dbconn.close();
		var result = [];
		for(i=1; i<=brojRedova;i++){
			result.push(r3.getNextRow());
		}
		rs.contentType = 'application/json';
		var odgovor = {
			vrijeme : new Date().toISOString().slice(0, 19).replace('T', ' '),
			brojZapisa : brojRedova,
			podaci : result
		}; 
		rs.body = JSON.stringify(odgovor);
	}
	catch(e){
		return "Pogreška kod provjere! " + e.message; 
	}
	
}

function dodajInterese(rq, rs){
	rs.contentType = 'application/json';
	var result = {
		status : false,
		message : ""
	};
	var podaci = JSON.parse(rq.body);
	var broj = 0;
	if(rq.method == "POST"){
		try {
			var datum = new Date().toISOString().slice(0, 19).replace('T', ' ');
			var dbconn = mysql.connect(mysql_params);
			if(parseInt(podaci[0])){
				for (i = 0; i<podaci.length; i++){
					query = 'INSERT INTO ponuda_interesa (fakultet_idFakulteta, interes_idInteresa, zadnjaIzmjena) VALUES (' + currentSession().storage.id + ', ' + podaci[i] +', "' + datum + '")';
					var r = dbconn.execute(query);
					broj += r.getAffectedRowCount();
				}
			}
			else{
				query = 'INSERT INTO interes VALUES (default, "' + podaci[0] + '", "' +datum + '")';
				var r = dbconn.execute(query);
				broj += r.getAffectedRowCount();
				
				var id = dohvatiIzBaze('SELECT idInteresa FROM interes WHERE naziv = "' + podaci[0] + '"');
				id = id[0].idInteresa;
				
				query = 'INSERT INTO ponuda_interesa (fakultet_idFakulteta, interes_idInteresa, zadnjaIzmjena) VALUES (' + currentSession().storage.id + ', ' + id +', "' + datum + '")';
				var r = dbconn.execute(query);
			}
			result.status = true;
			result.message = broj + " zapisa je dodano u bazu.";
		}
		catch(e){
			result.message = "Neuspješno povezivanje s bazom! " + e.message;
		}
	}
	else{
		result.message = "Neispravno slanje podataka!";
	}
	rs.body = JSON.stringify(result);
}

function obrisiInterese(rq, rs){
	rs.contentType = 'application/json';
	var result = {
		status : false,
		message : ""
	};
	var podaci = JSON.parse(rq.body);
	var broj = 0;
	if(rq.method == "POST"){
		try {
			var dbconn = mysql.connect(mysql_params);
			for (i = 0; i<podaci.length; i++){
				query = 'DELETE FROM ponuda_interesa WHERE fakultet_idFakulteta = ' + currentSession().storage.id + ' AND interes_idInteresa = ' + podaci[i];
				var r = dbconn.execute(query);
				broj += r.getAffectedRowCount();
			}
			result.status = true;
			result.message =  broj + " zapisa je uklonjeno.";
		}
		catch(e){
			result.message = "Neuspješno povezivanje s bazom! " + e.message;
		}
	}
	else{
		result.message = "Neispravno slanje podataka!";
	}
	rs.body = JSON.stringify(result);
}