import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MultiImageUploader from "../Component/MultiImageUploader";
import FormForAddingDesign from "../Component/FormForAddingDesign";


export default function CreateDesign ({product}) {

    return (
        <>

         <AuthenticatedLayout
                            header={
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Create a Design for {product.name}
                                </h2>
                            }
                        >
            <div className="flex align-middle justify-center">
                <div>

                    <FormForAddingDesign availableVariants = {product.varients} storeUrl = 'create_design' />
                </div>
                <div>
            {/* <MultiImageUploader uploadUrl='/varient_images' /> */}
            </div>
            </div>


            </AuthenticatedLayout>

        </>
    );
};
