// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { UseQueryOptions, useSuspenseQuery } from "@tanstack/react-query";
import { BrandService, CategoryService, OrderService, ProductService } from "../requests/services.gen";
import { SortBy, SortDirection } from "../requests/types.gen";
import * as Common from "./common";
/**
* @returns Category
* @throws ApiError
*/
export const useCategoryServiceGetCategoriesSuspense = <TData = Common.CategoryServiceGetCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCategoryServiceGetCategoriesKeyFn(), queryFn: () => CategoryService.getCategories() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Category
* @throws ApiError
*/
export const useCategoryServiceGetCategoriesByIdSuspense = <TData = Common.CategoryServiceGetCategoriesByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseCategoryServiceGetCategoriesByIdKeyFn({ id }, queryKey), queryFn: () => CategoryService.getCategoriesById({ id }) as TData, ...options });
/**
* @returns Brand
* @throws ApiError
*/
export const useBrandServiceGetBrandsSuspense = <TData = Common.BrandServiceGetBrandsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseBrandServiceGetBrandsKeyFn(), queryFn: () => BrandService.getBrands() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Brand
* @throws ApiError
*/
export const useBrandServiceGetBrandsByIdSuspense = <TData = Common.BrandServiceGetBrandsByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseBrandServiceGetBrandsByIdKeyFn({ id }, queryKey), queryFn: () => BrandService.getBrandsById({ id }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.search Search products by name
* @param data.sortBy Sort products
* @param data.sortDirection Sort direction
* @param data.take Amount of products to query
* @param data.skip Skip amount of products
* @returns Product
* @throws ApiError
*/
export const useProductServiceGetProductsSuspense = <TData = Common.ProductServiceGetProductsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ search, skip, sortBy, sortDirection, take }: {
  search?: string;
  skip?: number;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  take?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProductServiceGetProductsKeyFn({ search, skip, sortBy, sortDirection, take }, queryKey), queryFn: () => ProductService.getProducts({ search, skip, sortBy, sortDirection, take }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Product
* @throws ApiError
*/
export const useProductServiceGetProductsByIdSuspense = <TData = Common.ProductServiceGetProductsByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseProductServiceGetProductsByIdKeyFn({ id }, queryKey), queryFn: () => ProductService.getProductsById({ id }) as TData, ...options });
/**
* @returns Order
* @throws ApiError
*/
export const useOrderServiceGetOrdersSuspense = <TData = Common.OrderServiceGetOrdersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrderServiceGetOrdersKeyFn(), queryFn: () => OrderService.getOrders() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns SpecificOrder
* @throws ApiError
*/
export const useOrderServiceGetOrdersByIdSuspense = <TData = Common.OrderServiceGetOrdersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useSuspenseQuery<TData, TError>({ queryKey: Common.UseOrderServiceGetOrdersByIdKeyFn({ id }, queryKey), queryFn: () => OrderService.getOrdersById({ id }) as TData, ...options });
