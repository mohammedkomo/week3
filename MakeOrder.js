

//============================ Save Data
function SaveData() {
    try {
       

        $.ajax({
            type: "POST",
            url: "Code/Listoffer.ashx",
            crossDomain: true,
            data: {  },
            success: function (par) {
                var arr = par.split("//");
                $('#ldata').empty();
                var i = 0;
                for (i = 1; i < arr.length; i++) {
                    var d = arr[i].split("++");
                    $('<li data-icon="false">').append('</h2><h2> Schedule ID : ' + d[0] + '</h2><h2> Date : ' + d[1] + '</h2><h2> Price : ' + d[2] + '</h2><h2> Area Name : ' + d[3] + '</h2><h2> Tank Type : ' + d[4] + '</h2><h2> Interval Name : ' + d[5] + '</h2> <div data-role="controlgroup" data-type="horizontal"><a href="javascript:reservation(\'' + d[0] + '\')" class="ui-btn ui-btn-inline ui-shadow ">Reservation</a> </div>').appendTo('#ldata');
                }
                $('#ldata').listview().listview('refresh');

            },
            error: function (par) { showmessage(par); }
        });
    }
    catch (e) { showmessage(e); }
}


function reservation(id) {
    window.location = "Reservation.html?id=" + id;
}
