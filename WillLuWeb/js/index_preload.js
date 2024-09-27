// preload navbar
$.get('../partials/_navbar.html', function (data) {
    if (localStorage.getItem('navbar') && localStorage.getItem('navbar') !== data) {
        localStorage.removeItem('navbar');
    }
    localStorage.setItem('navbar', data);
});
