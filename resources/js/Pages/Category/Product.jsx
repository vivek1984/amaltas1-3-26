import Welcome from "../Welcome";
import ProductPage from "./ProductPage";
import RelatedProducts from "./RelatedProducts";

export default function Product ({product, clusters, products}) {
    return (
        <Welcome clusters={clusters}>
            <ProductPage product={product} />
            <RelatedProducts products={products} />
        </Welcome>
    );
};
