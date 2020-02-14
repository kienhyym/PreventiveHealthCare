$(document).ready(function () {
    var data = localStorage.getItem("tokhaiyte");
    console.log(data);
    if (data != "" && data != null && data != undefined) {
        data = $.parseJSON(data);
        $('#id').text(data.id);
        $('#hoten').text(data.hoten);
        
        $('#ngaykekhai').text(moment(data.ngaykekhai).startOf('day').format("DD/MM/YYYY"));
    }

    $('#vi').unbind('click').bind('click', function () {
        ngon_ngu = "vi"
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })
    $('#cn').unbind('click').bind('click', function () {
        ngon_ngu = "cn"
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })
    $('#en').unbind('click').bind('click', function () {
        ngon_ngu = "en"
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })


    $('.timkiem').unbind('click').bind('click', function () {
        $.ajax({
            type: "POST",
            url: location.origin + "/medicalform/search",
            data: JSON.stringify({
                "hochieu": $('.inputSohochieu').val()
            }),
            contentType: "application/json",

            success: function (response) {
                // $('.lichsumoinhat').remove();
                // $('.lichsutimkiem').remove();

                // response.forEach(function (item, index) {
                //     $('#lichsu').append(`<div class="border pl-2 mb-5 lichsutimkiem" style="border-radius: 5px;position: relative;">
                //                     <div class="border-bottom mt-2">Mã tờ khai: &nbsp;<u><a href="${location.origin}+ "/medicalform/form/"+${item.ngon_ngu}+"/"+${item.cuakhau_id}+"/"+${item.id}" style="color: red;">${item.id}</a></u><a href="${location.origin}+ "/medicalform/form/"+${item.ngon_ngu}+"/"+${item.cuakhau_id}+"/"+${item.id}" style="font-size:0.7em;float: right;color: #212529;position: absolute;top:-3px;right:3px" ><i class="fa fa-eye" aria-hidden="true"></i></a></div>
                //                     <div class="row">
                //                         <div class="col-5" style="font-size: 0.7em;"><label>Họ và tên:</label><label style="float: right;"><i class="fa fa-angle-double-right" aria-hidden="true"></i></label></div>
                //                         <div class="col-7" style="font-size: 0.7em;"><label>${item.hoten}</label></div>
                //                     </div>
                //                     <div class="row">
                //                         <div class="col-5" style="font-size: 0.7em;"><label>Ngày khai:</label><label style="float: right;"><i class="fa fa-angle-double-right" aria-hidden="true"></i></label></div>
                //                         <div class="col-7" style="font-size: 0.7em;"><label>${item.ngaykekhai}</label></div>
                //                     </div>
                //                 </div>`)


                // })

            },
            error: function (response) {

            }
        });
    })
})