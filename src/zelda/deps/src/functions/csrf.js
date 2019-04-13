export default function getCsrfToken() {
    return document.getElementsByName("csrfmiddlewaretoken")[0].value;
}
