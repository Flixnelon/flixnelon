$(document).ready(function () {

    $(".question-title").click(function () {
        var answer = $(this).next();

        if (answer.css("display") == "block") {
            answer.slideToggle();
        }
        else {

            var all_answers = $(document).find(".faq-answer");

            var index;
            for (index = 0; index < all_answers.length; index++) {
                if ($(all_answers[index]).css("display") == "block") {
                    $(all_answers[index]).slideToggle();
                    break;
                }
            }

            answer.slideToggle();
        }
    });

});

function generateNumbers() {
    var table_numbers = document.getElementsByName("numbers");
    var table_stars = document.getElementsByName("stars");
   
    var index;
    for (index = 0; index < table_numbers.length; index++) {
        var numArr = [];
        var starArr = [];

        while (numArr.length != 5) {
            var newNumber = Math.floor(Math.random() * 50) + 1;
            if (!numArr.includes(newNumber)){
                numArr.push(newNumber);
            }
        }

        while (starArr.length != 2) {
            var newStar = Math.floor(Math.random() * 12) + 1;
            if (!starArr.includes(newStar)){
                starArr.push(newStar);
            }
        }

        table_numbers[index].innerHTML = formatArrayToString(numArr);
        table_stars[index].innerHTML = formatArrayToString(starArr);
    }

}

function orderNumbers(){
    var table_numbers = document.getElementsByName("numbers");
    var table_stars = document.getElementsByName("stars");

    var index;
    for (index = 0; index < table_numbers.length; index++) {

        var numArr = table_numbers[index].innerText.split(" ");
        var starArr = table_stars[index].innerText.split(" ");

        numArr.sort(sortNumber);
        starArr.sort(sortNumber);

        table_numbers[index].innerHTML = formatArrayToString(numArr);
        table_stars[index].innerHTML = formatArrayToString(starArr);
    }
}

function sortNumber(a,b) {
    return a - b;
}

function formatArrayToString(arr){

    var index;
    var string = "";

    for(index = 0; index < arr.length; index++){
        string += arr[index] + " ";
    }

    string = string.slice(0, -1); 
    return string;

}

