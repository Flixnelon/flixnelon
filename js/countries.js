$(document).ready(function () {
    $("#capital_input").on('keydown', function (e) {
        if (e.keyCode == 13) {
            checkAnswer();
        }
    });
});

var _europe = {

    "Albânia": "tirana",
    "Alemanha": "berlim",
    "Andorra": "andorra a velha",
    "Armênia": "ereva",
    "Áustria": "viena",
    "Azerbaijão": "baku",
    "Albânia": "minsk",
    "Bélgica": "bruxelas",
    "Bósnia-Herzegovina": "saravejo",
    "Bulgária": "sofia",
    "República Checa": "praga",
    "Chipre": "nicosia",
    "Dinamarca": "copenhaga",
    "Eslováquia": "bratislava",
    "Eslovênia": "liubliana",
    "Espanha": "madrid",
    "Albânia": "tallinn",
    "Finlândia": "helsinquia",
    "França": "paris",
    "Grécia": "atenas",
    "Geórgia": "tbilisi",
    "Hungria": "budapeste",
    "Irlanda": "dublin",
    "Islândia": "reiquiavique",
    "Itália": "roma",
    "Letônia": "riga",
    "Liechtenstein": "vaduz",
    "Lituânia": "vilnius",
    "Luxemburgo": "luxemburgo",
    "República da Macedônia": "skopje",
    "Malta": "valetta",
    "Moldávia": "chisinau",
    "Mónaco": "cidade de monaco",
    "Montenegro": "podgorica",
    "Noruega": "oslo",
    "Países Baixos": "Amesterdão",
    "Polónia": "varsovia",
    "Portugal": "lisboa",
    "Reino Unido": "londres",
    "Romênia": "bucareste",
    "Rússia": "moscovo",
    "Turquia": "ancara",
    "San Marino": "san marino",
    "Sérvia": "belgrado",
    "Suécia": "estocolmo",
    "Suíça": "berna",
    "Ucrânia": "kiev",
    "Vaticano": "cidade do vaticano"

};

var europe;
var curr_country;
var skips;
var hits;
var helpGiven;

function startGame() {

    hits = 0;
    skips = 0;
    europe = Object.keys(_europe);
    $("#startEurope").hide();
    $("#tableEurope").removeClass("d-none");
    nextStep();
}

function nextStep() {

    if (europe.length == 0) {

        $("#resultEurope").html("You got " + hits + " <span class=\"text-success\">right</span> and you <span class=\"text-danger\">skipped</span> " + skips + ".");

    } else {

        helpGiven = false;

        var rdm_i = Math.floor(Math.random() * europe.length);

        curr_country = europe[rdm_i];

        document.getElementById("random_country").innerHTML = curr_country;
        document.getElementById("capital_input").value = "";

        // unica maneira decente de avançar com esta merda
        europe.splice(rdm_i, 1);

        $("#resultEurope").text("");
    }
}

function skipStep() {
    skips++;
    nextStep();
}

function checkAnswer() {

    var input = document.getElementById("capital_input").value;
    input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "");

    if (input.toLowerCase() == _europe[curr_country]) {
        hits++;
        nextStep();
    }
    // else ignore
}

function giveHelp() {
    var chars = [];
    var charIndexes = [];
    var hint = "";
    var numToGive;
    var i;

    if (!helpGiven) {
        for (i = 0; i < _europe[curr_country].length; i++) {
            chars.push("_");
        }

        numToGive = Math.floor(chars.length / 3) + 1;

        while (charIndexes.length != numToGive) {
            var rdm_i = Math.floor(Math.random() * chars.length);
            if (!charIndexes.includes(rdm_i)) {
                charIndexes.push(rdm_i);
                chars[rdm_i] = _europe[curr_country].charAt(rdm_i);
            }
        }

        for (i = 0; i < chars.length; i++) {
            hint += chars[i] + " ";
        }

        $("#resultEurope").text(hint.charAt(0).toUpperCase() + hint.slice(1));

        helpGiven = true;
    }
}