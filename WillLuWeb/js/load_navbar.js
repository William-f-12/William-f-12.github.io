function loadNavbar() {
    // let cachedNavbar = localStorage.getItem('navbar');
    // if (cachedNavbar) {
    //     $('#navbarContainer').html(cachedNavbar);
    // } else {
        $.get('../partials/_navbar.html', function (data) {
            $('#navbarContainer').html(data);
        });
    // }
}

document.addEventListener('DOMContentLoaded', loadNavbar);
