import { useCart } from "../hooks/useCart";
import { useParams } from "react-router-dom";
import ProductPictureCarrousel from "../components/ProductPictureCarrousel";

export default function PageProduct() {
	const { increaseQuantity } = useCart();
	const params = useParams();
	//const { product, isLoadingProduct: isLoading } = useFetchProduct(params.cod!);

	//if (isLoading) return <p className="text-neutral-200">Cargando...</p>;

	return (
		<main className="w-full flex flex-col md:flex-row md:gap-8">
			{/* {
				<>
					<div className="w min-w-[60%]">
						{
							product && <ProductPictureCarrousel images={product.image_files.split("|")} />
						}
					</div>
					<div className="pt-8 divide-y">
						{
							product &&
							(
								<>
									<div>
										<h1 className="text-3xl font-bold">{product?.name}</h1>
										<p>{product?.technique}</p>
										<h2 className="text-2xl font-bold">{"$"}{product?.price}</h2>
										<button
											className="chip hover-brand-secondary bg-brand-primary text-white font-bold mt-6 w-full md:w-fit py-3 md:py-1"
											onClick={() => increaseQuantity(product.id)}
										>
											Agregar al carrito
										</button>
									</div>
									<p className="mt-4 pt-4">
										{product?.description}
									</p>
								</>
							)
						}
					</div>
				</>
			} */}


		</main>
	);
}
