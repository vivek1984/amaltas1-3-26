import React from "react";
import Welcome from "../Welcome";
import Inner from "./Inner";

export default function Dashboard({
  user,
  orders,
  clusters,
  costing = [],
  installation = 0,
  estimates = [],
  material = {},
  materials = [],
  addons = [],
  cabinetTypes = []
}) {
  return (
    <Welcome clusters={clusters}>
      <Inner
        userData={user}
        ordersData={orders}
        costing={costing}
        installation={installation}
        estimates={estimates}
        material={material}
        materials={materials}
        addons={addons}
        cabinetTypes={cabinetTypes}
      />
    </Welcome>
  );
}
