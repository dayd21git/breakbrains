$(function() {
    $("#btn-search").click(function() {
        var search = $("#search").val().toLowerCase();

        $(".mod-hover").filter(function() {
            if (search != '' && search.length > 1) {
                if ($(this).text().toLowerCase().indexOf(search) > -1) {
                    $(this).addClass('d-block');
                    $(this).removeClass('d-none');
                } else {
                    $(this).addClass('d-none');
                    $(this).removeClass('d-block');
                }
            } else {
                $(this).addClass('d-block');
                $(this).removeClass('d-none');
            }
        });
    });
});