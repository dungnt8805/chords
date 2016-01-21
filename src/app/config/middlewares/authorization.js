/*
 *  Generic require login routing middleware
 */

exports.requiresLogin = (req, res, next)=> {
  if (req.isAuthenticated()) return next();
  if (req.method == 'GET') req.session.returnTo = req.originalUrl;

  res.redirect('/login')
}