var text = document.getElementById('typing-text');
var str = text.innerHTML;
var i = 0;
text.innerText = '';
var typing = setInterval(function () {
    text.innerHTML += str[i++];
    i >= str.length && clearInterval(typing);
}, 100);