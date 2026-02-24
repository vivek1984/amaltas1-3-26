import Welcome from "../Welcome";
import KitchenLayoutForm from "./KitchenLayoutForm";

export default function ModularKitchens ({clusters, cluster, materialRates}) {
    return (
        <>
        <Welcome clusters={clusters}>
            <KitchenLayoutForm />
        </Welcome>
        </>
    );
};
