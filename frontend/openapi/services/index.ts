/* generated using @openapi-qraft/cli -- do no edit */
/* istanbul ignore file */
import { UserService, userService } from "./UserService";
import { CategoriesService, categoriesService } from "./CategoriesService";
import { BrandsService, brandsService } from "./BrandsService";
import { ProductsService, productsService } from "./ProductsService";
import { OrdersService, ordersService } from "./OrdersService";
export type Services = {
    user: UserService;
    categories: CategoriesService;
    brands: BrandsService;
    products: ProductsService;
    orders: OrdersService;
};
export const services = {
    user: userService,
    categories: categoriesService,
    brands: brandsService,
    products: productsService,
    orders: ordersService
} as const;
