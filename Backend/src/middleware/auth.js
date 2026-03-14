const verifyAdminToken = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'] || req.body.adminToken;

  if (!adminToken) {
    return res.status(401).json({ message: 'Admin token is required' });
  }

  if (adminToken !== process.env.ADMIN_SECRET_TOKEN) {
    return res.status(403).json({ message: 'Invalid admin token' });
  }

  req.user = { role: 'admin' };
  next();
};

const verifyUserRole = (req, res, next) => {
  const adminToken = req.headers['x-admin-token'] || req.body.adminToken;

  if (adminToken === process.env.ADMIN_SECRET_TOKEN) {
    req.user = { role: 'admin' };
  } else {
    req.user = { role: 'user' };
  }

  next();
};

module.exports = {
  verifyAdminToken,
  verifyUserRole
};
