include(solution.getFolder("path")+"configData/podaci.js");

var mysql = require('waf-mysql');

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