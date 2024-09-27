import { Container } from "@/shared/components/shared";
import { Categories } from "@/shared/components/shared/categories";
import { Filters } from "@/shared/components/shared/filters";
import { Header } from "@/shared/components/shared/header";
import { ProductsGroupList } from "@/shared/components/shared/products-group-list";
import { SortPopup } from "@/shared/components/shared/sort-popup";
import { Title } from "@/shared/components/shared/title";
import { TopBar } from "@/shared/components/shared/top-bar";
import { prisma } from "@/prisma/prisma-client";

export default async function Home() {
  const categories = await prisma.category.findMany({
    include: {
      products: {
        include: {
          items: true,
          ingredients: true,
        },
      },
    },
  });

  return (
    <main className="min-h-screen bg-white rounded-3xl">
      <Container className="mt-5">
        <Title text="Все пиццы" size="lg" className="font-extrabold" />
      </Container>
      <TopBar
        categories={categories.filter(
          (category) => category.products.length > 0
        )}
      />

      {/* <div className="sticky top-0 bg-white py-5 shadow-lg shadow-black/5 z-10"> */}
      <Container className="flex items-center justify-between ">
        {/* <Categories /> */}
        {/* <SortPopup /> */}
      </Container>
      {/* </div> */}

      {/* <Container className="grid grid-cols-6 gap-2 my-10">
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
        />
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
        />
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
        />
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/xep/xzh/zmc/cr4gcw0aselwvf628pbmj3j/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3101815496"
        />
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/km2/9gf/jrn/sb7ls1yj9fe5bwvuwgym73e/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=3074015640"
        />
        <img
          className="rounded-md"
          height={250}
          width={200}
          src="https://cdn.inappstory.ru/story/quw/acz/zf5/zu37vankpngyccqvgzbohj1/custom_cover/logo-350x440.webp?k=IgAAAAAAAAAE&v=1336215020"
        />
      </Container> */}

      <Container className="pb-14 my-11">
        <div className="flex gap-[60px]">
          <div className="w-[250px]">
            <Filters />
          </div>
          <div className="flex-1">
            <div className="flex flex-col gap-16">
              {categories.map(
                (category) =>
                  category.products.length > 0 && (
                    <ProductsGroupList
                      key={category.id}
                      title={category.name}
                      categoryId={category.id}
                      items={category.products}
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </Container>
    </main>
  );
}
