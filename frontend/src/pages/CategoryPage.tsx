import { api } from "../api";
import { Link } from "../components/link";
import { Text } from "../components/text";

interface CategoryPageProps {
  id: string;
}

export function CategoryPage(props: CategoryPageProps) {
  const { id } = props;
  const numericId = parseInt(id);

  const categoryQuery = api.categories.categoryById.useSuspenseQuery({
    path: { id: numericId },
  });

  const category = categoryQuery.data;

  const productsQuery = api.products.allProducts.useSuspenseQuery({
    query: {
      category_id: numericId,
    },
  });
  const products = productsQuery.data;

  return (
    <>
      <div className="mb-8">
        <h1 className="flex items-center text-3xl font-bold leading-tight tracking-tight text-gray-900">
          {category.name}
        </h1>
        <Text>{category.description}</Text>
      </div>
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
    </>
  );
}
