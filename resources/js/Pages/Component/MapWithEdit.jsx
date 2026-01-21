


import { router } from '@inertiajs/react';
import { MdEdit } from "react-icons/md";
import { useState } from 'react';
import { FaArrowAltCircleRight } from "react-icons/fa";


export default function MapWithEdit({ collection, postUrl, arrowTrue, currentCluster }) {

    const [clusterEdit, setClusterEdit] = useState('');

    function handleClusterEdit(id, name) {
        setClusterEdit(id);
    }

    function handleSubmit(e) {
        e.preventDefault()
      }

    function inputChanged(e, id){
        const value = {
            id: id,
            name: e.target.value
            }
        router.post(`/${postUrl}`, value)
        window.location.reload()
      }

      function handleLinking(id) {
        const value = {
            id: id,
            name: currentCluster
        }
        router.post('/link_cluster_group', value)
        window.location.reload()
      }

    const clusterList = collection.map((cluster) => (

            <li key={cluster.id}>
                <img src={ `storage/${cluster.image}` }  width='50px' className='inline-block m-2'/>
                { clusterEdit != cluster.id && cluster.name}
                {clusterEdit == cluster.id && <form onSubmit={handleSubmit}>
                    <input type='text' name="cluster-name" onBlur={() => inputChanged(event, cluster.id)} defaultValue={cluster.name} className='rounded h-1 w-32' />
                </form> }
                { clusterEdit != cluster.id &&
                <MdEdit onClick={() => handleClusterEdit(cluster.id, cluster.name)} className='inline-block text-[12px] mb-2 ml-2 text-red-700' />
                }
                {arrowTrue && <FaArrowAltCircleRight className='ml-2 text-xs2 inline-block' onClick={() => handleLinking(cluster.id)}/>}
            </li>
          ));

    return(
        <>
        {clusterList}
        </>
    );
}
