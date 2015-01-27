//REGISTRACIJA KORISNIKA
//addHttpRequestHandler('(?i)^/registriraj', 'ssjs/funkcijeKorisnik.js', 'registracijaKorisnika'); //nije u upotrebi

addHttpRequestHandler('(?i)^/'+directory.computeHA1("dodajInteres", "air"), 'ssjs/funkcijeInteresa.js', 'dodajInterese'); // 9901834da4475939bb5e164289036020

addHttpRequestHandler('(?i)^/'+directory.computeHA1("ukloniInteres", "air"), 'ssjs/funkcijeInteresa.js', 'obrisiInterese'); // 9daa57206fb309c1121936fc6dc6208e

addHttpRequestHandler('(?i)^/'+directory.computeHA1("statistika", "air"), 'ssjs/funkcijeStatistika.js', 'dohvatiStatistiku'); // c5bd18f9fbf91eff0f1fabf9cf25aa4f

addHttpRequestHandler('(?i)^/'+directory.computeHA1("dohvatiProfil", "air"), 'ssjs/fakultet.js', 'dohP'); // 36fcbb6a6a49380106b4f9a2db8bb78e

addHttpRequestHandler('(?i)^/'+directory.computeHA1("obradiFakseve", "air"), 'ssjs/funkcijeObrada.js', 'obradaFaksevi'); // 1bb74c94d73fdfe3801f197bab6ffb93
//AKTIVACIJA EMAILa


addHttpRequestHandler('(?i)^/aktiviraj[?]*', 'ssjs/funkcijeKorisnik.js', 'aktivirajEmail');

//UPITI UČENIKA
addHttpRequestHandler('(?i)^/ucilista[?]*', 'ssjs/funkcijeSveucilista.js', 'popisSveucilista');
addHttpRequestHandler('(?i)^/interesi[?]*', 'ssjs/funkcijeInteresa.js', 'popisInteresa');
//TEST 
addHttpRequestHandler('(?i)^/test$', 'ssjs/funkcijeSveucilista.js', 'test');