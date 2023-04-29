let skillsArray = [];

class Skill {
    constructor(skillname, level) {
        this.skillname = skillname;
        this.level = level;
    }
}

const htmlskill = new Skill('html', 85);
const cssskill = new Skill('css', 65);
const jsskill = new Skill('javascript', 50);
const flutterskill = new Skill('flutter', 35);
//   const pythonskill = new Skill('html', 85);

skillsArray.push(htmlskill, cssskill, jsskill, flutterskill)
let htmllevel = document.getElementById("html-number");
let csslevel = document.getElementById("css-number");
let jslevel = document.getElementById("js-number");
let flutterlevel = document.getElementById("flutter-number");



skillsArray.forEach((skill, index)=> {
    if (skill.skillname === 'html') {
        let counter = 0;
        setInterval(() => {
            if (counter === skill.level) {
                clearInterval();
            } else {
                counter += 1;
                htmllevel.innerHTML = counter + "%"
            }
    }, 8)
    } else if (skill.skillname === 'css') {
        let counter = 0;
        setInterval(() => {
            if (counter === skill.level) {
                clearInterval();
            } else {
                counter += 1;
                csslevel.innerHTML = counter + "%"
            }
    }, 8)
    } else if (skill.skillname === 'css') {
        let counter = 0;
        setInterval(() => {
            if (counter === skill.level) {
                clearInterval();
            } else {
                counter += 1;
                csslevel.innerHTML = counter + "%"
            }
    }, 8)
    } else if (skill.skillname === 'javascript') {
        let counter = 0;
        setInterval(() => {
            if (counter === skill.level) {
                clearInterval();
            } else {
                counter += 1;
                jslevel.innerHTML = counter + "%"
            }
    }, 8)
    }  else if (skill.skillname === 'flutter') {
        let counter = 0;
        setInterval(() => {
            if (counter === skill.level) {
                clearInterval();
            } else {
                counter += 1;
                flutterlevel.innerHTML = counter + "%"
            }
    }, 8)
    } 
})
