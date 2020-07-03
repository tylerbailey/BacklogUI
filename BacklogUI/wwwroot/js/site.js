//Events

//event handler for the submit button
$("#submitBtn").click(function () {
    reset();
    var vanityUrl = $("#urlTextBox").val();
    if (validate(vanityUrl)) {
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
    }
});

//event handler for again button on bottom of page
$("#againBtn").click(function () {
    $("#submitBtn").click();
});

//Functions

//Resets page elements to on new page load state
function reset() {
    $("#gameLink").attr("")
    $("#gameImage").attr("src", "").hide();;
    $("#againBtn").hide();
    $("#fadeInText").hide();
    $("#errorText").hide();
};

//Custom validation to ensure url was included in text box
function validate(vanityUrl) {    
    var isValid;
    if (vanityUrl == "") {
        $("#urlTextBox").removeClass("is-valid");
        $("#urlTextBox").addClass("is-invalid");
        isValid = false;
    }
    else {
        $("#urlTextBox").addClass("is-valid");
        $("#urlTextBox").removeClass("is-invalid");
        isValid = true;
    }
    return isValid;
} 