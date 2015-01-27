//Podaci za spajanje na bazu podataka
var mysql_params = {
    dbType: 'mysql',
    hostname: 'db4free.net',
    // 85.10.205.173
    user: 'admin31415926',
    password: 'lozinka31415926',
    database: 'stufacjointdb',
    port: 3306,
    encryptionMode: 'not supported',
    ssl: false
};


//Podaci za pristup Emailu
var email_params = {
	address : "smtp.gmail.com",
	port : 465,
	isSSL : true,
	username : "airptim",
	password : "funkcionalnost4",
	domain : "gmail.com"
};


//Podaci o serveru na kojem se nalazi aplikacija
var podaciServera = { // samo za mail trenutno
//	address : 'http://5.231.47.14:8081/'  
//	address : 'http://127.0.0.1:8081/'
	address : 'http://stufacjoint.us.wak-apps.com/'
};