include(solution.getFolder("path")+"configData/podaci.js");

var mysql = require('waf-mysql');


function dohvatiStatistiku(rq, rs){
	var result = {
		status : false,
		message : "",
		data : []
	};
	if(rq.method == "POST"){
		try{
			var podaci = JSON.parse(rq.body);
			
			var mjesec = podaci[0];
			var godina = podaci[1];
			var cijelaGodina = podaci[2];
			
			var dbconn = mysql.connect(mysql_params);
			
			//var queryString = "SELECT * FROM ponuda_interesa AS pi LEFT JOIN interes AS i ON pi.interes_idInteresa = i.idInteresa LEFT JOIN je_zainteresiran AS z ON i.idInteresa = z.interes_idInteresa WHERE z.prioritet = 1";
			var queryString = "SELECT * FROM je_zainteresiran AS z LEFT JOIN interes AS i ON z.interes_idInteresa = i.idInteresa LEFT JOIN ponuda_interesa AS pi ON i.idInteresa = pi.interes_idInteresa WHERE pi.fakultet_idFakulteta = "+ currentSession().storage.id +" AND z.prioritet = 1"; 
			
			var r = dbconn.execute(queryString);
			var brojRedova = r.getRowsCount();
			dbconn.close();
			var res = [];
			var brojevi = [0,0,0,0,0,0,0,0,0,0,0];
			for(i=1; i<=brojRedova;i++){
				res.push(r.getNextRow());
			}
			for(i=0; i<res.length; i++){
				var temp = new Date(res[0]);
				brojevi[temp.getMonth()-1] += 1;
			}
			result.data = brojevi.slice(0);
			result.status = true;
			result.message = "Podaci su uspješno dohvaćeni.";
			
		} catch(e){
			result.message = "Neuspješno dohvaćeni podaci. " +e.message;
		}
	}
	rs.contetnType = "application/json";
	rs.body = JSON.stringify(result);
}

