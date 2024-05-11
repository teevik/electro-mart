/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import type { paths } from "../openapi.d.ts";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface UserService {
    getUser: ServiceOperationQuery<{
        method: "get";
        url: "/user";
    }, paths["/user"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], undefined, paths["/user"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    registerUser: ServiceOperationMutation<{
        method: "post";
        url: "/user/register";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/user/register"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/user/register"]["post"]["responses"]["200"]["content"]["text/plain; charset=utf-8"], undefined, paths["/user/register"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    loginUser: ServiceOperationMutation<{
        method: "post";
        url: "/user/login";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/user/login"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/user/login"]["post"]["responses"]["200"]["content"]["text/plain; charset=utf-8"], undefined, paths["/user/login"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
}
export const userService: {
    [key in keyof UserService]: Pick<UserService[key], "schema">;
} = {
    getUser: {
        schema: {
            method: "get",
            url: "/user"
        }
    },
    registerUser: {
        schema: {
            method: "post",
            url: "/user/register",
            mediaType: "application/json; charset=utf-8"
        }
    },
    loginUser: {
        schema: {
            method: "post",
            url: "/user/login",
            mediaType: "application/json; charset=utf-8"
        }
    }
} as const;
