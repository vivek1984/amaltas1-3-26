import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import { Link, router } from '@inertiajs/react';

export default function EditProductField ({inputType, name, modelId, modelName, modelField, fieldValue}) {


    function handleSubmit(e) {
        e.preventDefault()
      }
    function inputChanged(e, id, model, field){
        const value = {
            id: id,
            model: model,
            field: field,
            value: e.target.value
            }
        router.post('/admin_edit_product', value)
            window.location.reload()
      }

    function editField(id, collectionName, collectionProperty) {
    console.log(id, collectionName, collectionProperty);

    }
    return (
        <>


            <form onSubmit={handleSubmit}>
            {   inputType == 'input' &&
                <input type='text' name={modelField} onBlur={() => inputChanged(event, modelId, modelName, modelField)} defaultValue={fieldValue} className='text-black rounded h-10 w-[90%]' / >
            }
            {   inputType == 'textarea' &&
                <textarea type='text' name={modelField} onBlur={() => inputChanged(event, modelId, modelName, modelField)} defaultValue={fieldValue} className='text-black rounded h-60 w-[90%]' / >
            }
            </form>
        </>
    );
};
