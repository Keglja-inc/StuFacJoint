/*	In order to make the helloWorld() function available client-side, you have to add a reference to the 'pozivFakulteti' module in the GUI Designer.
	The helloWorld() function can be executed from your JS file as follows:
	alert(pozivFakulteti.helloWorld());
	
	For more information, refer to http://doc.wakanda.org/Wakanda0.Beta/help/Title/en/page1516.html
*/
include(ds.getModelFolder().path + 'ssjs/fakultet.js');

//exports.dohvatiProfil = function dohvatiProfil () {
//	return dohvatiPodatke();
//};
exports.azurirajProfil = function azurirajProfil (data) {
	return azurirajPodatke(data);
};
exports.azurirajLozinku = function azurirajLozinku (data) {
	return promjenaLozinke(data);
};
exports.azurirajEmail = function azurirajEmail (m, l) {
	return promjenaEmaila(m, l);
};