import { api } from "../api";
import { Link } from "../components/link";

export function BrandsPage() {
  const query = api.brands.allBrands.useSuspenseQuery(undefined);
  const brands = query.data;

  return (
    <ul
      role="list"
      className="grid grid-cols-2 gap-x-4 gap-y-8 sm:grid-cols-3 sm:gap-x-6 lg:grid-cols-4 xl:gap-x-8"
    >
      {brands.map((brand) => (
        <Link
          key={brand.id}
          href={`/brands/${brand.id}`}
          className="relative focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 focus-within:ring-offset-gray-100"
        >
          <div className="group aspect-h-7 aspect-w-10 block w-full overflow-hidden rounded-lg">
            <img
              src={brand.image_url}
              alt=""
              className="object-contain group-hover:opacity-75"
            />
          </div>
          <div className="flex justify-between">
            <div>
              <p className="mt-2 block truncate text-base font-medium text-gray-900">
                {brand.name}
              </p>
              <p className="block text-sm font-medium text-gray-500">
                {brand.description}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </ul>
  );
}
