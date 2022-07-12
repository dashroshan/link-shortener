const isProd = true;

let apiLink = 'http://localhost:8080/';
let baseLink = 'http://localhost:3000/';

if (isProd) {
    apiLink = 'https://api.link.roshan.cyou/';
    baseLink = 'https://link.roshan.cyou/'
}

export { apiLink, baseLink };