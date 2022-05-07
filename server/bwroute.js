import { validateSession } from "./userUtil.js"

const TYPEOF_VALUES = new Set(["undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function"]);
const JSON_TYPEOF_VALUES = new Set(["object", "boolean", "number", "string"]);

const schemaCheck = (obj, schema) => {
    for (const attr in schema) {
        if (!obj.hasOwnProperty(attr)) {
            return [false, `Missing required key: ${attr}`];
        }
        if ((typeof obj[attr]) != schema[attr]) {
            return [false, `key "${attr}" must be ${schema[attr]} not ${typeof obj[attr]}`];
        }
    }
    return [true, ""];
};

const validateSchema = schema => {
    for (const attr in schema) {
        const attrType = schema[attr];
        if ((typeof attrType) != "string") {
            throw "schema values must be strings (return value of typeof)";
        }
        if (!TYPEOF_VALUES.has(attrType)) {
            throw `Invalid JSON type in schema: ${attrType}`;
        }
    }
    return schema;
};

const validateJSONSchema = schema => {
    for (const attr in schema) {
        const attrType = schema[attr];
        if ((typeof attrType) != "string") {
            throw "schema values must be strings (return value of typeof)";
        }
        if (!JSON_TYPEOF_VALUES.has(attrType)) {
            throw `Invalid JSON type in schema: ${attrType}`;
        }
    }
    return schema;
};

const bwrouteConfigSchema = validateSchema({
    requiresLogin: "boolean",
    bodySchema: "object",
    handler: "function"
});

export const bwroute = config => {
    schemaCheck(config, bwrouteConfigSchema);
    const {requiresLogin, bodySchema, handler} = config;
    if (bodySchema !== null) {
        validateJSONSchema(bodySchema)
    }
    return (request, response, next=console.error) => {
        let username = undefined;
        if (requiresLogin) {
            let sessionValid;
            [ sessionValid, username ] = validateSession(request, response);
            if (!sessionValid) {
                return
            }
        }
        if (bodySchema !== null) {
            const [valid, error] = schemaCheck(request.body, bodySchema);
            if (!valid) {
                response.status(400);
                response.send(`Error in body: ${error}\n`);
                // send automatically ends the response
                return;
            }
        }
        Promise.resolve(handler(request, response, username)).catch(next);
    };
};
