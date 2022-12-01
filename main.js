function getMemberPrice(memberNumber){
    if(Number.isInteger(memberNumber)&& memberNumber>=0){
    //calcul du prix des membre en fonction du nombre de membres totla
    var memberPrice = ((memberNumber - memberNumber % 1000) / 1000) * 70;
    if (memberNumber <= 100) {
        memberPrice = 10;
    } else if (memberNumber <= 200) {
        memberPrice = memberNumber * 0.1;
    } else if (memberNumber <= 500) {
        memberPrice = memberNumber * 0.09;
    } else if (memberNumber <= 1000) {
        memberPrice = memberNumber * 0.08;
    } else if (memberNumber >= 10000) {
        memberPrice = 1000
    }
    //arrondis pour correspondre à l'€
    memberPrice = Math.round(memberPrice * 100) / 100;
    return memberPrice;
}else{
    return 0
}
}

function getSectionPrice(sectionNumber, sectionFreeNumber) {

    var discountedSectionNumber = 0
    var sectionTarif = 5
    var sectionTarifDiscounted = 3
    //calcul du nombre de sections discount
    var month = new Date().getMonth() + 1
    for (i = 1; i <= sectionNumber; i++) {
        if (i % month == 0) {
            discountedSectionNumber++
        }
    }
    //on retire les sections gratuites
    var sectionDiscountedToPay = discountedSectionNumber
    if (sectionFreeNumber >= sectionNumber) {
        sectionToPay = 0
    } else {
        sectionToPay = sectionNumber - sectionFreeNumber
    }
    sectionFreeNumber = sectionFreeNumber - sectionNumber

    if (sectionFreeNumber > 0) {
        if (sectionFreeNumber >= sectionDiscountedToPay) {
            sectionDiscountedToPay = 0
        } else {
            sectionDiscountedToPay = sectionDiscountedToPay - sectionFreeNumber
        }
    }
    return sectionTarif * sectionToPay + sectionTarifDiscounted * sectionDiscountedToPay
}

function doDevis(memberNumber, federation, sectionNumber) {

    // <--------- calcul du prix unitaire memebre -------->

    var memberPrice = getMemberPrice(memberNumber);

    // <--------- calculs des avantages de fédérations ---------->

    var sectionFreeNumber = memberNumber >= 1000 ? 1 : 0;
    if (federation == "N") {
        sectionFreeNumber + 2
    }
    if (federation == "B") {
        sectionTarif = sectionTarif * 0.7
    }
    if (federation == "G") {
        memberPrice = memberPrice * 0.85
    }

    // <--------- calculs sections ---------->

    var sectionPrice = getSectionPrice(sectionNumber, sectionFreeNumber);

    // <--------- calculs du prix ---------->

    var fullPrice = memberPrice + sectionPrice
    var priceTTC = Math.round((fullPrice + fullPrice * 0.2) * 100) / 100

    // <--------- affichage console ---------->

    console.log("Nombre d'adhérent: " + memberNumber)
    console.log("Fédération: " + federation)
    console.log("Nombre de section: " + sectionNumber)
    console.log("-------------------------------------")
    console.log("Prix HT adhérent: " + memberPrice + "€/mois")
    console.log("Prix HT section: " + sectionPrice + "€/mois")
    console.log("Prix HT: " + fullPrice + "€/mois")
    console.log("Prix HT: " + fullPrice * 12 + "€/an")
    console.log("Prix TTC: " + priceTTC * 12 + "€/an")
}
/*

La stratégie de test vas etre de vérifier les outputs des fonctions getMemberPrice mais pas l'output de doDevis pour un 
si petit projet il serait trop lourd d'ajouter un framework de test donc j'ai fait une fonction


*/

function testGetMemberPrice(){
    const tests = [];
     tests.push(getMemberPrice(10)===10);
     tests.push(getMemberPrice(-10)===0)
     tests.push(getMemberPrice(10000)===1000)
     tests.push(getMemberPrice("10")===0)
     tests.push(getMemberPrice(220)===19.8)
     for(let i = 0; i < tests.length; i++) {
        if(tests[i])console.log("test " +i+ " passed")
        else console.log("test " +i+ " failed")
     }
    }
