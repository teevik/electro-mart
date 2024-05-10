import { useProductServiceGetProductsSuspense } from "../../openapi/queries/suspense";
import { Link } from "../components/link";

export function ProductsPage() {
  const query = useProductServiceGetProductsSuspense();
  const products = query.data;

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {products.map((product) => (
        <Link
          key={product.id}
          href={`/products/${product.id}`}
          className="relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
            <img
              src={product.image_url}
              alt=""
              className="object-contain group-hover:opacity-75"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="mt-2 block truncate text-base font-medium text-gray-900">
                {product.name}
              </p>
              <p className="block text-sm font-medium text-gray-500">
                {product.category.name}
              </p>
            </div>

            <p className="mt-2 block truncate text-base font-medium text-gray-900">
              ${product.price}
            </p>
          </div>
        </Link>
      ))}
    </ul>
  );
}
