const accept = document.getElementById('accept-cookie');
const getCookie = function (name) {
    const match = document.cookie.match(new RegExp('(^| )' + name + '=([^;]+)'));
    if (match) return match[2];
}

if (accept !== null) {
    accept.addEventListener('click', () => {
        let date = new Date();
        date.setTime(date.getTime() + (365 * 24 * 60 * 60 * 1000));
        let expires = "; expires=" + date.toUTCString();
        document.cookie = 'accept-cookie' + '=' + ('accepted' || '') + expires + "; SameSite=None; Secure; path=/";
        document.getElementById('cookie-alert').remove();
    });
}

if (document.cookie !== null && getCookie('accept-cookie') === 'accepted') {
    document.getElementById('cookie-alert').remove();
}