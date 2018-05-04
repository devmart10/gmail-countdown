setTimeout(function (){
    var now = new Date();

    var all = document.getElementsByTagName("table");
    var table = all[4];
    var body = table.getElementsByTagName("tbody");

    var rows = body[0].getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        var span = rows[i].children[7].children[0];
        var raw = span.title;
        raw = raw.split(',').splice(1).join('');
        raw = raw.replace('at ', '');

        var date = new Date(raw);
        var diff = now.getTime() - date.getTime();
        // console.log(diff);
        // 710 021 695
        var one_day = 86400000;
        var one_hour = 3600000;
        var color = "";
        if (diff < one_hour) {
            color = "rgba(0, 0, 0, 0)";
        }
        else if (diff > one_day*7) {
            color = "rgba(150, 0, 0, 1)";
        }
        else if (diff > one_day) {
            color = "rgba(255, 0, 0, 1)";
        }
        else {
            var perc = (diff - one_hour)/(one_day - one_hour);
            console.log(perc);
            var r = 255,
                g = 0,
                b = 0,
                a = .1 + perc*.9;

            // parseInt(perc*155)
            color = `rgba(${r}, ${g}, ${b}, ${a})`;
        }
        span.parentElement.style.backgroundColor = color;
    }
}, 2500);