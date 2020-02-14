
function prepareData(){
    var data = {};
    $('[data-name]').each(function(){
        var $el = $(this);
        var data_type = $el.attr("data-type");
        var key = $el.attr("data-name");
        var control = $el.attr("data-control");
        console.log(key, data_type);
        if(data_type == "string"){
            var val = $el.val();
            if (val === ""){
                val = null;
            }
            data[key] = val;
        }

        if(data_type == "number"){
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
            if (control === "check"){
                if($el.is(':checked')){
                    val = val;
                }else{
                    val = 0;
                }
                data[key] = val;
            }
            else if (control === "radio"){
                if($el.is(':checked')){
                    val = 1;
                }else{
                    val = 0;
                }
                if (data[key] != 1){
                    data[key] = val;
                }
            }
            else{
                
                data[key] = val;
            }
            
            
        }
    });

    // $('div[imageId="imageN"]').each(function() {
    //     // `this` is the div
    // });

    return data;
}

$(document).ready(function () {
    
    var data = localStorage.getItem("tokhaiyte");
    if (data != "" && data != null && data != undefined) {
        $.each(data, function(key, val){
            $("#" + key).val(val);
        });
    }else{

    }


    //Gửi dữ liệu lên server
    $('#btn-luu').unbind('click').bind('click', function () {

        var data = prepareData();
        console.log("data", data);
        return;

        // var checkedValue = [];
        // var inputElements = $('.phuongtien');
        // for (var i = 0; inputElements[i]; ++i) {
        //     if (inputElements[i].checked) {
        //         checkedValue.push({ 'id': i, "value": 1 });
        //     }
        //     else {
        //         checkedValue.push({ 'id': i, "value": 0 });
        //     }
        // }

        // checkedValue.forEach(function (item, index) {
        //     if (item.id == 0) {
        //         thongtindilai_taubay = Number(item.value)
        //     }
        //     if (item.id == 1) {
        //         thongtindilai_tauthuyen = Number(item.value)
        //     }

        //     if (item.id == 2) {
        //         thongtindilai_oto = Number(item.value)
        //     }

        //     if (item.id == 3) {
        //         thongtindilai_khac = Number(item.value)
        //     }
        // })

        // var valueRadio = [];
        // var danhsachRadio = [
        //     'dauhieubenh_sot',
        //     'dauhieubenh_ho',
        //     'dauhieubenh_khotho',
        //     'dauhieubenh_dauhong',
        //     'dauhieubenh_buonnon',
        //     'dauhieubenh_tieuchay',
        //     'dauhieubenh_xuathuyetngoaida',
        //     'dauhieubenh_phatban',
        //     'tiepxuc_dongvat',
        //     'chamsocnguoibenhtruyennhiem',
        // ]
        // var valuex;
        // danhsachRadio.forEach(function (item, index) {
        //     var radios = document.getElementsByName(item);
        //     for (var i = 0, length = radios.length; i < length; i++) {
        //         if (radios[i].checked) {
        //             valuex = radios[i].value;
        //             valueRadio.push({ 'id': index, 'value': valuex })
        //             break;
        //         }
        //     }
        // })
        // valueRadio.forEach(function (item, index) {
        //     if (item.id == 0) {
        //         dauhieubenh_sot = Number(item.value)
        //     }
        //     if (item.id == 9) {
        //         chamsocnguoibenhtruyennhiem = Number(item.value)
        //     }
        //     if (item.id == 8) {
        //         tiepxuc_dongvat = Number(item.value)
        //     }

        //     if (item.id == 7) {
        //         dauhieubenh_phatban = Number(item.value)
        //     }

        //     if (item.id == 6) {
        //         dauhieubenh_xuathuyetngoaida = Number(item.value)
        //     }
        //     if (item.id == 5) {
        //         dauhieubenh_tieuchay = Number(item.value)
        //     }
        //     if (item.id == 4) {
        //         dauhieubenh_buonnon = Number(item.value)
        //     }

        //     if (item.id == 3) {
        //         dauhieubenh_dauhong = Number(item.value)
        //     }
        //     if (item.id == 2) {
        //         dauhieubenh_khotho = Number(item.value)
        //     }

        //     if (item.id == 1) {
        //         dauhieubenh_ho = Number(item.value)
        //     }

        // })
        // var data = {
        //     "ngaykekhai": String(ngaysoan),
        //     "cuakhau_id": Number("{{cuakhau_id}}"),
        //     "tencuakhau": "{{tencuakhau}}",
        //     "donvi_id": Number("{{donvi_id}}"),
        //     "hoten": $('#hoten').val(),
        //     "namsinh": $('#namsinh').val(),
        //     "gioitinh": selectedGioiTinh,
        //     "quoctich": selectedQuocTich,
        //     "cmtnd": $('#cmtnd').val(),
        //     "thongtindilai_taubay": thongtindilai_taubay,
        //     "thongtindilai_tauthuyen": thongtindilai_tauthuyen,
        //     "thongtindilai_oto": thongtindilai_oto,
        //     "thongtindilai_khac": thongtindilai_khac,
        //     "thongtindilai_chitiet": $('#thongtindilai_chitiet').val(),
        //     "sohieu_phuongtien": $('#sohieu_phuongtien').val(),
        //     "soghe_phuongtien": $('#soghe_phuongtien').val(),
        //     "ngay_khoihanh": $('#ngay_khoihanh').val(),
        //     "ngay_nhapcanh": $('#ngay_nhapcanh').val(),
        //     "noi_khoihanh": $('#noi_khoihanh').val(),
        //     "noiden": $('#noiden').val(),
        //     "quocgiadiqua": $('#quocgiadiqua').val(),
        //     "diachi_taivietnam": $('#diachi_taivietnam').val(),
        //     "sodienthoai": $('#sodienthoai').val(),
        //     "email": $('#email').val(),
        //     "dauhieubenh_sot": dauhieubenh_sot,
        //     "dauhieubenh_ho": dauhieubenh_ho,
        //     "dauhieubenh_khotho": dauhieubenh_khotho,
        //     "dauhieubenh_dauhong": dauhieubenh_dauhong,
        //     "dauhieubenh_buonnon": dauhieubenh_buonnon,
        //     "dauhieubenh_tieuchay": dauhieubenh_tieuchay,
        //     "dauhieubenh_xuathuyetngoaida": dauhieubenh_xuathuyetngoaida,
        //     "dauhieubenh_phatban": dauhieubenh_phatban,
        //     "vacxin_dasudung": $('#vacxin_dasudung').val(),
        //     "tiepxuc_dongvat": tiepxuc_dongvat,
        //     "chamsocnguoibenhtruyennhiem": chamsocnguoibenhtruyennhiem,
        //     "ngon_ngu":$('#ngon_ngu').val(),
        // }

        $.ajax({
            type: "POST",
            url: location.origin + "/api/v1/create_tokhaiyte",
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
