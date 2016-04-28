
$(function () {
    getList();
});

function getList() {
    try {
        $.ajax({
            type: "POST",
            url: "Code/Listorder.ashx",
            crossDomain: true,
            data: {  },
            success: function (par) {
                //showmessage(par);
                var arr = par.split("//");
                if (arr[0] != "") showmessage(arr[0]);
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('<li data-icon="false">').append('</h2><h2> Schedule ID : ' + d[0] + '</h2><h2> Date : ' + d[1] + '</h2><h2> Price : ' + d[2] + '</h2><h2> Area Name : ' + d[3] + '</h2><h2> Tank Type : ' + d[4] + '</h2><h2> Interval Name : ' + d[5] + '</h2><h2> Reservation No  : ' + d[6] + '</h2><h2> Reservation Date : ' + d[7] + '</h2><h2> State : ' + d[8] + '</h2> ').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}


function home() {
    window.location = "chome.html";
}