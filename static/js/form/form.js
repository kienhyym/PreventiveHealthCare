
function prepareData(){
    var data = {};
    data["ngaykekhai"] = moment().startOf('day').format("YYYY-MM-DD");
    $('[data-name]').each(function(){
        var $el = $(this);
        var data_type = $el.attr("data-type");
        var key = $el.attr("data-name");
        var control = $el.attr("data-control");

        if (!data.hasOwnProperty(key)){
            data[key] = null;
        }

        if(data_type == "string"){
            var val = $el.val();
            if (val === ""){
                val = null;
            }
            data[key] = val;
        }

        if(data_type == "number"){
            if (control === "checkbox"){
                var val = $el.val();
                if($el.is(':checked')){
                    val = 1;
                }else{
                    val = 0;
                }
                data[key] = val;
            }
            else if (control === "radio"){
                var val = $el.val();
                if($el.is(':checked')){
                    val = parseInt(val);
                    data[key] = val;
                }
            }
            else{
                var val = $el.val();
                if (val === ""){
                    val = null;
                }else{
                    try {
                        val = parseInt(val);
                    }
                    catch(err) {
                        val = null;
                    }
                }
                data[key] = val;
            }
            
            
        }
    });

    return data;
}

$(document).ready(function () {
    
    // var data = localStorage.getItem("tokhaiyte");
    // if (data != "" && data != null && data != undefined) {
    //     $.each(data, function(key, val){
    //         $("#" + key).val(val);
    //     });
    // }else{

    // }

    $('#hoten').bind("change", function(){
        var $el = $(this)
        var val = $el.val();
        var valUp = val.toUpperCase();
        if (valUp !== val){
            $el.val(valUp)
        }
    })

    //Gửi dữ liệu lên server
    $('#btn-luu').unbind('click').bind('click', function () {

        var data = prepareData();
        // console.log("data", data);

        $.ajax({
            type: "POST",
            url: location.origin + "/medicalform/create",
            data: JSON.stringify(data),
            contentType: "application/json",
            success: function (response) {
                localStorage.setItem("tokhaiyte", JSON.stringify(response));
                window.location = location.origin + "/medicalform/qr/" + response.cuakhau_id
            },
            error: function (response) {

            }
        });
    })

});
