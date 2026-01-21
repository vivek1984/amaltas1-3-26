import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MultiImageUploader from "../Component/MultiImageUploader";
import FormForAddingSize from "../Component/FormForAddingSize";


export default function CreateSize ({product, designs}) {
console.log(designs);


    return (
        <>

         <AuthenticatedLayout
                            header={
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Create a Size for {product.name}
                                </h2>
                            }
                        >
            <div className="flex align-middle justify-center">
                <div>

                    <FormForAddingSize availableDesigns= {designs} id = {product.id} storeUrl = 'create_size' />
                </div>
                <div>
            {/* <MultiImageUploader uploadUrl='/varient_images' /> */}
            </div>
            </div>


            </AuthenticatedLayout>

        </>
    );
};
