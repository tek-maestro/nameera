const BIRTH_DATE = new Date(2023, 9, 20, 12, 10, 0, 0);
let isBirthday = false;

function createParticles() {
    const particles = document.querySelector('.particles');
    particles.innerHTML = '';
    
    if (isBirthday) {
        // Create confetti
        for (let i = 0; i < 80; i++) {
            const confetti = document.createElement('div');
            confetti.classList.add('confetti');
            
            const colors = ['#ff6b9d', '#ffd700', '#00d4ff', '#7bed9f', '#ff6348', '#a29bfe'];
            confetti.style.background = colors[Math.floor(Math.random() * colors.length)];
            confetti.style.left = Math.random() * 100 + '%';
            confetti.style.animationDelay = Math.random() * 4 + 's';
            confetti.style.animationDuration = (Math.random() * 2 + 3) + 's';
            
            particles.appendChild(confetti);
        }
        
        // Create balloons
        for (let i = 0; i < 12; i++) {
            const balloon = document.createElement('div');
            balloon.classList.add('balloon');
            
            const colors = ['#ff6b9d', '#ffd700', '#00d4ff', '#7bed9f', '#ff6348', '#a29bfe'];
            balloon.style.background = colors[Math.floor(Math.random() * colors.length)];
            balloon.style.left = Math.random() * 100 + '%';
            balloon.style.animationDelay = Math.random() * 6 + 's';
            balloon.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            particles.appendChild(balloon);
        }
    } else {
        // Normal particles
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.classList.add('particle');
            
            particle.style.left = Math.random() * 100 + '%';
            particle.style.animationDelay = Math.random() * 8 + 's';
            particle.style.animationDuration = (Math.random() * 3 + 5) + 's';
            
            particles.appendChild(particle);
        }
    }
}

const age = document.querySelector(".age");
const birthdayHeader = document.getElementById('birthdayHeader');
const ageMilestone = document.getElementById('ageMilestone');
const milestone = document.getElementById('milestone');
const body = document.body;
const card = document.querySelector('.glass-card');

updateAge();
setInterval(updateAge, 1000);

function updateAge() {
    const now = new Date();
    let duration = getDuration(BIRTH_DATE, now);
    const ageInfo = describeTime(duration);
    age.innerHTML = ageInfo.html;
    
    // Check if it's birthday (0 days, within first 24 hours of the year)
    const wasBirthday = isBirthday;
    isBirthday = ageInfo.years > 0 && ageInfo.days === 0;
    
    if (isBirthday !== wasBirthday) {
        // Birthday status changed, recreate particles
        createParticles();
    }
    
    if (isBirthday) {
        body.classList.remove('normal-theme');
        body.classList.add('birthday-theme');
        card.classList.add('birthday-card');
        birthdayHeader.classList.add('active');
        ageMilestone.textContent = `${ageInfo.years} Year${ageInfo.years > 1 ? 's' : ''} Old! 🎊`;
        milestone.innerHTML = '🎁 Today is special - celebrate every moment! 🎁';
    } else {
        body.classList.remove('birthday-theme');
        body.classList.add('normal-theme');
        card.classList.remove('birthday-card');
        birthdayHeader.classList.remove('active');
        milestone.innerHTML = '✨ Every second is a new adventure ✨';
    }
}

function describeTime(timeInMillis) {
    const units = [365, 24, 60, 60, 1000];
    const unitNames = ["year", "day", "hour", "minute", "second"];
    let total = 365 * 24 * 60 * 60 * 1000;
    let results = [];
    
    for (let unit of units) {
        results.push(parseInt(timeInMillis / total));
        timeInMillis %= total;
        total /= unit;
    }
    
    let desc = "";
    for (let i = 0; i < results.length; i++) {
        if (results[i] > 0 || i >= 3) {
            desc += `<span class="time-unit">${results[i]} ${unitNames[i]}${results[i] == 1 ? "" : "s"}</span>`;
        }
    }
    
    return {
        html: desc,
        years: results[0],
        days: results[1],
        hours: results[2],
        minutes: results[3],
        seconds: results[4]
    };
}

function getDuration(t1, t2) {
    const isLeapYear = year => year % 4 == 0 && (year % 100 != 0 || year % 400 == 0);
    const dayInMillis = 24 * 60 * 60 * 1000;
    let duration = t2 - t1;
    let y1 = t1.getFullYear(), y2 = t2.getFullYear();
    
    for (let y = y1 + (t1.getMonth() > 1); y <= y2 - (t2.getMonth() <= 1); y++) {
        if (isLeapYear(y)) duration -= dayInMillis;
    }
    return duration;
}

createParticles();
