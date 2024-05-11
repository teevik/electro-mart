import { api } from "../api";
import { Link } from "../components/link";

export function CategoriesPage() {
  const query = api.categories.allCategories.useSuspenseQuery(undefined);
  const categories = query.data;

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {categories.map((category) => (
        <Link
          key={category.id}
          href={`/categories/${category.id}`}
          className="relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
            <img
              src={category.image_url}
              alt=""
              className="object-contain group-hover:opacity-75"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="mt-2 block truncate text-base font-medium text-gray-900">
                {category.name}
              </p>
              <p className="block text-sm font-medium text-gray-500">
                {category.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
