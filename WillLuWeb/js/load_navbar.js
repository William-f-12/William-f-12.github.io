function loadNavbar() {
    let cachedNavbar = localStorage.getItem('navbar');
    if (!cachedNavbar) {
        $.get('../partials/_navbar.html', function (data) {
            localStorage.setItem('navbar', data);
        });
    }
    $('#navbarContainer').html(cachedNavbar);
}

document.addEventListener('DOMContentLoaded', loadNavbar);
