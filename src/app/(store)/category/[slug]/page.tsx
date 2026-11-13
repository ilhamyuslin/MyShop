import { use } from "react";
import { notFound } from "next/navigation";
import { DUMMY_CATEGORIES } from "@/lib/dummy-data";
import { CategoryView } from "@/components/store/category/CategoryView";

export default function CategoryDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const resolvedParams = use(params);
  const slug = resolvedParams.slug;

  const category = DUMMY_CATEGORIES.find((c) => c.slug === slug);

  if (!category) {
    notFound();
  }

  return <CategoryView currentCategory={category} />;
}

