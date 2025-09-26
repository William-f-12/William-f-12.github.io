// the navbar effect JavaScript file
let marker = document.querySelector("#navBarMarker");
let list = document.querySelectorAll('#navLinkList li');
let navbar = document.querySelector("#navbar");
let pageLink = document.querySelector("#curPage");

// first move the marker to the right position according to the current page
for (let i = 0; i < list.length; i++) {
    if (list[i].classList.contains("active")) {
        marker.style.left = 21 + 72 * i + 'px';
        break;
    }
}

// add active class in hovered list item
function activeLink() {
    list.forEach(item =>
        item.classList.remove("active"));
    this.classList.add("active");
}

list.forEach((item) =>
    item.addEventListener("mouseover", activeLink));

// move the marker to the active link
function moveIndicator(e) {
    marker.style.left = e.offsetLeft + 6 + 'px';
}

const observer = new MutationObserver((mutations) => {
    mutations.forEach((mutation) => {
        if (mutation.type === 'attributes' && mutation.attributeName === 'class' && mutation.target.className === 'active') {
            // console.log('Class changed to:', mutation.target.className);
            moveIndicator(mutation.target);
        }
    });
});

list.forEach((item) => {
    observer.observe(item, {
        attributes: true,
        attributeFilter: ['class']
    });
})

// move the indicator back to the right position according to the current page
function moveIndicatorBack() {
    list.forEach(item =>
        item.classList.remove("active"));
    pageLink.classList.add("active");
}

navbar.addEventListener("mouseout", moveIndicatorBack);

// Setting window functionality
window.addEventListener('DOMContentLoaded', function () {
    var settingsBtn = document.getElementById('settingsBtn');
    var settingsWin = document.getElementById('settingsWin');
    var closeSettings = document.getElementById('closeSettings');
    if (settingsBtn && settingsWin && closeSettings) {
        settingsBtn.onclick = function () {
            pageLink = document.querySelector("#settingsBtn")
            settingsWin.style.display = 'flex';
        };
        closeSettings.onclick = function () {
            pageLink = document.querySelector("#curPage")
            moveIndicatorBack();
            settingsWin.style.display = 'none';
        };
        settingsWin.onclick = function (e) {
            if (e.target === settingsWin) {
                pageLink = document.querySelector("#curPage")
                moveIndicatorBack();
                settingsWin.style.display = 'none';
            }
        };
    }

    // theme switching functionality
    var brightBtn = document.getElementById('brightMode');
    var darkBtn = document.getElementById('darkMode');
    var cottonCandyBtn = document.getElementById('cottonCandyMode');
    var sakuraBtn = document.getElementById('sakuraMode');
    var cyberpunkBtn = document.getElementById('cyberpunkMode');
    function setTheme(mode) {
        const body = document.body;
        if (mode === 'bright') {
            body.className = 'bright-mode';
            localStorage.setItem('theme', 'bright');
        } else if (mode === 'dark') {
            body.className = 'dark-mode';
            localStorage.setItem('theme', 'dark');
        } else if (mode === 'sakura') {
            body.className = 'sakura-mode';
            localStorage.setItem('theme', 'sakura');
        } else if (mode === 'cottonCandy') {
            body.className = 'cottonCandy-mode';
            localStorage.setItem('theme', 'cottonCandy');
        } else if (mode === 'cyberpunk') {
            body.className = 'cyberpunk-mode';
            localStorage.setItem('theme', 'cyberpunk');
        }
    }
    if (brightBtn) brightBtn.onclick = function () { setTheme('bright'); };
    if (darkBtn) darkBtn.onclick = function () { setTheme('dark'); };
    if (sakuraBtn) sakuraBtn.onclick = function () { setTheme('sakura'); };
    if (cottonCandyBtn) cottonCandyBtn.onclick = function () { setTheme('cottonCandy'); };
    if (cyberpunkBtn) cyberpunkBtn.onclick = function () { setTheme('cyberpunk'); };

    // auto apply theme on page load
    (function () {
        const savedTheme = localStorage.getItem('theme');
        const body = document.body;
        if (savedTheme === 'dark') {
            body.className = 'dark-mode';
        } else if (savedTheme === 'bright') {
            body.className = 'bright-mode';
        } else if (savedTheme === 'sakura') {
            body.className = 'sakura-mode';
        } else if (savedTheme === 'cottonCandy') {
            body.className = 'cottonCandy-mode';
        } else if (savedTheme === 'cyberpunk') {
            body.className = 'cyberpunk-mode';
        }
    })();
});