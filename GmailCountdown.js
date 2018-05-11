// global time constants (in millis)
const one_hour = 3600000;
const one_day = one_hour*24;
const one_week = one_day*7;
const now = new Date();

/**
 * Main script. Adds color to each row on current page based on
 * the amount of time that's passed since the message was received
 *
 * @return {None}
 */
function colorTable() {
    // html parsing
    // TODO make more readable
    let all = document.getElementsByTagName("table");
    let table = all[4];
    let body = table.getElementsByTagName("tbody");
    let rows = body[0].getElementsByTagName('tr');

    // loop through rows and color them depending on the date received
    for (let i = 0; i < rows.length; i++) {
        // parsing date from html table
        // TODO make more readable
        let span = rows[i].children[7].children[0];
        let raw = span.title;
        raw = raw.split(',').splice(1).join('');
        raw = raw.replace('at ', '');

        // get color based on the date received
        let received = new Date(raw);
        let color = getColor(received);

        // set the color
        span.parentElement.style.backgroundColor = color;
    }
}

/**
 * Function that determines what the message should be colored
 * 
 * @param  {Date} received Date the message was received
 * @return {String}          The color, as an rgba string
 */
function getColor(received) {
    // calculate the time the message has been in inbox
    let diff = now.getTime() - received.getTime();
    
    // less than an hour: no color
    if (diff < one_hour) {
        color = "rgba(0, 0, 0, 0)";
    }
    // less than a week: gradient
    else if (diff < one_week) {
        // calculate percent how close the message is to one week old
        let perc = (diff - one_hour)/(one_week - one_hour);

        // normalize alpha range to be in range 0 to .7 opacity
        let alpha = perc*.7;
        let r = 230,
            g = 0,
            b = 0,
            a = alpha;

        color = `rgba(${r}, ${g}, ${b}, ${a})`;
    }
    // over a week: dark red
    else {
        color = "rgba(180, 0, 0, .8)";
    }
    return color;
}

// use timeout to delay script because the gmail content needs to load
const myDelay = 2500;   // 2.5 seconds
setTimeout(colorTable, myDelay);
