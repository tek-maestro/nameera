const age = document.querySelector(".age");
const BIRTH_DATE = new Date(2023, 9, 20, 12, 10, 0, 0);
updateAge();
setInterval(updateAge, 1000);

function updateAge() {
    const now = new Date();
    let duration = getDuration(BIRTH_DATE, duration);
    age.textContent = describeTime(duration);
}

function describeTime(timeInMillis) {
    const units = [365, 24, 60, 60, 1000];
    const unitNames = ["year", "day", "hour", "minute", "second"];
    let total = 365 * 24 * 60 * 60 * 1000;
    let results = [];
    for (let unit of units) {
        results.push(parseInt(timeInMillis/total));
        timeInMillis %= total;
        total /= unit;
    }
    let desc = "";
    for (let i = 0; i < results.length; i++)
        desc += `${results[i]} ${unitNames[i]}${results[i]==1? "" : "s"} `;
    return desc;
}

function getDuration(t1, t2) {
    const isLeapYear = year => year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    const dayInMillis = 24 * 60 * 60 * 1000;
    let duration = t2 - t1;
    let y1 = t1.getFullYear(), y2 = t2.getFullYear();
    for (let y = y1 + (t1.getMonth() > 1); y <= y2 - (t2.getMonth() <= 1); y++)
        if (isLeapYear(y)) duration -= dayInMillis;
    return duration;
}
