function loadNavbar() {
    let cachedNavbar = localStorage.getItem('navbar');
    if (cachedNavbar) {
        $('#navbarContainer').html(cachedNavbar);
    } else {
        $.get('../partials/_navbar.html', function (data) {
            localStorage.setItem('navbar', data);
        });
        $('#navbarContainer').html(cachedNavbar);
    }
}

document.addEventListener('DOMContentLoaded', loadNavbar);
