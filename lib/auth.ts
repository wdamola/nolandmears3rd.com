import { cookies } from "next/headers"
import { SignJWT, jwtVerify } from "jose"
import { timingSafeEqual } from "crypto"

export const ADMIN_COOKIE = "noland_admin_session"

function getSessionSecret() {
  const secret = process.env.ADMIN_SESSION_SECRET

  if (!secret) {
    throw new Error("ADMIN_SESSION_SECRET is not configured")
  }

  return new TextEncoder().encode(secret)
}

export function getAdminPassword() {
  return process.env.ADMIN_PASSWORD ?? ""
}

export function verifyAdminPassword(input: string) {
  const expected = getAdminPassword()

  if (!expected) {
    return false
  }

  const inputBuffer = Buffer.from(input)
  const expectedBuffer = Buffer.from(expected)

  if (inputBuffer.length !== expectedBuffer.length) {
    return false
  }

  return timingSafeEqual(inputBuffer, expectedBuffer)
}

export async function createAdminSession() {
  return new SignJWT({ role: "admin" })
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("7d")
    .sign(getSessionSecret())
}

export async function verifyAdminSession(token?: string) {
  if (!token) {
    return false
  }

  try {
    await jwtVerify(token, getSessionSecret())
    return true
  } catch {
    return false
  }
}

export async function getAdminSessionToken() {
  const cookieStore = await cookies()
  return cookieStore.get(ADMIN_COOKIE)?.value
}

export async function isAdminAuthenticated() {
  const token = await getAdminSessionToken()
  return verifyAdminSession(token)
}

export async function requireAdmin() {
  const authenticated = await isAdminAuthenticated()

  if (!authenticated) {
    throw new Error("Unauthorized")
  }
}
