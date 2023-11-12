function isJsonString(str) {
    try {
        JSON.parse(str);
    } catch (e) {
        return false;
    }
    return true;
}

$(function() {
    console.log("booyah!");
    $("#json-text-area").val("");

    $("#json-str-btn").addClass("dark:text-teal-700 border-teal-700");

    $("#json-tree-btn").click(function() {
        if ($("#json-text-area").val().length > 0) {
            if (isJsonString($("#json-text-area").val())) {
                $("#json-str-btn").removeClass("dark:text-teal-700 border-teal-700");
                $("#json-tree-btn").addClass("dark:text-teal-700 border-teal-700");
                $("#json-text-area").hide();

                $("#copy_btn").attr("hidden", true);
                $("#paste_btn").attr("hidden", true);
                $("#format_btn").attr("hidden", true);
                $("#clear_btn").attr("hidden", true);

                $("#wrapper").show();
                $("#expand_btn").attr("hidden", false);
                $("#collapse_btn").attr("hidden", false);
                if(document.getElementsByClassName("jsontree_tree").length > 0) {
                    document.getElementsByClassName("jsontree_tree")[0].remove();
                }
                var wrapper = document.getElementById("wrapper");
                var tree = jsonTree.create(JSON.parse($("#json-text-area").val()), wrapper);
            } else {
                    alert("Invalid JSON!");
            }
        } else {
            alert("JSON can not be empty!");
        }
    });

    $("#json-str-btn").click(function() {
        $("#json-str-btn").addClass("dark:text-teal-700 border-teal-700");
        $("#json-tree-btn").removeClass("dark:text-teal-700 border-teal-700");
        $("#wrapper").hide();
        $("#json-text-area").show();

        $("#expand_btn").attr("hidden", true);
        $("#collapse_btn").attr("hidden", true);

        $("#copy_btn").attr("hidden", false);
        $("#paste_btn").attr("hidden", false);
        $("#format_btn").attr("hidden", false);
        $("#clear_btn").attr("hidden", false);
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
            alert("Fail to format due to Invalid JSON!");
        }
    });

    $("#copy_btn").click(function() {
        let inpJSON = $("#json-text-area").val()
        navigator.clipboard.writeText(inpJSON);
        alert("copied");
    });

    $("#paste_btn").click(function() {
        // NOTE: add check for firefox
        $("#json-text-area").val(navigator.clipboard.readText());
    });

    $("#clear_btn").click(function() {
        $("#json-text-area").val("");
    });

});