// preload navbar
$.get('../partials/_navbar.html', function (data) {
    localStorage.setItem('navbar', data);
});
