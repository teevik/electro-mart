/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import type { paths } from "../openapi.d.ts";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface CategoriesService {
    allCategories: ServiceOperationQuery<{
        method: "get";
        url: "/categories";
    }, paths["/categories"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], undefined, paths["/categories"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    createCategory: ServiceOperationMutation<{
        method: "post";
        url: "/categories";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/categories"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/categories"]["post"]["responses"]["201"]["content"]["application/json; charset=utf-8"], undefined, paths["/categories"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    categoryById: ServiceOperationQuery<{
        method: "get";
        url: "/categories/{id}";
    }, paths["/categories/{id}"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], paths["/categories/{id}"]["get"]["parameters"], paths["/categories/{id}"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    updateCategory: ServiceOperationMutation<{
        method: "put";
        url: "/categories/{id}";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/categories/{id}"]["put"]["requestBody"]>["content"]["application/json; charset=utf-8"], unknown, paths["/categories/{id}"]["put"]["parameters"], paths["/categories/{id}"]["put"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    deleteCategory: ServiceOperationMutation<{
        method: "delete";
        url: "/categories/{id}";
    }, undefined, unknown, paths["/categories/{id}"]["delete"]["parameters"], paths["/categories/{id}"]["delete"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
}
export const categoriesService: {
    [key in keyof CategoriesService]: Pick<CategoriesService[key], "schema">;
} = {
    allCategories: {
        schema: {
            method: "get",
            url: "/categories"
        }
    },
    createCategory: {
        schema: {
            method: "post",
            url: "/categories",
            mediaType: "application/json; charset=utf-8"
        }
    },
    categoryById: {
        schema: {
            method: "get",
            url: "/categories/{id}"
        }
    },
    updateCategory: {
        schema: {
            method: "put",
            url: "/categories/{id}",
            mediaType: "application/json; charset=utf-8"
        }
    },
    deleteCategory: {
        schema: {
            method: "delete",
            url: "/categories/{id}"
        }
    }
} as const;
