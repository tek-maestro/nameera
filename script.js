const age = document.querySelector(".age");
const BIRTH_DATE = new Date(2023, 9, 20, 12, 10, 0, 0);
setInterval(()=> {
    const now = new Date();
    age.textContent = describeTime(now - BIRTH_DATE);
}, 1000);

function describeTime(timeInMillis) {
    const units = [365, 24, 60, 60, 1000];
    const unitNames = ["year", "day", "hour", "minute", "second"];
    let total = 365*24*60*60*1000;
    let results = [];
    for (let unit of units) {
        results.push(parseInt(timeInMillis/total));
        timeInMillis %= total;
        total /= unit;
    }
    let desc = "";
    for (let i = 0; i < results.length; i++)
        desc += `${results[i]} ${unitNames[i]}${results[i]==1?"":"s"} `;
    return desc;
}