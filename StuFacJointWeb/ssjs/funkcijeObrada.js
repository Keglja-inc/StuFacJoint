include(solution.getFolder("path")+"configData/podaci.js");

var mysql = require('waf-mysql');


function obradaFaksevi(rq, rs){
	var result = {
		status : false,
		message : "",
		data : []
	};
	switch(rq.method){
		case "POST":
			try{
				
				var podaci = JSON.parse(rq.body);
			
				var log = new mojLog(ds.getDataFolder().path+"logovi/zapis.txt");
				
				var datum = new Date();
				var tekst = "Zahtjev u : " + datum + ", primljeni parametar: " + podaci.id;
				log.appendToLog(tekst);
				
				
				var dbconn = mysql.connect(mysql_params);
				var queryString = "SELECT naziv FROM fakultet AS f LEFT JOIN ponuda_interesa AS pi ON f.idFakulteta = pi.fakultet_idFakulteta WHERE pi.interes_idInteresa = "+podaci.id; 
				var r = dbconn.execute(queryString);
				var brojRedova = r.getRowsCount();
				dbconn.close();
				var res = [];
				for(i=1; i<=brojRedova;i++){
					res.push(r.getNextRow());
				}
				result.data = res.slice(0);

				result.status = true;
				result.message = "Podaci su uspješno dohvaćeni. ";
				
			} catch(e){
				result.message = "Neuspješno dohvaćeni podaci. " +e.message;
			}
			break;
		default:
			result.message = "Metoda nije pronađena";
	}
	rs.contetnType = "application/json";
	rs.body = JSON.stringify(result);
}

function mojLog(file){
	var log = {
		appendToLog : function (myMessage){
			var file = this.logFile;
			if (file != null){
				if(!file.exists){
					file.create();
				}
				var stream = TextStream(file, "write");
				stream.write(myMessage+"\n");
				stream.close();
			}
		},
		init : function(file){
			this.logFile = file;
			if(file.exists){
				file.remove();
			}
			file.create();
		},
		set : function(file){
			if( typeof file == "string"){
				file = File(file);
			}
			this.logFile = null;	
		},
		logFile : null
	};
	log.set(file);
	
	return log;
}