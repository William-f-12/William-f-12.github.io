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