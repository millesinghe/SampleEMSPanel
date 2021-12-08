$(function () {
    function display(bool) {
        if (bool) {
            $("#container").show();
        } else {
            $("#container").hide();
        }
    }

    display(false)

    window.addEventListener('message', function(event) {
        var item = event.data;
        if (item.type === "ui") {
            if (item.status == true) {
                display(true)
            } else {
                display(false)
            }
        }
    })
    // if the person uses the escape key, it will exit the resource
    document.onkeyup = function (data) {
        if (data.which == 27) {
            $.post('https://emspanel/exit', JSON.stringify({}));
        }
    };
    $("#close").click(function () {
        $.post('https://emspanel/exit', JSON.stringify({}));
    })
    //when the user clicks on the submit button, it will run
    $("#submit").click(function () {
        let inputRes = $("#responder").val()
        let inputAlert = $("#alert").val()
        
        if (!inputRes) {
            $.post("https://emspanel/error", JSON.stringify({
                error: "There was no value in the EMS Responder field"
            }))
            return
        } else if (!inputAlert) {
            $.post("https://emspanel/error", JSON.stringify({
                error: "There was no value in the Alert ID field"
            }))
            return
        }
        // if there are no errors from above, we can send the data back to the original callback and handle it from there
        $.post('https://emspanel/main', JSON.stringify({
            text: "/112r " + inputAlert + " Coming to rescue. ( "+ inputRes +" )",
        }));
        return;
    })

    $("#timebuy").click(function () {
        let inputAlert = $("#alert").val()
        
        if (!inputAlert) {
            $.post("https://emspanel/error", JSON.stringify({
                error: "There was no value in the Responder field"
            }))
            return
        }
        // if there are no errors from above, we can send the data back to the original callback and handle it from there
        $.post('https://emspanel/main', JSON.stringify({
            text: "/112r " + inputAlert + " Please hold for 5 minutes - EMS is Busy Now",
        }));
        return;
    })
})