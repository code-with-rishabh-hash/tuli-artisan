// ═══════════════════════════════════════════════
// Tuli Artisan — Input Validation
// ═══════════════════════════════════════════════

export function validateEmail(email: string): string | null {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!re.test(email)) return "Please enter a valid email address";
  return null;
}

export function validatePassword(password: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number";
  return null;
}

export function validateName(name: string): string | null {
  if (name.trim().length < 2) return "Name must be at least 2 characters";
  if (name.trim().length > 100) return "Name must be less than 100 characters";
  return null;
}

export function validatePhone(phone: string): string | null {
  const re = /^[6-9]\d{9}$/;
  if (!re.test(phone.replace(/\s/g, ""))) return "Please enter a valid 10-digit Indian phone number";
  return null;
}

export function validatePincode(pincode: string): string | null {
  const re = /^\d{6}$/;
  if (!re.test(pincode)) return "Please enter a valid 6-digit pincode";
  return null;
}

export function sanitize(input: string): string {
  return input
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#x27;")
    .trim();
}
