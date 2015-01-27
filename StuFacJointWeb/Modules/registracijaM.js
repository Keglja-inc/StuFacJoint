/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'registracija' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(registracija.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
include(ds.getModelFolder().path + 'ssjs/funkcijeKorisnik.js');

exports.helloWorld = function helloWorld() {
	return "Hello world";
};
//;
exports.dodajKorisnika = function dodajKorisnika(kor) {
	var rez = registracijaKorisnika(kor);
	return rez;
};

exports.provjeriMail = function provjeriMail(mail) {
	var rez = provjeriEmailFakulteta(mail);
	return rez;
};
