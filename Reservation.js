var arrParamValues;
$(function () {
    getpar();
    getdate();
});

function home() {
    window.location = "chome.html";
}

function getdate() {
    try {
        var id = arrParamValues[0];
        $.ajax({
            type: "POST",
            crossDomain: true,
            url: "Code/getorder.ashx",
            data: {id:id},
            success: function (par) {
                //alert(par);
                var arr = par.split("//");
                var d = arr[1].split("++");
                document.getElementById("tbid").value = d[0];
                document.getElementById("tbodate").value = d[1];
                document.getElementById("tbprice").value = d[2];
                document.getElementById("tbtype").value = d[3];
                document.getElementById("tbarea").value = d[4];
                document.getElementById("tbinterval").value = d[5];
                
            },
            error: function (par) { showmessage(par); }
        });
    } catch (e) { showmessage(e); }
}
//-------------------
function mydate(d) {
    var currentDate = new Date(d)
    var day = currentDate.getDate()
    var month = currentDate.getMonth() + 1
    var year = currentDate.getFullYear()
    if (day < 10) day = '0' + day;
    if (month < 10) month = '0' + month;
    var tmp = year + '' + month + '' + day;
    var t = parseInt(tmp);
    return t;
}
function Send() {
    try {
        var id = document.getElementById("tbid").value;
        var name = document.getElementById("tbname").value;
        var card = document.getElementById("tbcard").value;
        var date = document.getElementById("tbedate").value;
        var pin = document.getElementById("tbpin").value;
        var today = new Date();
       


        if (id == "") {
            showmessage("please Select Sechulde order ");
            return;
        }

        if (name == "") {
            showmessage("please input Card name ");
            return;
        }
        if (date == "") {
            showmessage("please input Card Expire Date  ");
            return;
        }

        if (pin == "") {
            showmessage("please input Card pin ");
            return;
        }
       

        var expno = /^[0-9|]+$/;
        var expname = /^[a-zA-z |]+$/;

        if (!expname.test(name)) {
            showmessage("the name must in char only ");
            return;
        }

        if (!expno.test(pin)) {
            showmessage("the pin must in number only ");
            return;
        }
        if (!expno.test(card)) {
            showmessage("the Card Number must in number only ");
            return;
        }
        if (card.length > 16) {
            showmessage("the Card Number max 16 number ");
            return;
        }
        if (pin.length!= 3) {
            showmessage("please input Card pin 3 number only ");
            return;
        }
        var m1 = mydate(date);
        var m2 = mydate(today);
        if (m2 > m1) {
            showmessage("Please select Expire Date is correct");
            return;
        }
        $.ajax({
            type: "POST",
            url: "code/Reservation.ashx",
            crossDomain: true,
            data: { id: id, name: name, card: card, date: date, pin: pin },
            success: function (par) {
                showmessage(par);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}


//---------------------

function getpar() {
    try {

        var sURL = window.document.URL.toString();

        if (sURL.indexOf("?") > 0) {
            var arrParams = sURL.split("?");

            var arrURLParams = arrParams[1].split("&");

            var arrParamNames = new Array(arrURLParams.length);
            arrParamValues = new Array(arrURLParams.length);

            var i = 0;
            for (i = 0; i < arrURLParams.length; i++) {
                var sParam = arrURLParams[i].split("=");
                arrParamNames[i] = sParam[0];

                if (sParam[1] != "") {
                    arrParamValues[i] = unescape(sParam[1]);

                }
                else
                    arrParamValues[i] = "No Value";
            }
        }


    } catch (e) { alert(e); }
}