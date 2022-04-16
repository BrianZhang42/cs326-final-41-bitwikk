import {fileURLToPath} from "url";
import path from "path";

export const projectRoot = path.dirname(path.dirname(fileURLToPath(import.meta.url)));

export const asyncRoute = route =>
                          (req, res, next = console.error) =>
                          Promise.resolve(route(req, res)).catch(next);

export const requireParams = (obj, attrs, response) => {
    for (const attr of attrs) {
        if (!obj.hasOwnProperty(attr)) {
            response.status(400);
            response.send(`Missing required parameter: ${attr}`);
            // send automatically ends the response
            return false;
        }
    }
    return true;
};
