//Events
$("#submitBtn").click(function () {
    reset();
    var vanityUrl = $("#urlTextBox").val();
    $("#fadeInText").fadeIn("slow");
    $.ajax({
        type: "POST",
        url: "/backlog/getselectedgame",
        data: {
            'vanityUrl': vanityUrl
        },
        success: function (data, textStatus, jqXHR) {
            var JSONData = JSON.parse(data);
            if (JSONData.Success == true) {               
                $("#gameLink").attr("href", "https://store.steampowered.com/app/" + JSONData.Data.appid + "/");
                $("#gameImage").attr("src", "https://steamcdn-a.akamaihd.net/steam/apps/" + JSONData.Data.appid + "/header.jpg").fadeIn("slow");
                $("#againBtn").fadeIn("slow");
            }
            else {
                $("#fadeInText").hide();
                $("#gameImage").attr("src", "/images/confusedkid.png").fadeIn("slow");
                $("#errorText").text(JSONData.Data).show();
            }
        },
        error: function (xhr, ajaxOptions, data) {
            $("#fadeInText").hide();
            $("#gameImage").attr("src", "/images/confusedkid.png").fadeIn("slow");
            $("#errorText").text("bruh you broke it").show();
        }
    })
});

$("#againBtn").click(function () {
    $("#submitBtn").click();
});

//Functions
function reset() {
    $("#gameLink").attr("")
    $("#gameImage").attr("src", "").hide();;
    $("#againBtn").hide();
    $("#fadeInText").hide();
    $("#errorText").hide();
};
