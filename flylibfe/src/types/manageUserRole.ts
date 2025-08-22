export interface UserRole {
  id: string;
  email: string;
  displayName: string;
  roles: string[];
}

export interface AssignRoleRequest {
  userEmail: string;
  role: string;
}

export interface RoleRequest {
  role: string;
}