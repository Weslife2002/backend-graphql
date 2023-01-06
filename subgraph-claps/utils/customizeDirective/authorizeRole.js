function authorizeRole(currentRole, requiredRole) {
  const roles = ['User', 'Admin'];
  const roleIndex = roles.findIndex(role => currentRole === role);
  const requiredRoleIndex = roles.findIndex(role => requiredRole === role);
  return roleIndex >= requiredRoleIndex;
}

module.exports = authorizeRole;
