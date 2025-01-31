import { Edit, Eye, Plus, PlusCircle } from "lucide-react";
import React from "react";
import { checkPermission } from "./checkPermission";

const getStaticPermissions = () => {
  const buttonPermissions = localStorage.getItem("buttonControl");
  try {
    return buttonPermissions ? JSON.parse(buttonPermissions) : [];
  } catch (error) {
    console.error(
      "Error parsing StaticPermission data from localStorage",
      error
    );
    return [];
  }
};

/*-------------------------Vechiles---------------- */
export const VechilesEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "VechilesEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Vehicles">
      <Edit className="h-4 w-4" />
    </button>
  );
};
VechilesEdit.page = "Vehicles";
export const VechilesView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "VechilesView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Vehicles">
      <Edit className="h-4 w-4" />
    </button>
  );
};
VechilesView.page = "Vehicles";

export const VechilesCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "VechilesCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      <Plus className="h-4 w-4 " />
      Vehicles
    </button>
  );
};
VechilesCreate.page = "Vehicles";
/*---------------Service--------------------------------- */
export const ServiceCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ServiceCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      <Plus className="h-4 w-4 " />
      Service
    </button>
  );
};
ServiceCreate.page = "Service";

export const ServiceEdit = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ServiceEdit", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Vehicles">
      <Edit className="h-4 w-4" />
    </button>
  );
};
ServiceEdit.page = "Service";
export const ServiceView = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "ServiceView", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className} title="Edit Vehicles">
      <Eye className="h-4 w-4" />
    </button>
  );
};
ServiceView.page = "Service";

/*---------------Payment--------------------------------- */
export const PaymentBranchCreate = ({ onClick, className }) => {
  const userId = localStorage.getItem("id") || "";
  const staticPermissions = getStaticPermissions();
  if (!checkPermission(userId, "PaymentBranchCreate", staticPermissions)) {
    return null;
  }

  return (
    <button onClick={onClick} className={className}>
      <Plus className="h-4 w-4 " />
      Branch Payment
    </button>
  );
};
PaymentBranchCreate.page = "Service";
export default {
  VechilesEdit,
  VechilesCreate,
  VechilesView,
  ServiceCreate,
  ServiceEdit,
  ServiceView,
};
