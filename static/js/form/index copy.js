
    $(document).ready(function () {
        
        var data = localStorage.getItem("tokhaiyte");
        if (data != "" && data != null && data != undefined) {
            $.each(data, function(key, val){
                $("#" + key).val(val);
            });
        }else{

        }



        var lichSu = localStorage.getItem('lichsu');
        var id = null;
        var ngaykekhai = null;
        var cuakhau_id = null;
        var tencuakhau = null;
        var donvi_id = null;
        var hoten = null;
        var namsinh = null;
        var gioitinh = null;
        var quoctich = null;
        var cmtnd = null;
        var thongtindilai_taubay = null;
        var thongtindilai_tauthuyen = null;
        var thongtindilai_oto = null;
        var thongtindilai_khac = null;
        var thongtindilai_chitiet = null;
        var sohieu_phuongtien = null;
        var soghe_phuongtien = null;
        var ngay_khoihanh = null;
        var ngay_nhapcanh = null;
        var noi_khoihanh = null;
        var noiden = null;
        var quocgiadiqua = null;
        var diachi_taivietnam = null;
        var sodienthoai = null;
        var email = null;
        var dauhieubenh_sot = null;
        var dauhieubenh_ho = null;
        var dauhieubenh_khotho = null;
        var dauhieubenh_dauhong = null;
        var dauhieubenh_buonnon = null;
        var dauhieubenh_tieuchay = null;
        var dauhieubenh_xuathuyetngoaida = null;
        var dauhieubenh_phatban = null;
        var vacxin_dasudung = null;
        var tiepxuc_dongvat = null;
        var chamsocnguoibenhtruyennhiem = null;
        var ngon_ngu = null;
        if (lichSu != "" && lichSu != null && lichSu != undefined) {
            $('#btn-luu').remove();

            id = localStorage.getItem('id');

            ngaykekhai = localStorage.getItem('ngaykekhai');
            cuakhau_id = localStorage.getItem('cuakhau_id');
            tencuakhau = localStorage.getItem('tencuakhau');
            donvi_id = localStorage.getItem('donvi_id');
            hoten = localStorage.getItem('hoten');
            namsinh = localStorage.getItem('namsinh');
            gioitinh = localStorage.getItem('gioitinh');
            quoctich = localStorage.getItem('quoctich');
            cmtnd = localStorage.getItem('cmtnd');
            thongtindilai_taubay = localStorage.getItem('thongtindilai_taubay');
            thongtindilai_tauthuyen = localStorage.getItem('thongtindilai_tauthuyen');
            thongtindilai_oto = localStorage.getItem('thongtindilai_oto');
            thongtindilai_khac = localStorage.getItem('thongtindilai_khac');
            thongtindilai_chitiet = localStorage.getItem('thongtindilai_chitiet');
            sohieu_phuongtien = localStorage.getItem('sohieu_phuongtien');
            soghe_phuongtien = localStorage.getItem('soghe_phuongtien');
            ngay_khoihanh = localStorage.getItem('ngay_khoihanh');
            ngay_nhapcanh = localStorage.getItem('ngay_nhapcanh');
            noi_khoihanh = localStorage.getItem('noi_khoihanh');
            noiden = localStorage.getItem('noiden');
            quocgiadiqua = localStorage.getItem('quocgiadiqua');
            diachi_taivietnam = localStorage.getItem('diachi_taivietnam');
            sodienthoai = localStorage.getItem('sodienthoai');
            email = localStorage.getItem('email');
            dauhieubenh_sot = localStorage.getItem('dauhieubenh_sot');
            dauhieubenh_ho = localStorage.getItem('dauhieubenh_ho');
            dauhieubenh_khotho = localStorage.getItem('dauhieubenh_khotho');
            dauhieubenh_dauhong = localStorage.getItem('dauhieubenh_dauhong');
            dauhieubenh_buonnon = localStorage.getItem('dauhieubenh_buonnon');
            dauhieubenh_tieuchay = localStorage.getItem('dauhieubenh_tieuchay');
            dauhieubenh_xuathuyetngoaida = localStorage.getItem('dauhieubenh_xuathuyetngoaida');
            dauhieubenh_phatban = localStorage.getItem('dauhieubenh_phatban');
            vacxin_dasudung = localStorage.getItem('vacxin_dasudung');
            tiepxuc_dongvat = localStorage.getItem('tiepxuc_dongvat');
            chamsocnguoibenhtruyennhiem = localStorage.getItem('chamsocnguoibenhtruyennhiem');
            ngon_ngu  = localStorage.getItem('ngon_ngu');
        }
        else {
            // id = "{{id}}";
            // ngaykekhai = "{{ngaykekhai}}";
            // cuakhau_id = "{{cuakhau_id}}";
            // tencuakhau = "{{tencuakhau}}";
            // donvi_id = "{{donvi_id}}";
            // hoten = "{{hoten}}";
            // namsinh = "{{namsinh}}";
            // gioitinh = "{{gioitinh}}";
            // quoctich = "{{quoctich}}";
            // cmtnd = "{{cmtnd}}";
            // thongtindilai_taubay = "{{thongtindilai_taubay}}";
            // thongtindilai_tauthuyen = "{{thongtindilai_tauthuyen}}";
            // thongtindilai_oto = "{{thongtindilai_oto}}";
            // thongtindilai_khac = "{{thongtindilai_khac}}";
            // thongtindilai_chitiet = "{{thongtindilai_chitiet}}";
            // sohieu_phuongtien = "{{sohieu_phuongtien}}";
            // soghe_phuongtien = "{{soghe_phuongtien}}";
            // ngay_khoihanh = "{{ngay_khoihanh}}";
            // ngay_nhapcanh = "{{ngay_nhapcanh}}";
            // noi_khoihanh = "{{noi_khoihanh}}";

            // noiden = "{{noiden}}";
            // quocgiadiqua = "{{quocgiadiqua}}";
            // diachi_taivietnam = "{{diachi_taivietnam}}";
            // sodienthoai = "{{sodienthoai}}";
            // email = "{{email}}";
            // dauhieubenh_sot = "{{dauhieubenh_sot}}";
            // dauhieubenh_ho = "{{dauhieubenh_ho}}";
            // dauhieubenh_khotho = "{{dauhieubenh_khotho}}";
            // dauhieubenh_dauhong = "{{dauhieubenh_dauhong}}";
            // dauhieubenh_buonnon = "{{dauhieubenh_buonnon}}";
            // dauhieubenh_tieuchay = "{{dauhieubenh_tieuchay}}";
            // dauhieubenh_xuathuyetngoaida = "{{dauhieubenh_xuathuyetngoaida}}";
            // dauhieubenh_phatban = "{{dauhieubenh_phatban}}";
            // vacxin_dasudung = "{{vacxin_dasudung}}";
            // tiepxuc_dongvat = "{{tiepxuc_dongvat}}";
            // chamsocnguoibenhtruyennhiem = "{{chamsocnguoibenhtruyennhiem}}";
            // ngon_ngu = "{{ngon_ngu}}";
        }

        /////KHU VỰC HIỂN THỊ GIÁ TRỊ 
        //Hiển thị ô text
        $("#hoten").val(hoten);
        $("#namsinh").val(namsinh);
        $("#cmtnd").val(cmtnd);
        $("#thongtindilai_chitiet").val(thongtindilai_chitiet);
        $("#soghe_phuongtien").val(soghe_phuongtien);
        $("#ngay_khoihanh").val(ngay_khoihanh.slice(0,10));
        $("#ngay_nhapcanh").val(ngay_nhapcanh.slice(0,10));
        $("#noi_khoihanh").val(noi_khoihanh);
        $("#noiden").val(noiden);
        $("#sohieu_phuongtien").val(sohieu_phuongtien);
        $("#quocgiadiqua").val(quocgiadiqua);
        $("#diachi_taivietnam").val(diachi_taivietnam);
        $("#sodienthoai").val(sodienthoai);
        $("#email").val(email);
        $("#vacxin_dasudung").val(vacxin_dasudung);
        $('#ngaykekhai').html('Ngày khai:' + ngaykekhai.slice(0,10))


        //Hiển thị kết quả giới tính và quốc tịch
        $(".gioitinh").val(gioitinh);
        $(".quoctich").val(quoctich);

        //Hiển thị kết quả radio dấu hiệu và tiếp xúc
        var dauhieuvatiepxuc = [
            { "text": "dauhieubenh_sot", "value": dauhieubenh_sot },
            { "text": "dauhieubenh_ho", "value": dauhieubenh_ho },
            { "text": "dauhieubenh_khotho", "value": dauhieubenh_khotho },
            { "text": "dauhieubenh_dauhong", "value": dauhieubenh_dauhong },
            { "text": "dauhieubenh_buonnon", "value": dauhieubenh_buonnon },
            { "text": "dauhieubenh_tieuchay", "value": dauhieubenh_tieuchay },
            { "text": "dauhieubenh_xuathuyetngoaida", "value": dauhieubenh_xuathuyetngoaida },
            { "text": "dauhieubenh_phatban", "value": dauhieubenh_phatban },
            { "text": "tiepxuc_dongvat", "value": tiepxuc_dongvat },
            { "text": "chamsocnguoibenhtruyennhiem", "value": chamsocnguoibenhtruyennhiem },
        ]
        dauhieuvatiepxuc.forEach(function (item, index) {
            if (item.value === "1") {
                $('#' + item.text + '1').prop('checked', true);
            }
            if (item.value === "0") {
                $('#' + item.text + '0').prop('checked', true);
            }
        })

        //Hiên thi kết quả check box thông tin đi lại
        var thongtindilai = [
            { "text": "thongtindilai_taubay", "value": thongtindilai_taubay },
            { "text": "thongtindilai_tauthuyen", "value": thongtindilai_tauthuyen },
            { "text": "thongtindilai_oto", "value": thongtindilai_oto },
            { "text": "thongtindilai_khac", "value": thongtindilai_khac },
        ]
        thongtindilai.forEach(function (item, index) {
            if (item.value === "1") {
                $('#' + item.text).prop('checked', true);
            }
        })
        

        /////KHU VỰC LẤY GIÁ TRỊ ĐỂ GỬI ĐI
        //Chọn giới tính
        var selectedGioiTinh;
        $("select.gioitinh").change(function () {
            selectedGioiTinh = $(this).children("option:selected").val();
        });
        var selectedQuocTich;
        $("select.quoctich").change(function () {
            selectedQuocTich = $(this).children("option:selected").val();
        });
        //Cài ngày hôm nay 
        var d = new Date();
        var nam = d.getFullYear();
        var thang = d.getMonth()+1;
        var ngay = d.getDate();
        var ngaysoan = nam+ '-' + thang + '-' + ngay;
        console.log(ngaysoan)

        if (id !== "") {
            $('#btn-luu').remove();
            $('#maToKhai').html('Mã tờ khai:' + id)
        }
        // Ẩn chức nút lưu          
        if (ngaykekhai == "" || ngaykekhai == null || ngaykekhai == undefined) {
            $('#ngaykekhai').html('Ngày khai:' + ngaysoan)
        }

        //Giá trị radio
        var dauhieubenh_sot = null;
        var dauhieubenh_ho = null;
        var dauhieubenh_khotho = null;
        var dauhieubenh_dauhong = null;
        var dauhieubenh_buonnon = null;
        var dauhieubenh_tieuchay = null;
        var dauhieubenh_xuathuyetngoaida = null;
        var dauhieubenh_phatban = null;
        var tiepxuc_dongvat = null;
        var chamsocnguoibenhtruyennhiem = null;
        var thongtindilai_taubay = null;
        var thongtindilai_tauthuyen = null;
        var thongtindilai_oto = null;
        var thongtindilai_khac = null;

        //Gửi dữ liệu lên server
        $('#btn-luu').unbind('click').bind('click', function () {
            var checkedValue = [];
            var inputElements = $('.phuongtien');
            for (var i = 0; inputElements[i]; ++i) {
                if (inputElements[i].checked) {
                    checkedValue.push({ 'id': i, "value": 1 });
                }
                else {
                    checkedValue.push({ 'id': i, "value": 0 });
                }
            }

            checkedValue.forEach(function (item, index) {
                if (item.id == 0) {
                    thongtindilai_taubay = Number(item.value)
                }
                if (item.id == 1) {
                    thongtindilai_tauthuyen = Number(item.value)
                }

                if (item.id == 2) {
                    thongtindilai_oto = Number(item.value)
                }

                if (item.id == 3) {
                    thongtindilai_khac = Number(item.value)
                }
            })

            var valueRadio = [];
            var danhsachRadio = [
                'dauhieubenh_sot',
                'dauhieubenh_ho',
                'dauhieubenh_khotho',
                'dauhieubenh_dauhong',
                'dauhieubenh_buonnon',
                'dauhieubenh_tieuchay',
                'dauhieubenh_xuathuyetngoaida',
                'dauhieubenh_phatban',
                'tiepxuc_dongvat',
                'chamsocnguoibenhtruyennhiem',
            ]
            var valuex;
            danhsachRadio.forEach(function (item, index) {
                var radios = document.getElementsByName(item);
                for (var i = 0, length = radios.length; i < length; i++) {
                    if (radios[i].checked) {
                        valuex = radios[i].value;
                        valueRadio.push({ 'id': index, 'value': valuex })
                        break;
                    }
                }
            })
            valueRadio.forEach(function (item, index) {
                if (item.id == 0) {
                    dauhieubenh_sot = Number(item.value)
                }
                if (item.id == 9) {
                    chamsocnguoibenhtruyennhiem = Number(item.value)
                }
                if (item.id == 8) {
                    tiepxuc_dongvat = Number(item.value)
                }

                if (item.id == 7) {
                    dauhieubenh_phatban = Number(item.value)
                }

                if (item.id == 6) {
                    dauhieubenh_xuathuyetngoaida = Number(item.value)
                }
                if (item.id == 5) {
                    dauhieubenh_tieuchay = Number(item.value)
                }
                if (item.id == 4) {
                    dauhieubenh_buonnon = Number(item.value)
                }

                if (item.id == 3) {
                    dauhieubenh_dauhong = Number(item.value)
                }
                if (item.id == 2) {
                    dauhieubenh_khotho = Number(item.value)
                }

                if (item.id == 1) {
                    dauhieubenh_ho = Number(item.value)
                }

            })
            var data = {
                "ngaykekhai": String(ngaysoan),
                "cuakhau_id": Number("{{cuakhau_id}}"),
                "tencuakhau": "{{tencuakhau}}",
                "donvi_id": Number("{{donvi_id}}"),
                "hoten": $('#hoten').val(),
                "namsinh": $('#namsinh').val(),
                "gioitinh": selectedGioiTinh,
                "quoctich": selectedQuocTich,
                "cmtnd": $('#cmtnd').val(),
                "thongtindilai_taubay": thongtindilai_taubay,
                "thongtindilai_tauthuyen": thongtindilai_tauthuyen,
                "thongtindilai_oto": thongtindilai_oto,
                "thongtindilai_khac": thongtindilai_khac,
                "thongtindilai_chitiet": $('#thongtindilai_chitiet').val(),
                "sohieu_phuongtien": $('#sohieu_phuongtien').val(),
                "soghe_phuongtien": $('#soghe_phuongtien').val(),
                "ngay_khoihanh": $('#ngay_khoihanh').val(),
                "ngay_nhapcanh": $('#ngay_nhapcanh').val(),
                "noi_khoihanh": $('#noi_khoihanh').val(),
                "noiden": $('#noiden').val(),
                "quocgiadiqua": $('#quocgiadiqua').val(),
                "diachi_taivietnam": $('#diachi_taivietnam').val(),
                "sodienthoai": $('#sodienthoai').val(),
                "email": $('#email').val(),
                "dauhieubenh_sot": dauhieubenh_sot,
                "dauhieubenh_ho": dauhieubenh_ho,
                "dauhieubenh_khotho": dauhieubenh_khotho,
                "dauhieubenh_dauhong": dauhieubenh_dauhong,
                "dauhieubenh_buonnon": dauhieubenh_buonnon,
                "dauhieubenh_tieuchay": dauhieubenh_tieuchay,
                "dauhieubenh_xuathuyetngoaida": dauhieubenh_xuathuyetngoaida,
                "dauhieubenh_phatban": dauhieubenh_phatban,
                "vacxin_dasudung": $('#vacxin_dasudung').val(),
                "tiepxuc_dongvat": tiepxuc_dongvat,
                "chamsocnguoibenhtruyennhiem": chamsocnguoibenhtruyennhiem,
                "ngon_ngu":$('#ngon_ngu').val(),
            }

            $.ajax({
                type: "POST",
                url: location.origin + "/api/v1/create_tokhaiyte",
                data: JSON.stringify(data),
                contentType: "application/json",
                success: function (response) {

                    localStorage.setItem("tokhaiyte", JSON.stringify(response));

                    // localStorage.setItem('id', response.id);
                    // localStorage.setItem('ngaykekhai', response.ngaykekhai);
                    // localStorage.setItem('cuakhau_id', response.cuakhau_id);
                    // localStorage.setItem('tencuakhau', response.tencuakhau);
                    // localStorage.setItem('donvi_id', response.donvi_id);
                    // localStorage.setItem('hoten', response.hoten);
                    // localStorage.setItem('namsinh', response.namsinh);
                    // localStorage.setItem('gioitinh', response.gioitinh);
                    // localStorage.setItem('quoctich', response.quoctich);
                    // localStorage.setItem('cmtnd', response.cmtnd);
                    // localStorage.setItem('thongtindilai_taubay', response.thongtindilai_taubay);
                    // localStorage.setItem('thongtindilai_tauthuyen', response.thongtindilai_tauthuyen);
                    // localStorage.setItem('thongtindilai_oto', response.thongtindilai_oto);
                    // localStorage.setItem('thongtindilai_khac', response.thongtindilai_khac);
                    // localStorage.setItem('thongtindilai_chitiet', response.thongtindilai_chitiet);
                    // localStorage.setItem('sohieu_phuongtien', response.sohieu_phuongtien);
                    // localStorage.setItem('soghe_phuongtien', response.soghe_phuongtien);
                    // localStorage.setItem('ngay_khoihanh', response.ngay_khoihanh);
                    // localStorage.setItem('ngay_nhapcanh', response.ngay_nhapcanh);
                    // localStorage.setItem('noi_khoihanh', response.noi_khoihanh);
                    // localStorage.setItem('noiden', response.noiden);
                    // localStorage.setItem('quocgiadiqua', response.quocgiadiqua);
                    // localStorage.setItem('diachi_taivietnam', response.diachi_taivietnam);
                    // localStorage.setItem('sodienthoai', response.sodienthoai);
                    // localStorage.setItem('email', response.email);
                    // localStorage.setItem('dauhieubenh_sot', response.dauhieubenh_sot);
                    // localStorage.setItem('dauhieubenh_ho', response.dauhieubenh_ho);
                    // localStorage.setItem('dauhieubenh_khotho', response.dauhieubenh_khotho);
                    // localStorage.setItem('dauhieubenh_dauhong', response.dauhieubenh_dauhong);
                    // localStorage.setItem('dauhieubenh_buonnon', response.dauhieubenh_buonnon);
                    // localStorage.setItem('dauhieubenh_tieuchay', response.dauhieubenh_tieuchay);
                    // localStorage.setItem('dauhieubenh_xuathuyetngoaida', response.dauhieubenh_xuathuyetngoaida);
                    // localStorage.setItem('dauhieubenh_phatban', response.dauhieubenh_phatban);
                    // localStorage.setItem('vacxin_dasudung', response.vacxin_dasudung);
                    // localStorage.setItem('tiepxuc_dongvat', response.tiepxuc_dongvat);
                    // localStorage.setItem('chamsocnguoibenhtruyennhiem', response.chamsocnguoibenhtruyennhiem);
                    // localStorage.setItem('ngon_ngu', response.ngon_ngu);

                    // localStorage.setItem('lichsu','1');

                    // window.location = location.origin + "/medicalform/qr/{{cuakhau_id}}/history";
                    window.location = location.origin + "/medicalform/qr/" + response.cuakhau_id

                },
                error: function (response) {

                }
            });
        })

    });
