import { validateSession } from "./userUtil.js"

const TYPEOF_VALUES = new Set(["undefined", "object", "boolean", "number", "bigint", "string", "symbol", "function"]);
const JSON_TYPEOF_VALUES = new Set(["object", "boolean", "number", "string"]);

const schemaCheck = (obj, schema) => {
    if ((typeof schema) === "string") {
        if ((typeof obj) === schema) {
            return [true, ""];
        } else {
            return [false, `must be ${schema} not ${typeof obj}`];
        }
    } else if (typeof schema === "object") {
        if ((typeof obj) !== "object") {
            return [false, `must be object not ${typeof obj}`];
        }
        if (schema instanceof Array) {
            if (!(obj instanceof Array)) {
                return [false, `must be an Array`];
            }
            for (const item of obj) {
                const [attrValid, errorMessage] = schemaCheck(item, schema[0]);
                if (!attrValid) {
                    return [false, `Error with item: ${errorMessage}`];
                }
            }
        } else {
            for (const attr in schema) {
                if (!obj.hasOwnProperty(attr)) {
                    return [false, `Missing required key: ${attr}`];
                }
                const [attrValid, errorMessage] = schemaCheck(obj[attr], schema[attr]);
                if (!attrValid) {
                    return [false, `Error with key "${attr}": ${errorMessage}`];
                }
            }
        }
        return [true, ""];
    } else {
        throw `invalid schema: ${schema}`;
    }
};

const generalValidateSchema = isJSON => {
    const validator = schema => {
        if ((typeof schema) === "string") {

            if (!(isJSON ? JSON_TYPEOF_VALUES : TYPEOF_VALUES).has(schema)) {
                throw `Invalid ${isJSON ? "JSON " : ""}type in schema: ${schema}`;
            }
            return schema;
        } else if ((typeof schema) === "object") {
            if (schema instanceof Array) {
                if (schema.length != 1) {
                    throw "schema values that are arrays must contain only one item";
                }
                return [validator(schema[0])];
            } else {
                for (const attr in schema) {
                    validator(schema[attr]);
                }
                return schema;
            }
        } else {
            console.log(schema);
            throw "schema values must be strings (return value of typeof) or arrays (containing one item) or objects";
        }
    };
    return validator;
};
const validateSchema = generalValidateSchema(false);
const validateJSONSchema = generalValidateSchema(true);

const bwrouteConfigSchema = validateSchema({
    requiresLogin: "boolean",
    requiredQueryParameters: ["string"],
    bodySchema: "object",
    handler: "function"
});
export const bwroute = config => {
    {
        const [configValid, errorMessage] = schemaCheck(config, bwrouteConfigSchema);
        if (!configValid) {
            throw `Error in bwroute config: ${errorMessage}`;
        }
    }
    const {requiresLogin, bodySchema, requiredQueryParameters, handler} = config;
    if (bodySchema !== null) {
        validateJSONSchema(bodySchema)
    }
    return async (request, response, next=console.error) => {
        let username = undefined;
        if (requiresLogin) {
            let sessionValid;
            [ sessionValid, username ] = await validateSession(request, response);
            if (!sessionValid) {
                return;
            }
        }
        for (const requiredQueryParameter of requiredQueryParameters) {
            if (!request.query.hasOwnProperty(requiredQueryParameter)) {
                response.status(400);
                response.send(`Missing required query parameter: ${requiredQueryParameter}`);
                // send automatically ends the response
                return;
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
