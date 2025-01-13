type ROLE = keyof typeof ROLES;
type Permission = (typeof ROLES)[ROLE][number];

const ROLES = {
  owner: ["view:vehicle", "view:rentrequest"],
  renter: ["view:booking"],
} as const;

type UserRole = "owner" | "renter";

export function hashPermission(role: UserRole, permission: Permission) {
  return (ROLES[role] as readonly Permission[]).includes(permission);
}
