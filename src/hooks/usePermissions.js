import { useRole } from '../contexts/RoleContext';

export const usePermissions = () => {
  const { role } = useRole();
  const can = (permission) => {
    const permissions = {
      viewer: ['view'],
      admin: ['view', 'create', 'edit', 'delete']
    };
    return permissions[role]?.includes(permission) || false;
  };
  return { can };
};