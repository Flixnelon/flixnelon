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

