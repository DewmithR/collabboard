// TEMPORARY - remove once Dewmith's real authenticate middleware is merged
export function tempAuthStub(req, res, next) {
  req.user = { id: "u1" };
  next();
}