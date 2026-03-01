import Welcome from "../Welcome";
import ProductPage from "./ProductPage";
import RelatedProducts from "./RelatedProducts";

export default function Product ({product, clusters, products}) {
    return (
        <Welcome
            clusters={clusters}
            ogImage={product?.small_image ? `/storage/${product.small_image}` : undefined}
        >
            <ProductPage product={product} />
            <RelatedProducts products={products} />
        </Welcome>
    );
};
