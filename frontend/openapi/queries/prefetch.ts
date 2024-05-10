// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { type QueryClient } from "@tanstack/react-query";
import { BrandService, CategoryService, OrderService, ProductService } from "../requests/services.gen";
import { SortBy, SortDirection } from "../requests/types.gen";
import * as Common from "./common";
/**
* @returns Category
* @throws ApiError
*/
export const prefetchUseCategoryServiceGetCategories = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useCategoryServiceGetCategoriesKey, []], queryFn: () => CategoryService.getCategories() });
/**
* @param data The data for the request.
* @param data.id
* @returns Category
* @throws ApiError
*/
export const prefetchUseCategoryServiceGetCategoriesById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: [Common.useCategoryServiceGetCategoriesByIdKey, [{ id }]], queryFn: () => CategoryService.getCategoriesById({ id }) });
/**
* @returns Brand
* @throws ApiError
*/
export const prefetchUseBrandServiceGetBrands = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useBrandServiceGetBrandsKey, []], queryFn: () => BrandService.getBrands() });
/**
* @param data The data for the request.
* @param data.id
* @returns Brand
* @throws ApiError
*/
export const prefetchUseBrandServiceGetBrandsById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: [Common.useBrandServiceGetBrandsByIdKey, [{ id }]], queryFn: () => BrandService.getBrandsById({ id }) });
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
export const prefetchUseProductServiceGetProducts = (queryClient: QueryClient, { search, skip, sortBy, sortDirection, take }: {
  search?: string;
  skip?: number;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  take?: number;
} = {}) => queryClient.prefetchQuery({ queryKey: [Common.useProductServiceGetProductsKey, [{ search, skip, sortBy, sortDirection, take }]], queryFn: () => ProductService.getProducts({ search, skip, sortBy, sortDirection, take }) });
/**
* @param data The data for the request.
* @param data.id
* @returns Product
* @throws ApiError
*/
export const prefetchUseProductServiceGetProductsById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: [Common.useProductServiceGetProductsByIdKey, [{ id }]], queryFn: () => ProductService.getProductsById({ id }) });
/**
* @returns Order
* @throws ApiError
*/
export const prefetchUseOrderServiceGetOrders = (queryClient: QueryClient) => queryClient.prefetchQuery({ queryKey: [Common.useOrderServiceGetOrdersKey, []], queryFn: () => OrderService.getOrders() });
/**
* @param data The data for the request.
* @param data.id
* @returns SpecificOrder
* @throws ApiError
*/
export const prefetchUseOrderServiceGetOrdersById = (queryClient: QueryClient, { id }: {
  id: number;
}) => queryClient.prefetchQuery({ queryKey: [Common.useOrderServiceGetOrdersByIdKey, [{ id }]], queryFn: () => OrderService.getOrdersById({ id }) });
