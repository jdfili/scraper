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
    });
    $(".scrape").on("click", function () {
        location.reload();
    });
    $(".submit").on("click", function () {
        var value = $(this).attr("data-id");
        var newComment = {
            title: $("#title-input" + value).val().trim(),
            body: $("#body-input" + value).val().trim()
        };
        if (newComment.title === "" || newComment.body === "") {
            alert("Please fill out all text fields.")
        }
        else {
            var id = $(this).attr("data-id");
            $.ajax({
                method: "POST",
                url: "/articles/" + id,
                data: newComment
            }).then(function () {
                location.reload();
            });
        }
    });

    $(".delete").on("click", function () {
        var id = $(this).attr("data-id");
        $.ajax({
            method: "DELETE",
            url: "/articles/" + id
        }).then(function () {
            location.reload();
        })
    })
});
