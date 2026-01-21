import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import FormForAddingVarient from "../Component/FormForAddingVarient";
import MultiImageUploader from "../Component/MultiImageUploader";


export default function CreateVarient ({product}) {
    return (
        <>

         <AuthenticatedLayout
                            header={
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Create a Varient for {product.name}
                                </h2>
                            }
                        >
            <div className="flex align-middle justify-center">
                <div>
                    <FormForAddingVarient id = {product.id} storeUrl = 'create_varient' />
                </div>
                <div>
            {/* <MultiImageUploader uploadUrl='/varient_images' /> */}
            </div>
            </div>


            </AuthenticatedLayout>

        </>
    );
};
