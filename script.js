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
                $("#wrapper").show();
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
    });



});