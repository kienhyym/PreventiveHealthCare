$(document).ready(function () {
    var data = localStorage.getItem("tokhaiyte");
    console.log(data);
    if (data != "" && data != null && data != undefined) {
        data = $.parseJSON(data);
        // $.each(data, function(key, val){
        //     $("#" + key).val(val);
        // });
        $('#id').text(data.id);
        $('#hoten').text(data.hoten);
        // $('#ngaykekhai').text(data.ngaykekhai);
        $('#ngaykekhai').text(data.ngaykekhai);
    }

    // var xemcodulieuko = localStorage.getItem('id'); 
    // if (xemcodulieuko != "" && xemcodulieuko != null && xemcodulieuko != undefined) {
    //     localStorage.setItem('lichsu','1');
    // }
    // var lichSu = localStorage.getItem('lichsu');
    // var id = null;
    // var hoten = null;
    // var ngaykekhai = null;
    // var cuakhau_id = null;
    // var ngon_ngu = null;
    // if (lichSu != "" && lichSu != null && lichSu != undefined) {
    //     id = localStorage.getItem('id');
    //     ngaykekhai = localStorage.getItem('ngaykekhai');
    //     hoten = localStorage.getItem('hoten');
    //     ngon_ngu = localStorage.getItem('ngon_ngu')
    //     cuakhau_id = localStorage.getItem('cuakhau_id')

    // }else{
    //     id = "{{id}}";
    //     ngaykekhai = "{{ngaykekhai}}";
    //     cuakhau_id = "{{cuakhau_id}}";
    //     hoten = "{{hoten}}";
    //     ngon_ngu = "{{ngon_ngu}}";
    // }
    // $('#id').text(id)
    // $('#hoten').text(hoten)
    // $('#ngaykekhai').text(ngaykekhai)


    // $('#id').unbind('click').bind('click', function () {
    //     localStorage.setItem('lichsu', 1);
    //     window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id+"/history"
    // })
    // $('#eye').unbind('click').bind('click', function () {
    //     localStorage.setItem('lichsu', 1);
    //     window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id+"/history"
    // })
    $('#vi').unbind('click').bind('click', function () {
        ngon_ngu = "vi"
        localStorage.removeItem('lichsu');
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })
    $('#cn').unbind('click').bind('click', function () {
        ngon_ngu = "cn"

        localStorage.removeItem('lichsu');
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })
    $('#en').unbind('click').bind('click', function () {
        ngon_ngu = "en"
        localStorage.removeItem('lichsu');
        window.location = location.origin + "/medicalform/form/"+ngon_ngu+"/"+cuakhau_id;
    })


    $('.timkiem').unbind('click').bind('click', function () {
        $.ajax({
            type: "POST",
            url: location.origin + "/api/v1/timkiem",
            data: JSON.stringify({
                "hochieu": $('.inputSohochieu').val()
            }),
            contentType: "application/json",

            success: function (response) {
                $('.lichsumoinhat').remove();
                $('.lichsutimkiem').remove();

                response.forEach(function (item, index) {
                    $('#lichsu').append(`<div class="border pl-2 mb-5 lichsutimkiem" style="border-radius: 5px;position: relative;">
                                    <div class="border-bottom mt-2">Mã tờ khai: &nbsp;<u><a href="${location.origin}+ "/medicalform/form/"+${item.ngon_ngu}+"/"+${item.cuakhau_id}+"/"+${item.id}" style="color: red;">${item.id}</a></u><a href="${location.origin}+ "/medicalform/form/"+${item.ngon_ngu}+"/"+${item.cuakhau_id}+"/"+${item.id}" style="font-size:0.7em;float: right;color: #212529;position: absolute;top:-3px;right:3px" ><i class="fa fa-eye" aria-hidden="true"></i></a></div>
                                    <div class="row">
                                        <div class="col-5" style="font-size: 0.7em;"><label>Họ và tên:</label><label style="float: right;"><i class="fa fa-angle-double-right" aria-hidden="true"></i></label></div>
                                        <div class="col-7" style="font-size: 0.7em;"><label>${item.hoten}</label></div>
                                    </div>
                                    <div class="row">
                                        <div class="col-5" style="font-size: 0.7em;"><label>Ngày khai:</label><label style="float: right;"><i class="fa fa-angle-double-right" aria-hidden="true"></i></label></div>
                                        <div class="col-7" style="font-size: 0.7em;"><label>${item.ngaykekhai}</label></div>
                                    </div>
                                </div>`)


                })

            },
            error: function (response) {

            }
        });
    })
})