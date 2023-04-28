/*=============toggle icon navbar===============*/
let menuIcon = document.querySelector('#menu-icon');
let navbar = document.querySelector('.navbar');

menuIcon.onclick = () => {
    menuIcon.classList.toggle('bx-x');
    navbar.classList.toggle('active');

}

/*=============Scroll section active link===============*/
let sections = document.querySelectorAll('section');
let navLinks = document.querySelectorAll('header nav a');

window.onscroll = () => {
    sections.forEach(sec => {
        let top = window.scrollY;
        let offset = sec.offsetTop - 150;
        let height = sec.offsetHeight;
        let id = sec.getAttribute('id');

        if (top >= offset && top < offset + height) {
            navLinks.forEach(links => {
                links.classList.remove('active');
                document.querySelector('header nav a[href*=' + id + ']').classList.add('active');
            });
        };
    });
    /*=============Sticky navbar===============*/
    let header = document.querySelector('header');

    header.classList.toggle('sticky', window.scrollY > 100);

    /*=============remove toggle icon and navbar on clicking navbar link (scroll)===============*/
    menuIcon.classList.remove('bx-x');
    navbar.classList.remove('active');

};


/*=============Scroll reveal===============*/
ScrollReveal({
    /*reset: true,*/
    distance: '80px',
    duration: 2000,
    delay: 200,
});

ScrollReveal().reveal('.home-content, .heading', { origin: 'top' });
ScrollReveal().reveal('.home-img, .services-container, .porfolio-box, .contact form', { origin: 'bottom' });
ScrollReveal().reveal('.home-content h1, .about-img', { origin: 'left' });
ScrollReveal().reveal('.home-content p, .about-content', { origin: 'right' });



/*=============typed js===============*/

const typed = new Typed('.multiple-text', {
    strings: ['Full Stack Developer', 'Graphic Designer', 'Photographer', 'Data Analyst'],
    typeSpeed: 50,
    backSpeed: 50,
    backDelay: 2000,
    loop: true
});


/*=============SMPTJS===============*/
function sendEmail() {
    Email.send({
        SecureToken: "2c405ff0-f189-4883-a182-79cb228278e5",
        To: 'mcclainkel@gmail.com',
        From: 'mcclaintuei@gmail.com',
        Subject: document.getElementById('Subject').value,
        Body: "Name: " + document.getElementById("Name").value
        +"<br> Email: " + document.getElementById("Email").value
        +"<br> Phone No: " + document.getElementById("Number").value 
        +"<br> Message: " + document.getElementById("Body").value 
    }).then(
        message => alert("Message sent successfully!")
    );
};

const parentContainer = document.querySelector('.about-content');

parentContainer.addEventListener('click', event => {
    const current = event.target;

    const isReadMoreBtn = current.classList.contains('read-more-btn');
    if (!isReadMoreBtn) return;

    const currentText = event.target.parentNode.querySelector('.read-more-text');

    currentText.classList.toggle('read-more-text--hide');
    current.textContent = currentText.classList.contains('read-more-text--hide') ? "Read More..." : "Read Less...";
});

const readMoreBtn = document.querySelector('.read-more-btn');
const readMoreText = document.querySelector('.read-more-text');

readMoreBtn.textContent = 'Read More...';
readMoreText.classList.add('read-more-text--hide');

