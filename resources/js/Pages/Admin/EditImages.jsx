import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import MultiImageUploader from "../Component/MultiImageUploader";


export default function EditImage ({value, id, names}) {
    console.log(names);
    return (
        <>

         <AuthenticatedLayout
                            header={
                                <h2 className="text-xl font-semibold leading-tight text-gray-800">
                                    Edit Images for <span className="underline">{names.varient}</span> Varient of Product: {names.product},
                                </h2>
                            }
                        >
            <div className="flex align-middle justify-center">
                <div>
                    <MultiImageUploader images={value} variantId={id} />
                </div>
                <div>
            {/* <MultiImageUploader uploadUrl='/varient_images' /> */}
            </div>
            </div>


            </AuthenticatedLayout>

        </>
    );
};
