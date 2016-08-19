angular.module('PrettyPrintTrello').filter('boldTitle', function initials() {

  return function(text) {
  	
  	var titre = text.substring(text.indexOf("{"),text.indexOf("}")); 
  	int taille = text.length()-titre.length()-2;
  	var texte = text.substring(text.indexOf("}"),taille); 
  	titre=titre.bold().italics();

  	//document.write(texte.substring(5,9)); 



    //return text.replace(/#\w+/g, '');
    return titre.concat (" ",texte)
  }
});