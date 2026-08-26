import * as authService from "../services/authService.js";

export async function register(req, res) {
  const user = await authService.register(req.body);
  res.status(201).json({ data: user });
}

export async function login(req, res) {
  const result = await authService.login(req.body);
  res.status(200).json({ data: result });
}

export async function me(req, res) {
  const user = await authService.getCurrentUser(req.user.id);
  res.status(200).json({ data: user });
}
