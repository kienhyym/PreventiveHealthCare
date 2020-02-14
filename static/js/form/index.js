function loadToKhaiYTe(){
    var data = localStorage.getItem("tokhaiyte");
    if ((!!data) && (data != null) && (data != "") && (data != "null")) {
        // console.log(data);
        data = $.parseJSON(data);
        $('#id').text(data.id);
        $('#hoten').text(data.hoten);
        $('#ngaykekhai').text(moment(data.ngaykekhai).startOf('day').format("DD/MM/YYYY"));
    }else{
        $('#id').text("");
        $('#hoten').text("");
        $('#ngaykekhai').text("");
    }
}

function timKiemToKhai(){
    $.ajax({
        type: "POST",
        url: location.origin + "/medicalform/search",
        data: JSON.stringify({
            "hochieu": $('.inputSohochieu').val(),
            "cuakhau_id": cuakhau_id
        }),
        contentType: "application/json",

        success: function (response) {
            localStorage.setItem("tokhaiyte", JSON.stringify(response));
            loadToKhaiYTe();
        },
        error: function (response) {
            localStorage.setItem("tokhaiyte", "");
            loadToKhaiYTe();
        }
    });
}

$(document).ready(function () {
    loadToKhaiYTe();
    $('#vi').unbind('click').bind('click', function () {
        window.location = location.origin + "/medicalform/form/vi/"+cuakhau_id;
    })
    $('#cn').unbind('click').bind('click', function () {
        window.location = location.origin + "/medicalform/form/cn/"+cuakhau_id;
    })
    $('#en').unbind('click').bind('click', function () {
        window.location = location.origin + "/medicalform/form/en/"+cuakhau_id;
    })

    $('#cmtnd').unbind('change').bind('change', function () {
        timKiemToKhai();
    })


    $('.timkiem').unbind('click').bind('click', function () {
        timKiemToKhai()
    })
})