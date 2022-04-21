import {fileURLToPath} from "url";
import path from "path";

export const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const asyncRoute = route =>
                          (req, res, next = console.error) =>
                          Promise.resolve(route(req, res)).catch(next);

const requireAttrs = term => (obj, attrs, response) => {
    for (const attr of attrs) {
        if (!obj.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Missing required ${term}: ${attr}`);
            // send automatically ends the response
            return false;
        }
    }
    return true;
};

export const requireParams = requireAttrs("parameter");

export const requireBodyAttrs = requireAttrs("body attribute");

export const serve404 = response =>
    response.status(404).sendFile(`${projectRoot}/client/404.html`, {
        lastModified: false
    }, err => {
        response.status(500).end();
    });
