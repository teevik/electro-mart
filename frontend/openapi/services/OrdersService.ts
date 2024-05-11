/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import type { paths } from "../openapi.d.ts";
import type { ServiceOperationQuery, ServiceOperationMutation } from "@openapi-qraft/react";
export interface OrdersService {
    allOrders: ServiceOperationQuery<{
        method: "get";
        url: "/orders";
    }, paths["/orders"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], undefined, paths["/orders"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    createOrder: ServiceOperationMutation<{
        method: "post";
        url: "/orders";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/orders"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], paths["/orders"]["post"]["responses"]["201"]["content"]["application/json; charset=utf-8"], undefined, paths["/orders"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    getOrder: ServiceOperationQuery<{
        method: "get";
        url: "/orders/{id}";
    }, paths["/orders/{id}"]["get"]["responses"]["200"]["content"]["application/json; charset=utf-8"], paths["/orders/{id}"]["get"]["parameters"], paths["/orders/{id}"]["get"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    /** @summary ADMIN */
    deleteOrder: ServiceOperationMutation<{
        method: "delete";
        url: "/orders/{id}";
    }, undefined, unknown, paths["/orders/{id}"]["delete"]["parameters"], paths["/orders/{id}"]["delete"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
    payOrder: ServiceOperationMutation<{
        method: "post";
        url: "/orders/{id}/pay";
        mediaType: "application/json; charset=utf-8";
    }, NonNullable<paths["/orders/{id}/pay"]["post"]["requestBody"]>["content"]["application/json; charset=utf-8"], unknown, paths["/orders/{id}/pay"]["post"]["parameters"], paths["/orders/{id}/pay"]["post"]["responses"]["500"]["content"]["text/plain; charset=utf-8"]>;
}
export const ordersService: {
    [key in keyof OrdersService]: Pick<OrdersService[key], "schema">;
} = {
    allOrders: {
        schema: {
            method: "get",
            url: "/orders"
        }
    },
    createOrder: {
        schema: {
            method: "post",
            url: "/orders",
            mediaType: "application/json; charset=utf-8"
        }
    },
    getOrder: {
        schema: {
            method: "get",
            url: "/orders/{id}"
        }
    },
    deleteOrder: {
        schema: {
            method: "delete",
            url: "/orders/{id}"
        }
    },
    payOrder: {
        schema: {
            method: "post",
            url: "/orders/{id}/pay",
            mediaType: "application/json; charset=utf-8"
        }
    }
} as const;
