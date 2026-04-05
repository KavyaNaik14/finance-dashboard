import React from 'react';
import { User, Shield } from 'lucide-react';
import { useRole } from '../contexts/RoleContext';  

const RoleSwitcher = () => {
  const { role, switchRole } = useRole();
  return (
    <div className="flex items-center gap-3 p-4 bg-white/10 backdrop-blur-xl rounded-2xl border border-white/20">
      <div className="flex items-center gap-2">
        {role === 'admin' ? <Shield className="w-6 h-6 text-emerald-400" /> : <User className="w-6 h-6 text-gray-400" />}
        <span className={`font-semibold px-3 py-1 rounded-full text-sm ${role === 'admin' ? 'bg-emerald-500/20 text-emerald-300' : 'bg-gray-500/20 text-gray-300'}`}>
          {role === 'admin' ? 'Admin' : 'Viewer'}
        </span>
      </div>
      <select
        value={role}
        onChange={(e) => switchRole(e.target.value)}
        className="px-4 py-2 bg-white/20 text-black border border-white/30 rounded-xl focus:ring-2 focus:ring-blue-500"
      >
        <option value="viewer">👁️ Viewer</option>
        <option value="admin">🛠️ Admin</option>
      </select>
    </div>
  );
};

export default RoleSwitcher;