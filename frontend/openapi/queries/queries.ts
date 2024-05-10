// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { UseMutationOptions, UseQueryOptions, useMutation, useQuery } from "@tanstack/react-query";
import { BrandService, CategoryService, OrderService, ProductService, UserService } from "../requests/services.gen";
import { BrandBody, CategoryBody, LoginUserBody, OrderBody, PaymentBody, ProductBody, ReigsterUserBody, SortBy, SortDirection } from "../requests/types.gen";
import * as Common from "./common";
/**
* @returns Category
* @throws ApiError
*/
export const useCategoryServiceGetCategories = <TData = Common.CategoryServiceGetCategoriesDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCategoryServiceGetCategoriesKeyFn(), queryFn: () => CategoryService.getCategories() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Category
* @throws ApiError
*/
export const useCategoryServiceGetCategoriesById = <TData = Common.CategoryServiceGetCategoriesByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseCategoryServiceGetCategoriesByIdKeyFn({ id }, queryKey), queryFn: () => CategoryService.getCategoriesById({ id }) as TData, ...options });
/**
* @returns Brand
* @throws ApiError
*/
export const useBrandServiceGetBrands = <TData = Common.BrandServiceGetBrandsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBrandServiceGetBrandsKeyFn(), queryFn: () => BrandService.getBrands() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Brand
* @throws ApiError
*/
export const useBrandServiceGetBrandsById = <TData = Common.BrandServiceGetBrandsByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseBrandServiceGetBrandsByIdKeyFn({ id }, queryKey), queryFn: () => BrandService.getBrandsById({ id }) as TData, ...options });
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
export const useProductServiceGetProducts = <TData = Common.ProductServiceGetProductsDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ search, skip, sortBy, sortDirection, take }: {
  search?: string;
  skip?: number;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  take?: number;
} = {}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProductServiceGetProductsKeyFn({ search, skip, sortBy, sortDirection, take }, queryKey), queryFn: () => ProductService.getProducts({ search, skip, sortBy, sortDirection, take }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns Product
* @throws ApiError
*/
export const useProductServiceGetProductsById = <TData = Common.ProductServiceGetProductsByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseProductServiceGetProductsByIdKeyFn({ id }, queryKey), queryFn: () => ProductService.getProductsById({ id }) as TData, ...options });
/**
* @returns Order
* @throws ApiError
*/
export const useOrderServiceGetOrders = <TData = Common.OrderServiceGetOrdersDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>(queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrderServiceGetOrdersKeyFn(), queryFn: () => OrderService.getOrders() as TData, ...options });
/**
* @param data The data for the request.
* @param data.id
* @returns SpecificOrder
* @throws ApiError
*/
export const useOrderServiceGetOrdersById = <TData = Common.OrderServiceGetOrdersByIdDefaultResponse, TError = unknown, TQueryKey extends Array<unknown> = unknown[]>({ id }: {
  id: number;
}, queryKey?: TQueryKey, options?: Omit<UseQueryOptions<TData, TError>, "queryKey" | "queryFn">) => useQuery<TData, TError>({ queryKey: Common.UseOrderServiceGetOrdersByIdKeyFn({ id }, queryKey), queryFn: () => OrderService.getOrdersById({ id }) as TData, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns string The user has been successfully registered, and authentication token is returned
* @throws ApiError
*/
export const useUserServicePostUserRegister = <TData = Common.UserServicePostUserRegisterMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ReigsterUserBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ReigsterUserBody;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.postUserRegister({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns string Successfully logged in, and authentication token is returned
* @throws ApiError
*/
export const useUserServicePostUserLogin = <TData = Common.UserServicePostUserLoginMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: LoginUserBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: LoginUserBody;
}, TContext>({ mutationFn: ({ requestBody }) => UserService.postUserLogin({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.requestBody
* @returns number Returns the ID of the created category
* @throws ApiError
*/
export const useCategoryServicePostCategories = <TData = Common.CategoryServicePostCategoriesMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: CategoryBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: CategoryBody;
}, TContext>({ mutationFn: ({ requestBody }) => CategoryService.postCategories({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.requestBody
* @returns number Returns the ID of the created brand
* @throws ApiError
*/
export const useBrandServicePostBrands = <TData = Common.BrandServicePostBrandsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: BrandBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: BrandBody;
}, TContext>({ mutationFn: ({ requestBody }) => BrandService.postBrands({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.requestBody
* @returns number Returns the ID of the created product
* @throws ApiError
*/
export const useProductServicePostProducts = <TData = Common.ProductServicePostProductsMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: ProductBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: ProductBody;
}, TContext>({ mutationFn: ({ requestBody }) => ProductService.postProducts({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.requestBody
* @returns number Created order, returns the order id
* @throws ApiError
*/
export const useOrderServicePostOrders = <TData = Common.OrderServicePostOrdersMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  requestBody: OrderBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  requestBody: OrderBody;
}, TContext>({ mutationFn: ({ requestBody }) => OrderService.postOrders({ requestBody }) as unknown as Promise<TData>, ...options });
/**
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns unknown Payment successful
* @throws ApiError
*/
export const useOrderServicePostOrdersByIdPay = <TData = Common.OrderServicePostOrdersByIdPayMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: PaymentBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: PaymentBody;
}, TContext>({ mutationFn: ({ id, requestBody }) => OrderService.postOrdersByIdPay({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns void The category has been successfully updated
* @throws ApiError
*/
export const useCategoryServicePutCategoriesById = <TData = Common.CategoryServicePutCategoriesByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: CategoryBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: CategoryBody;
}, TContext>({ mutationFn: ({ id, requestBody }) => CategoryService.putCategoriesById({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns void The brand has been successfully updated
* @throws ApiError
*/
export const useBrandServicePutBrandsById = <TData = Common.BrandServicePutBrandsByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: BrandBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: BrandBody;
}, TContext>({ mutationFn: ({ id, requestBody }) => BrandService.putBrandsById({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @param data.requestBody
* @returns void The product has been successfully updated
* @throws ApiError
*/
export const useProductServicePutProductsById = <TData = Common.ProductServicePutProductsByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
  requestBody: ProductBody;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
  requestBody: ProductBody;
}, TContext>({ mutationFn: ({ id, requestBody }) => ProductService.putProductsById({ id, requestBody }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @returns void The category has been successfully deleted
* @throws ApiError
*/
export const useCategoryServiceDeleteCategoriesById = <TData = Common.CategoryServiceDeleteCategoriesByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => CategoryService.deleteCategoriesById({ id }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @returns void The brand has been successfully deleted
* @throws ApiError
*/
export const useBrandServiceDeleteBrandsById = <TData = Common.BrandServiceDeleteBrandsByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => BrandService.deleteBrandsById({ id }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @returns void The product has been successfully deleted
* @throws ApiError
*/
export const useProductServiceDeleteProductsById = <TData = Common.ProductServiceDeleteProductsByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => ProductService.deleteProductsById({ id }) as unknown as Promise<TData>, ...options });
/**
* ADMIN
* @param data The data for the request.
* @param data.id
* @returns void The order has been successfully deleted
* @throws ApiError
*/
export const useOrderServiceDeleteOrdersById = <TData = Common.OrderServiceDeleteOrdersByIdMutationResult, TError = unknown, TContext = unknown>(options?: Omit<UseMutationOptions<TData, TError, {
  id: number;
}, TContext>, "mutationFn">) => useMutation<TData, TError, {
  id: number;
}, TContext>({ mutationFn: ({ id }) => OrderService.deleteOrdersById({ id }) as unknown as Promise<TData>, ...options });
