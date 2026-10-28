import { useState, type FormEvent } from 'react';
import { KeyRound, Save, X } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { getApiErrorMessage, updateAccount } from '../../services/api';

interface AccountSettingsProps {
  onClose: () => void;
}

export default function AccountSettings({ onClose }: AccountSettingsProps) {
  const { login, token } = useAuth();
  const [email, setEmail] = useState(() => getEmailFromToken(token));
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSave = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setSuccess(null);

    if (newPassword && newPassword !== confirmPassword) {
      setError('The new passwords do not match.');
      return;
    }

    if (newPassword.length > 0 &&
      (newPassword.length < 8 || !/[A-Z]/.test(newPassword) || !/[^A-Za-z0-9]/.test(newPassword))) {
      setError('New password must be at least 8 characters and include an uppercase letter and a special character.');
      return;
    }

    setSaving(true);
    try {
      const result = await updateAccount({
        email: email.trim(),
        currentPassword,
        ...(newPassword ? { newPassword } : {}),
      });
      login(result.token);
      setEmail(result.email);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setSuccess('Your account settings have been saved.');
    } catch (requestError: unknown) {
      setError(getApiErrorMessage(requestError));
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-stone-950/40 p-4 backdrop-blur-sm">
      <section
        role="dialog"
        aria-modal="true"
        aria-labelledby="account-settings-title"
        className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl border border-stone-200/80 bg-white p-5 shadow-2xl shadow-stone-950/20 sm:p-7"
      >
        <div className="mb-6 flex items-start justify-between border-b border-stone-100 pb-4">
          <div>
            <span className="mb-2 inline-flex h-9 w-9 items-center justify-center rounded-xl bg-stone-100 text-stone-700">
              <KeyRound className="h-4 w-4" />
            </span>
            <h2 id="account-settings-title" className="text-lg font-bold tracking-tight text-stone-900">
              Account settings
            </h2>
            <p className="mt-1 text-sm text-stone-500">Update your email or choose a new password.</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close account settings"
            className="rounded-lg p-2 text-stone-400 transition hover:bg-stone-100 hover:text-stone-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-stone-400/60"
          >
            <X className="h-4 w-4" />
          </button>
        </div>

        <form onSubmit={handleSave} className="space-y-5">
          <div>
            <label htmlFor="account-email" className="mb-1.5 block text-sm font-medium text-stone-700">
              Email address
            </label>
            <input
              id="account-email"
              type="email"
              autoComplete="email"
              required
              disabled={saving}
              value={email}
              onChange={(event) => setEmail(event.target.value)}
              className="w-full rounded-xl border border-stone-200 bg-white px-3.5 py-3 text-sm text-stone-900 outline-none transition placeholder:text-stone-400 focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 disabled:bg-stone-50"
            />
          </div>

          <div className="rounded-xl border border-stone-200/80 bg-stone-50/70 p-4">
            <h3 className="text-sm font-semibold text-stone-800">Change password</h3>
            <p className="mt-1 text-xs leading-relaxed text-stone-500">
              Your existing password is protected and can’t be displayed. Enter it below to authorize changes.
            </p>
            <div className="mt-4 space-y-3">
              <div>
                <label htmlFor="current-password" className="mb-1.5 block text-xs font-medium text-stone-600">
                  Current password
                </label>
                <input
                  id="current-password"
                  type="password"
                  autoComplete="current-password"
                  required
                  disabled={saving}
                  value={currentPassword}
                  onChange={(event) => setCurrentPassword(event.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 disabled:bg-stone-100"
                />
              </div>
              <div>
                <label htmlFor="new-password" className="mb-1.5 block text-xs font-medium text-stone-600">
                  New password <span className="font-normal text-stone-400">(optional)</span>
                </label>
                <input
                  id="new-password"
                  type="password"
                  autoComplete="new-password"
                  disabled={saving}
                  value={newPassword}
                  onChange={(event) => setNewPassword(event.target.value)}
                  className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 disabled:bg-stone-100"
                />
                <p className="mt-1.5 text-[11px] text-stone-500">
                  At least 8 characters, including an uppercase letter and a special character.
                </p>
              </div>
              {newPassword && (
                <div>
                  <label htmlFor="confirm-password" className="mb-1.5 block text-xs font-medium text-stone-600">
                    Confirm new password
                  </label>
                  <input
                    id="confirm-password"
                    type="password"
                    autoComplete="new-password"
                    required
                    disabled={saving}
                    value={confirmPassword}
                    onChange={(event) => setConfirmPassword(event.target.value)}
                    className="w-full rounded-lg border border-stone-200 bg-white px-3 py-2.5 text-sm text-stone-900 outline-none transition focus:border-blue-400 focus:ring-2 focus:ring-blue-500/15 disabled:bg-stone-100"
                  />
                </div>
              )}
            </div>
          </div>

          {error && <p role="alert" className="rounded-lg bg-red-50 px-3 py-2.5 text-sm text-red-700">{error}</p>}
          {success && <p role="status" className="rounded-lg bg-emerald-50 px-3 py-2.5 text-sm text-emerald-700">{success}</p>}

          <div className="flex flex-col-reverse gap-2 border-t border-stone-100 pt-4 sm:flex-row sm:justify-end">
            <button
              type="button"
              onClick={onClose}
              disabled={saving}
              className="rounded-xl px-4 py-2.5 text-sm font-medium text-stone-600 transition hover:bg-stone-100 disabled:opacity-50"
            >
              Close
            </button>
            <button
              type="submit"
              disabled={saving}
              className="inline-flex items-center justify-center gap-2 rounded-xl bg-stone-900 px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-stone-700 disabled:cursor-wait disabled:opacity-50"
            >
              <Save className="h-4 w-4" />
              {saving ? 'Saving...' : 'Save changes'}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}

function getEmailFromToken(token: string | null): string {
  if (!token) return '';

  try {
    const payloadSegment = token.split('.')[1];
    if (!payloadSegment) return '';

    const base64Payload = payloadSegment
      .replace(/-/g, '+')
      .replace(/_/g, '/')
      .padEnd(Math.ceil(payloadSegment.length / 4) * 4, '=');
    const payload = JSON.parse(
      new TextDecoder().decode(Uint8Array.from(atob(base64Payload), (character) => character.charCodeAt(0))),
    ) as Record<string, unknown>;
    const claim = payload.email ??
      payload['http://schemas.xmlsoap.org/ws/2005/05/identity/claims/emailaddress'];

    return typeof claim === 'string' ? claim : '';
  } catch {
    return '';
  }
}
