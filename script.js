function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

function displayAlert(alertMessage) {
    $("#alert_msg").text(alertMessage);
    $("#alert_box").attr("hidden", false);
    setTimeout(function() {$("#alert_box").attr("hidden", true);}, 3000);
}

$(function() {
    var tree = null;
    console.log("booyah!");
    $("#json-text-area").val("");

    $("#json-str-btn").addClass("dark:text-teal-700 border-teal-700");

    $("#json-tree-btn").click(function() {
        if ($("#json-text-area").val().length > 0) {
            if (isJsonString($("#json-text-area").val())) {
                $("#json-str-btn").removeClass("dark:text-teal-700 border-teal-700");
                $("#json-tree-btn").addClass("dark:text-teal-700 border-teal-700");
                $(".text-area").hide();

                $(".wrapper-class").show();
                if(document.getElementsByClassName("jsontree_tree").length > 0) {
                    document.getElementsByClassName("jsontree_tree")[0].remove();
                }
                var wrapper = document.getElementById("wrapper");
                tree = jsonTree.create(JSON.parse($("#json-text-area").val()), wrapper);
            } else {
                    displayAlert("Invalid JSON!");
            }
        } else {
            displayAlert("JSON can not be empty!");
        }
    });

    $("#json-str-btn").click(function() {
        $("#json-str-btn").addClass("dark:text-teal-700 border-teal-700");
        $("#json-tree-btn").removeClass("dark:text-teal-700 border-teal-700");
        $(".text-area").show();
        $(".wrapper-class").hide();
    });

    $("#format_btn").click(function() {
        let inpJSON = $("#json-text-area").val()
        console.log(inpJSON);
        if (isJsonString(inpJSON)) {
            var formatChar = "";
            if (!inpJSON.includes("\t")) {
                formatChar = "\t";
            }
            $("#json-text-area").val(JSON.stringify(JSON.parse(inpJSON), null, formatChar));
        } else {
            displayAlert("Fail to format due to Invalid JSON!");
        }
    });

    $("#expand_btn").click(function() {
        if (tree) {
            tree.expand();
        }
    });

    $("#collapse_btn").click(function() {
        if (tree) {
                tree.collapse();
            }
    });

    $("#copy_btn").click(function() {
        let inpJSON = $("#json-text-area").val()
        navigator.clipboard.writeText(inpJSON);
        displayAlert("Copied!");
    });

    $("#paste_btn").click(function() {
        // NOTE: add check for firefox
        $("#json-text-area").val(navigator.clipboard.readText());
    });

    $("#clear_btn").click(function() {
        $("#json-text-area").val("");
    });

});