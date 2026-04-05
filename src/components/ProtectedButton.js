import React from 'react';
import { Plus, Edit3, Trash2 } from 'lucide-react';
import { usePermissions } from '../hooks/usePermissions';

const ProtectedButton = ({ permission, children, icon: Icon, className = '', ...props }) => {
  const { can } = usePermissions();
  if (!can(permission)) return null;
  
  const DefaultIcon = Icon || Plus;
  
  return (
    <button
      className={`flex items-center gap-2 px-3 py-2 bg-emerald-500/90 hover:bg-emerald-600 text-white font-medium rounded-lg shadow-lg hover:shadow-xl transition-all ${className}`}
      {...props}
    >
      <DefaultIcon size={16} />
      {children}
    </button>
  );
};

export default ProtectedButton;