$(document).ready(function () {
    $(".comment").hide();
    $(".article").on("click", function () {
        var form = $(this).attr("data-id");
        // $("#comment-title" + form).empty();
        // $("#comment-body" + form).empty();
        $("." + form).show();
        if ($(this).hasClass("clicked")) {
            $(this).removeClass("clicked");
            $("." + form).hide()
        } else {
            $(this).addClass("clicked");
        }
        $.ajax({
            method: "GET",
            url: "/articles/" + form
        }).then(function (res) {
            // console.log(res.comment.title);
            // console.log(res.comment.body);
            // $("#comment-title" + form).append(res.comment.title);
            // $("#comment-body" + form).append(res.comment.body);
            console.log(res);
        })
    });
    $(".submit").on("click", function () {
        var value = $(this).attr("data-id");
        var newComment = {
            title: $("#title-input" + value).val().trim(),
            body: $("#body-input" + value).val().trim()
        };
        console.log(newComment)
        var id = $(this).attr("data-id");
        $.ajax({
            method: "POST",
            url: "/articles/" + id,
            data: newComment
        }).then(function () {
            console.log("posted");
        });
    });
    $(".delete").on("click", function(){
        var id = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/articles/" + id
        }).then(function(){
            location.reload();
        })
    })
});
