$(function () {
    getdate();
});

function home() {
    window.location = "chome.html";
}

function getdate() {
    try {

        $.ajax({
            type: "POST",
            url: "Code/getdata.ashx",
            crossDomain: true,
            data: {},
            success: function (par) {
                //alert(par);
                var arr = par.split("//");
                var d = arr[1].split("++");
                document.getElementById("userid").value = d[0];
                document.getElementById("username").value = d[1];
                document.getElementById("email").value = d[3];
                document.getElementById("phone").value = d[2];
                document.getElementById("password").value = d[5];
                document.getElementById("address").value = d[4];
            },
            error: function (par) { showmessage(par); }
        });
    } catch (e) { showmessage(e); }
}
//-------------------
function update() {
    try {
        var id = document.getElementById("userid").value;
        var name = document.getElementById("username").value;
        var email = document.getElementById("email").value;
        var phone = document.getElementById("phone").value;
        var pasword = document.getElementById("password").value;
        var address = document.getElementById("address").value;
        
        if (id == "") {
            showmessage("please input Customer id ");
            return;
        }

        if (name == "") {
            showmessage("please input Customer name ");
            return;
        }
        if (email == "") {
            showmessage("please input Customer email ");
            return;
        }

        if (phone == "") {
            showmessage("please input Customer phone ");
            return;
        }
        if (pasword == "") {
            showmessage("please input Customer password ");
            return;
        }

        if (phone.length != 10) {
            showmessage("Please input phone number in 10 numbers");
            return;
        }
        if (phone.substring(0, 2) != "05") {
            showmessage("input phone incorrect format and start with 05");
            return;
        }
        var expname = /^[0-9|]+$/;

        if (!expname.test(phone)) {
            showmessage("the phone must in number only ");
            return;
        }

        if (email.indexOf(".") == -1 || email.indexOf("@") == -1) {
            showmessage("input Email incorrect format ");
            return;
        }


        $.ajax({
            type: "POST",
            url: "code/profile.ashx",
            crossDomain: true,
            data: { id: id, name: name, phone: phone, email: email, pass: pasword, address: address },
            success: function (par) {
                showmessage(par);
            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}
