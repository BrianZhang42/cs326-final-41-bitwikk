// const cookieName = /[!#-'*+.0-9A-Z^-z|~-]+/;
const cookieValue = /[!#-+.-:<-[\]-~-]*/;

const getCookie = name => {
    const result = document.cookie.match(new RegExp(`(?:^| )${name}=(?:(?<unquotedValue>${cookieValue.source})|"(?<quotedValue>${cookieValue.source})")(?:;|$)`));
    if (result === null) {
        return undefined;
    }
    if (result.groups.quotedValue !== undefined) {
        return result.groups.quotedValue;
    }
    return result.groups.unquotedValue;

};

export const getUsername = () => getCookie("user");
