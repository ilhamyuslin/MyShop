import { use } from "react";
import { DUMMY_CATEGORIES } from "@/lib/dummy-data";
import { CategoryView } from "@/components/store/category/CategoryView";

export default function ProductsCatalogPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string; q?: string; discount?: string }>;
}) {
  const resolvedParams = use(searchParams);
  const categoryQuery = resolvedParams.category;
  const searchQuery = resolvedParams.q;
  const isDiscount = resolvedParams.discount === "true";

  let currentCategory = undefined;
  if (categoryQuery) {
    currentCategory = DUMMY_CATEGORIES.find(
      (c) =>
        c.slug.toLowerCase() === categoryQuery.toLowerCase() ||
        c.name.toLowerCase() === categoryQuery.toLowerCase()
    );
  }

  return (
    <CategoryView
      currentCategory={currentCategory}
      initialSearchQuery={searchQuery}
      initialDiscountOnly={isDiscount}
    />
  );
}

