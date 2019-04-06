export function urlParamEncode(payload) {
    return Object.entries(payload).map(([key, value]) =>
        encodeURIComponent(key) + '=' + encodeURIComponent(value)).join('&');
}
