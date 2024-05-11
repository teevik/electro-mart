/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import type { paths } from "../openapi.d.ts";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface ProductsService {
    allProducts: ServiceOperationQuery<{
        method: "get";
        url: "/products";
    }, paths["/products"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], paths["/products"]["get"]["parameters"], paths["/products"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    createProduct: ServiceOperationMutation<{
        method: "post";
        url: "/products";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/products"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/products"]["post"]["responses"]["201"]["content"]["application/json; charset=utf-8"], undefined, paths["/products"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    productById: ServiceOperationQuery<{
        method: "get";
        url: "/products/{id}";
    }, paths["/products/{id}"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], paths["/products/{id}"]["get"]["parameters"], paths["/products/{id}"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    updateProduct: ServiceOperationMutation<{
        method: "put";
        url: "/products/{id}";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/products/{id}"]["put"]["requestBody"]>["content"]["application/json; charset=utf-8"], unknown, paths["/products/{id}"]["put"]["parameters"], paths["/products/{id}"]["put"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    deleteProduct: ServiceOperationMutation<{
        method: "delete";
        url: "/products/{id}";
    }, undefined, unknown, paths["/products/{id}"]["delete"]["parameters"], paths["/products/{id}"]["delete"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
}
export const productsService: {
    [key in keyof ProductsService]: Pick<ProductsService[key], "schema">;
} = {
    allProducts: {
        schema: {
            method: "get",
            url: "/products"
        }
    },
    createProduct: {
        schema: {
            method: "post",
            url: "/products",
            mediaType: "application/json; charset=utf-8"
        }
    },
    productById: {
        schema: {
            method: "get",
            url: "/products/{id}"
        }
    },
    updateProduct: {
        schema: {
            method: "put",
            url: "/products/{id}",
            mediaType: "application/json; charset=utf-8"
        }
    },
    deleteProduct: {
        schema: {
            method: "delete",
            url: "/products/{id}"
        }
    }
} as const;
