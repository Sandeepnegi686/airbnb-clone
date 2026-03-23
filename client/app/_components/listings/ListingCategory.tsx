import { IconType } from "react-icons";

interface ListingCategoryProps {
  category: {
    label: string;
    icon: IconType;
    description: string;
  };
}

export default function ListingCategory({ category }: ListingCategoryProps) {
  const Icon = category.icon;
  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{category.label}</div>
        </div>
        <div className="text-neutral-500 font-light">
          {category.description}
        </div>
      </div>
    </div>
  );
}
