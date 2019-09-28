function onSubmit() {
    var score = 0;
    var numofQuestions = 3;
    var ansArr = ["a, c, c"];

    var q1 = document.forms["quiz"]["q1"].value;
    var q2 = document.forms["quiz"]["q2"].value;
    var q3 = document.forms["quiz"]["q3"].value;

    for (var i = 1; i <= numofQuestions; i++) {
        if (eval("q" + 1) == "") {
            alert("you missed question number" + i);
        }
    }
    for (var i = 1; i <= numofQuestions; i++) {
        if (eval("q" + 1) == ansArr[i - 1]) {
            score++;
        }
    }

    var results = document.getElementByID("results");
    results.innerHTML = "<h2>You scored" + score + " points out of " + numOfQuestions + "</h2>"
    alert("you scored" + score + "out of " + numOfQuestions);
    return false;
}