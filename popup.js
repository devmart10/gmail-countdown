document.addEventListener('DOMContentLoaded', () => {
  getCurrentTabUrl((url) => {
    // setTimeout(setOldestMessageText, 2500);

    // chrome.tabs.executeScript({
    //   file: 'GmailCountdown.js'
    // });
  });
});

function setOldestMessageText() {
    let oldest = new Date();
    let message = ""

    let all = document.getElementsByTagName("table");
    let table = all[4];
    let body = table.getElementsByTagName("tbody");
    let rows = body[0].getElementsByTagName('tr');
    for (let i = 0; i < rows.length; i++) {
        let span = rows[i].children[7].children[0];
        let raw = span.title;
        raw = raw.split(',').splice(1).join('');
        raw = raw.replace('at ', '');

        let date = new Date(raw);
        if (date < oldest) {
            oldest = date;
            let subject = rows[i].children[5].innerText.split('\n');
            // check if there is a label
            let hasLabel = subject.length > 2;
            hasLabel ? message = subject[3] : message = subject[2];
        }
    }

    let oldestMessageName = document.getElementById('oldestMessageName');
    oldestMessageName.text = message;
}