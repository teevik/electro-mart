// generated with @7nohe/openapi-react-query-codegen@1.3.0 

import { UseQueryResult } from "@tanstack/react-query";
import { BrandService, CategoryService, OrderService, ProductService, UserService } from "../requests/services.gen";
import { SortBy, SortDirection } from "../requests/types.gen";
export type CategoryServiceGetCategoriesDefaultResponse = Awaited<ReturnType<typeof CategoryService.getCategories>>;
export type CategoryServiceGetCategoriesQueryResult<TData = CategoryServiceGetCategoriesDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCategoryServiceGetCategoriesKey = "CategoryServiceGetCategories";
export const UseCategoryServiceGetCategoriesKeyFn = () => [useCategoryServiceGetCategoriesKey];
export type CategoryServiceGetCategoriesByIdDefaultResponse = Awaited<ReturnType<typeof CategoryService.getCategoriesById>>;
export type CategoryServiceGetCategoriesByIdQueryResult<TData = CategoryServiceGetCategoriesByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useCategoryServiceGetCategoriesByIdKey = "CategoryServiceGetCategoriesById";
export const UseCategoryServiceGetCategoriesByIdKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useCategoryServiceGetCategoriesByIdKey, ...(queryKey ?? [{ id }])];
export type BrandServiceGetBrandsDefaultResponse = Awaited<ReturnType<typeof BrandService.getBrands>>;
export type BrandServiceGetBrandsQueryResult<TData = BrandServiceGetBrandsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useBrandServiceGetBrandsKey = "BrandServiceGetBrands";
export const UseBrandServiceGetBrandsKeyFn = () => [useBrandServiceGetBrandsKey];
export type BrandServiceGetBrandsByIdDefaultResponse = Awaited<ReturnType<typeof BrandService.getBrandsById>>;
export type BrandServiceGetBrandsByIdQueryResult<TData = BrandServiceGetBrandsByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useBrandServiceGetBrandsByIdKey = "BrandServiceGetBrandsById";
export const UseBrandServiceGetBrandsByIdKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useBrandServiceGetBrandsByIdKey, ...(queryKey ?? [{ id }])];
export type ProductServiceGetProductsDefaultResponse = Awaited<ReturnType<typeof ProductService.getProducts>>;
export type ProductServiceGetProductsQueryResult<TData = ProductServiceGetProductsDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useProductServiceGetProductsKey = "ProductServiceGetProducts";
export const UseProductServiceGetProductsKeyFn = ({ search, skip, sortBy, sortDirection, take }: {
  search?: string;
  skip?: number;
  sortBy?: SortBy;
  sortDirection?: SortDirection;
  take?: number;
} = {}, queryKey?: Array<unknown>) => [useProductServiceGetProductsKey, ...(queryKey ?? [{ search, skip, sortBy, sortDirection, take }])];
export type ProductServiceGetProductsByIdDefaultResponse = Awaited<ReturnType<typeof ProductService.getProductsById>>;
export type ProductServiceGetProductsByIdQueryResult<TData = ProductServiceGetProductsByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useProductServiceGetProductsByIdKey = "ProductServiceGetProductsById";
export const UseProductServiceGetProductsByIdKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useProductServiceGetProductsByIdKey, ...(queryKey ?? [{ id }])];
export type OrderServiceGetOrdersDefaultResponse = Awaited<ReturnType<typeof OrderService.getOrders>>;
export type OrderServiceGetOrdersQueryResult<TData = OrderServiceGetOrdersDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrderServiceGetOrdersKey = "OrderServiceGetOrders";
export const UseOrderServiceGetOrdersKeyFn = () => [useOrderServiceGetOrdersKey];
export type OrderServiceGetOrdersByIdDefaultResponse = Awaited<ReturnType<typeof OrderService.getOrdersById>>;
export type OrderServiceGetOrdersByIdQueryResult<TData = OrderServiceGetOrdersByIdDefaultResponse, TError = unknown> = UseQueryResult<TData, TError>;
export const useOrderServiceGetOrdersByIdKey = "OrderServiceGetOrdersById";
export const UseOrderServiceGetOrdersByIdKeyFn = ({ id }: {
  id: number;
}, queryKey?: Array<unknown>) => [useOrderServiceGetOrdersByIdKey, ...(queryKey ?? [{ id }])];
export type UserServicePostUserRegisterMutationResult = Awaited<ReturnType<typeof UserService.postUserRegister>>;
export type UserServicePostUserLoginMutationResult = Awaited<ReturnType<typeof UserService.postUserLogin>>;
export type CategoryServicePostCategoriesMutationResult = Awaited<ReturnType<typeof CategoryService.postCategories>>;
export type BrandServicePostBrandsMutationResult = Awaited<ReturnType<typeof BrandService.postBrands>>;
export type ProductServicePostProductsMutationResult = Awaited<ReturnType<typeof ProductService.postProducts>>;
export type OrderServicePostOrdersMutationResult = Awaited<ReturnType<typeof OrderService.postOrders>>;
export type OrderServicePostOrdersByIdPayMutationResult = Awaited<ReturnType<typeof OrderService.postOrdersByIdPay>>;
export type CategoryServicePutCategoriesByIdMutationResult = Awaited<ReturnType<typeof CategoryService.putCategoriesById>>;
export type BrandServicePutBrandsByIdMutationResult = Awaited<ReturnType<typeof BrandService.putBrandsById>>;
export type ProductServicePutProductsByIdMutationResult = Awaited<ReturnType<typeof ProductService.putProductsById>>;
export type CategoryServiceDeleteCategoriesByIdMutationResult = Awaited<ReturnType<typeof CategoryService.deleteCategoriesById>>;
export type BrandServiceDeleteBrandsByIdMutationResult = Awaited<ReturnType<typeof BrandService.deleteBrandsById>>;
export type ProductServiceDeleteProductsByIdMutationResult = Awaited<ReturnType<typeof ProductService.deleteProductsById>>;
export type OrderServiceDeleteOrdersByIdMutationResult = Awaited<ReturnType<typeof OrderService.deleteOrdersById>>;
