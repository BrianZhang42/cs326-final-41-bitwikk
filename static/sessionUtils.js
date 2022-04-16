export const setSession = sessionID => {
    document.cookie = `session=${sessionID}`;
};
