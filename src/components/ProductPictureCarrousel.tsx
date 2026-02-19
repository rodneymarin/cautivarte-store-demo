import { useState } from "react";

interface ProductPictureCarrouselProps {
  images: string[];
}
export default function ProductPictureCarrousel(props: ProductPictureCarrouselProps) {
  const [selected, setSelected] = useState(0);

  function handleClick(index: number) {
    setSelected(index);
  }

  return (
    <div className="flex flex-col-reverse md:flex-row gap-3">
      <div className="flex flex-row w-full justify-center md:flex-col md:w-auto md:justify-start gap-2">
        {
          props.images.map((item, index) => {
            return (
              <button
                key={item}
                onClick={() => handleClick(index)}>
                <div
                  className={`aspect-square rounded-3xl overflow-hidden relative w-24 cursor-pointer border-4 ${(selected === index) ? "border-brand-primary" : "border-transparent"} hover:brightness-90`}
                // style={{ backgroundImage: `url('/product-pictures/small/${item}')` }}>
                >

                  <img className="h-full" src={"/product-pictures/" + item} loading="lazy" />

                </div>
              </button>
            )
          })
        }
      </div>
      <div
        className="rounded-3xl overflow-hidden aspect-square relative w-full"
      // style={{ backgroundImage: `/product-pictures/small/${props.images[selected]}` }}>
      >

        <img src={`/product-pictures/${props.images[selected]}`} loading="lazy" />

      </div>
      {/* <div className="rounded-3xl overflow-hidden aspect-square relative w-full">
        <Image
          src={`/product-pictures/${props.images[selected]}`}
          alt="Imagen de producto"
          fill
          placeholder="blur"
          blurDataURL={`/product-pictures/small/${props.images[selected]}`}
          className="object-cover"
        />
        
      </div> */}

    </div>
  )
}
