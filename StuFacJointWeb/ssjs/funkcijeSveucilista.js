include(solution.getFolder("path")+"configData/podaci.js");

var mysql = require('waf-mysql');

function capitalize(s)
{
    return s[0].toUpperCase() + s.slice(1);
}

function popisSveucilista (rq, rs){
	
	var param = rq.urlQuery.split("&");
	var tip = "", status = "", promjena = "";

	if(param[0] != ""){
		var temp; //ima naziv argnumenta i njegovu vrijednost
		for(i=0; i<param.length; i++){
			temp = param[i].split("=");
			switch(temp[0]){
				case "tip":
					tip = temp[1];
					break;
				case "status":
					status = temp[1];
					break;
				case "promjena":
					promjena = temp[1];
					promjena = promjena.slice(0, 19).replace('T', ' ');
					break;
				default:
			}
		}
	}
	if(status != "")
		status = capitalize(status);
	
	if(tip != "")
		switch(tip){
			case "sveuciliste":
				tip = "Sveučilište";
				break;
			case "veleuciliste":
				tip = "Veleučilište";
				break;
			case "visokaskola":
				tip = "Visoka škola";
				break;
			default:
		}
				
	try{
		var dbconn = mysql.connect(mysql_params);
		if(tip != ""){
			var queryString1 = 'SELECT idtipVisokogUcilista FROM tipVisokogUcilista WHERE opis = "' + tip + '"';
			var r1 = dbconn.execute(queryString1);
			var t = r1.getNextRow();
		}
		var result = t;
		if(status != ""){
			var queryString2 = 'SELECT idstatusVisokogUcilista FROM statusVisokogUcilista WHERE opis = "' + status + '"';
			var r2 = dbconn.execute(queryString2);
			var s = r2.getNextRow();
		}
		
		var queryString3 = 'SELECT * FROM visokoUciliste';
		
		if(tip != "" || status != "" || promjena != ""){
			var ubaceni = 0, dostupni = param.length;
			queryString3 += ' WHERE ';
			if(tip != ""){
				queryString3 += 'tipVisokogUcilista_idtipVisokogUcilista = ' + t.idtipVisokogUcilista;
				ubaceni++;
				if(dostupni - ubaceni)
					queryString3 += ' AND ';
			}
			if(status != ""){
				queryString3 += 'statusVisokogUcilista_idstatusVisokogUcilista = '+s.idstatusVisokogUcilista;
				ubaceni++;
				if(dostupni - ubaceni)
					queryString3 += ' AND ';
			}
			if(promjena != ""){
				queryString3 += 'zadnjaIzmjena > "' + promjena + '"';
			}
			
		}
				
		var r3 = dbconn.execute(queryString3);
		var brojRedova = r3.getRowsCount();
		dbconn.close();
		var result = []; //{}
		for(i=1; i<=brojRedova;i++){
			//result[i] = r3.getNextRow();
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


function test (request, response){
	response.contentType = "application/json";
	response.body = JSON.stringify({
		vrijeme : new Date(),
		tekst : "Ovo je odgovor na post funkciju.",
		poslaniPodaci : {
			1 : 1,
			2 : 2,
			3 : 3
		}
	});
}