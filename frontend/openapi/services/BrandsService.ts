/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import type { paths } from "../openapi.d.ts";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface BrandsService {
    allBrands: ServiceOperationQuery<{
        method: "get";
        url: "/brands";
    }, paths["/brands"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], undefined, paths["/brands"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    createBrand: ServiceOperationMutation<{
        method: "post";
        url: "/brands";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/brands"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/brands"]["post"]["responses"]["201"]["content"]["application/json; charset=utf-8"], undefined, paths["/brands"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    brandById: ServiceOperationQuery<{
        method: "get";
        url: "/brands/{id}";
    }, paths["/brands/{id}"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], paths["/brands/{id}"]["get"]["parameters"], paths["/brands/{id}"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    updateBrand: ServiceOperationMutation<{
        method: "put";
        url: "/brands/{id}";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/brands/{id}"]["put"]["requestBody"]>["content"]["application/json; charset=utf-8"], unknown, paths["/brands/{id}"]["put"]["parameters"], paths["/brands/{id}"]["put"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    deleteBrand: ServiceOperationMutation<{
        method: "delete";
        url: "/brands/{id}";
    }, undefined, unknown, paths["/brands/{id}"]["delete"]["parameters"], paths["/brands/{id}"]["delete"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
}
export const brandsService: {
    [key in keyof BrandsService]: Pick<BrandsService[key], "schema">;
} = {
    allBrands: {
        schema: {
            method: "get",
            url: "/brands"
        }
    },
    createBrand: {
        schema: {
            method: "post",
            url: "/brands",
            mediaType: "application/json; charset=utf-8"
        }
    },
    brandById: {
        schema: {
            method: "get",
            url: "/brands/{id}"
        }
    },
    updateBrand: {
        schema: {
            method: "put",
            url: "/brands/{id}",
            mediaType: "application/json; charset=utf-8"
        }
    },
    deleteBrand: {
        schema: {
            method: "delete",
            url: "/brands/{id}"
        }
    }
} as const;
