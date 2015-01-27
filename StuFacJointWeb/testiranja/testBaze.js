
var mysql = require('waf-mysql');
try{
//	var dbconn = mysql.connect("mysql12.000webhost.com", "a6175960_admin", "admin0000","a6175960_stufac");
	var dbconn = mysql.connect("db4free.net", "admin31415926", "lozinka31415926","stufacjointdb");
	var res = dbconn.execute('SELECT naziv FROM interes');
	var duzina = res.getRowsCount();
	var a = "";
	for (i = 0; i<duzina; i++){
		var b = res.getNextRow().naziv;
		a+= " "+b;
	}
	a;
	
}catch(e){
	e.message;
}