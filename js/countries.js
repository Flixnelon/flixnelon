$(document).ready(function () {

    $("#capital_input").on('keydown', function (e) {
        if (e.keyCode == 13) {
            checkAnswer();
        }
    });
});

var _northcentralAmerica = {

    "Canadá": ["ottawa", "otava"],
    "Estados Unidos da América": ["washington", "washington dc", "washington d.c.", "washington d c"],
    "México": ["cidade do mexico"],
    "Antígua e Barbuda": ["Saint John's", "saint johns", "saint john's", "sao joao"],
    "Bahamas": ["nassau"],
    "Barbados": ["bridgetown"],
    "Belize": ["belmopan"],
    "Costa Rica": ["São José", "sao jose"],
    "Cuba": ["havana"],
    "Dominica": ["roseau"],
    "El Salvador": ["São Salvador", "sao salvador", "san salvador"],
    "Granada": ["Saint George's", "saint george's", "saint georges", "sao jorge"],
    "Guatemala": ["cidade da guatemala"],
    "Haiti": ["Porto Príncipe", "porto principe"],
    "Honduras": ["tegucigalpa"],
    "Jamaica": ["kingston"],
    "Nicarágua": ["managua"],
    "Panamá": ["Cidade do Panamá", "cidade do panama"],
    "República Dominicana": ["Santo Domingo", "santo domingo", "sao domingos"],
    "Santa Lúcia": ["castries"],
    "São Cristóvão e Nevis": ["basseterre"],
    "São Vicente e Granadinas": ["kingstown"],
    "Trinidad e Tobago": ["Porto de Espanha", "orto de espanha"]

};

var _europe = {

    "Albânia": ["tirana"],
    "Alemanha": ["berlim"],
    "Andorra": ["andorra a velha", "andorra-a-velha"],
    "Arménia": ["ereva", "erevan"],
    "Áustria": ["viena", "vienna"],
    "Azerbaijão": ["baku"],
    "Bielorússia": ["minsk"],
    "Bélgica": ["bruxelas"],
    "Bósnia-Herzegovina": ["saravejo"],
    "Bulgária": ["sofia"],
    "República Checa": ["praga"],
    "Chipre": ["nicosia"],
    "Dinamarca": ["copenhaga"],
    "Eslováquia": ["bratislava"],
    "Eslovénia": ["liubliana"],
    "Espanha": ["madrid"],
    "Estónia": ["talim", "tallin", "taline"],
    "Finlândia": ["helsinquia"],
    "França": ["paris"],
    "Grécia": ["atenas"],
    "Geórgia": ["tbilisi"],
    "Hungria": ["budapeste"],
    "Irlanda": ["dublin"],
    "Islândia": ["reiquiavique"],
    "Itália": ["roma"],
    "Letónia": ["riga"],
    "Liechtenstein": ["vaduz"],
    "Lituânia": ["vilnius"],
    "Luxemburgo": ["luxemburgo"],
    "República da Macedónia": ["escopia"],
    "Malta": ["valeta"],
    "Moldávia": ["quichinau", "quixinau", "chisinau"],
    "Mónaco": ["cidade do monaco"],
    "Montenegro": ["podgorica"],
    "Noruega": ["oslo"],
    "Países Baixos": ["amesterdao"],
    "Polónia": ["varsovia"],
    "Portugal": ["lisboa", "lisbon"],
    "Reino Unido": ["londres", "london"],
    "Romênia": ["bucareste"],
    "Rússia": ["moscovo", "moscow"],
    "Turquia": ["ancara"],
    "San Marino": ["san marino"],
    "Sérvia": ["belgrado"],
    "Suécia": ["estocolmo"],
    "Suíça": ["berna"],
    "Ucrânia": ["kiev"],
    "Vaticano": ["cidade do vaticano"]

};

var selectedCountries;
var continent;
var curr_country;
var skips;
var hits;
var popoverTimeout;
var helpGiven;

function resetVariables(name) {
    hits = 0;
    skips = 0;
    switch (name) {
        case "EU":
            selectedCountries = Object.keys(_europe);
            continent = _europe;
            $(".my-container").addClass("gameEurope");
            break;
        case "CNA":
            selectedCountries = Object.keys(_northcentralAmerica);
            $(".my-container").addClass("gameCNA");
            continent = _northcentralAmerica;
            break;
    }
}

function startGame(name) {

    resetVariables(name);
    $("#startGame").hide();
    $("#table").removeClass("d-none");
    nextStep();
}

function restartGame() {

    $(".my-container").removeClass("gameEurope");
    $(".my-container").removeClass("gameCNA");

    $("#help").removeClass("disabled");
    $("#help").removeAttr("disabled");

    $("#check").removeClass("disabled");
    $("#check").removeAttr("disabled");

    $("#skip").removeClass("disabled");
    $("#skip").removeAttr("disabled");

    $("#restart").addClass("d-none");
    $("#table").addClass("d-none");    
    $("#startGame").show();
    $("#random_country").html("&nbsp;");

}

function nextStep() {

    helpGiven = false;

    if (selectedCountries.length == 0) {

        $("#help").addClass("disabled");
        $("#help").prop("disabled", "disabled");

        $("#check").addClass("disabled");
        $("#check").prop("disabled", "disabled");

        $("#skip").addClass("disabled");
        $("#skip").prop("disabled", "disabled");

        $("#restart").removeClass("d-none");
        $("#random_country").html("&nbsp;");
        $("#result").html("Acertaste em <span class=\"text-success\">" + hits + "</span> e saltaste <span class=\"text-danger\"> " + skips + "</span>.");

    } else {

        var rdm_i = Math.floor(Math.random() * selectedCountries.length);

        curr_country = selectedCountries[rdm_i];

        $("#random_country").html(curr_country);
        $("#capital_input").val('');

        // unica maneira decente de avançar com esta merda
        selectedCountries.splice(rdm_i, 1);

        $("#result").html("&nbsp;");
    }
}

function skipStep() {
    skips++;
    nextStep();
}

function checkAnswer() {

    var input = $("#capital_input").val();

    if (input.startsWith(" ")) {
        input = input.substr(1);
    }
    if (input.endsWith(" ")) {
        input = input.substring(0, input.length() - 1);
    }

    input = input.normalize('NFD').replace(/[\u0300-\u036f]/g, "").replace(/-/g, " ");

    if (continent[curr_country].includes(input.toLowerCase())) {

        hits++;
        nextStep();

    } 
    // else ignore
}
function hidePop() {
    $('#capital_input').popover('hide');
}

function giveHelp() {
    var chars = [];
    var charIndexes = [];
    var hint = "";
    var numToGive;
    var i;

    if (!helpGiven) {

        var capital = continent[curr_country][0];
        for (i = 0; i < capital.length; i++) {
            chars.push("_");
        }

        numToGive = Math.floor(chars.length / 3) + 1;

        while (charIndexes.length != numToGive) {
            var rdm_i = Math.floor(Math.random() * chars.length);
            if (!charIndexes.includes(rdm_i)) {
                charIndexes.push(rdm_i);
                chars[rdm_i] = capital.charAt(rdm_i);
            }
        }

        for (i = 0; i < chars.length; i++) {
            if (i == chars.length - 1)
                hint += chars[i];
            else
                hint += chars[i] + " ";
        }

        $("#result").text(hint.charAt(0).toUpperCase() + hint.slice(1));

        helpGiven = true;
    }
}