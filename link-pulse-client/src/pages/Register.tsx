import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { registerUser, getApiErrorMessage } from '../services/api';
import { registerSchema } from '../schemas/authSchema';
import { Eye, EyeOff } from 'lucide-react';

export default function Register() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  // Helper to calculate password strength score (0 to 3)
  const getPasswordStrength = (pass: string) => {
    if (!pass) return 0;
    let score = 0;
    if (pass.length >= 8) score++; // Weak: 8+ characters
    if (/[A-Z]/.test(pass)) score++; // Medium: Has uppercase letter
    if (/[^A-Za-z0-9]/.test(pass)) score++; // Strong: Has special character
    return score;
  };

  const strength = getPasswordStrength(password);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setSuccess(null);
    setFieldErrors({});

    // Validate inputs with Zod
    const validationResult = registerSchema.safeParse({ email, password });
    if (!validationResult.success) {
      const formattedErrors = validationResult.error.format();
      setFieldErrors({
        email: formattedErrors.email?._errors[0],
        password: formattedErrors.password?._errors[0],
      });
      return;
    }

    setLoading(true);

    try {
      const res = await registerUser({ email, password });
      setSuccess(res.message || 'Account created! Redirecting to sign in...');

      // Redirect to login after 1.5s with state flag
      setTimeout(() => {
        navigate('/login', { state: { registered: true } });
      }, 1500);
    } catch (err) {
      setError(getApiErrorMessage(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-1/4 -left-20 w-80 h-80 bg-blue-600/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 -right-20 w-80 h-80 bg-amber-400/20 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-md w-full bg-slate-900/80 backdrop-blur-md rounded-2xl border border-slate-800 p-8 shadow-2xl relative z-10">

        {/* Header Badge */}
        <div className="flex flex-col items-center mb-6">
          <span className="mb-3 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
            Create New Account
          </span>
          <h2 className="text-3xl font-extrabold text-white tracking-tight">
            Join LinkPulse
          </h2>
          <p className="text-xs text-slate-400 mt-1">
            Get started by setting up your credentials
          </p>
        </div>

        {/* Global API Error Banner */}
        {error && (
          <div className="mb-6 p-3.5 bg-rose-500/10 border border-rose-500/30 text-rose-400 text-sm rounded-xl flex items-center space-x-2">
            <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span>{error}</span>
          </div>
        )}

        {/* Success Banner */}
        {success && (
          <div className="mb-6 p-4 bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 rounded-xl text-sm flex items-start space-x-3">
            <svg className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <div>
              <p className="font-bold text-emerald-300">Success!</p>
              <p className="text-xs text-emerald-400/90 mt-0.5">{success}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Email Input */}
          <div>
            <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-2">
              Email Address
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={`w-full px-4 py-3 bg-slate-800/80 border ${fieldErrors.email ? 'border-rose-500' : 'border-slate-700/80'
                } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
              placeholder="you@domain.com"
            />
            {fieldErrors.email && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.email}</p>
            )}
          </div>

          {/* Password Input with Visibility Toggle */}
          <div>
            <div className="flex items-center justify-between mb-2">
              <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider">
                Password
              </label>
              <span className="text-[11px] text-slate-400">Min 8 chars, 1 uppercase & 1 symbol</span>
            </div>

            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className={`w-full pl-4 pr-11 py-3 bg-slate-800/80 border ${fieldErrors.password ? 'border-rose-500' : 'border-slate-700/80'
                  } rounded-xl text-white text-sm placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition`}
                placeholder="e.g. Secret123!"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white transition"
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>

            {fieldErrors.password && (
              <p className="text-xs text-rose-400 mt-1">{fieldErrors.password}</p>
            )}

            {/* Strength Indicator & Criteria */}
            {password.length > 0 && (
              <div className="mt-3 bg-slate-950/40 p-2.5 rounded-lg border border-slate-800/80">
                <div className="flex gap-1.5 h-1.5 w-full bg-slate-800 rounded-full overflow-hidden mb-2">
                  <div
                    className={`h-full flex-1 transition-all duration-300 ${strength >= 1 ? 'bg-rose-500' : 'bg-transparent'
                      }`}
                  />
                  <div
                    className={`h-full flex-1 transition-all duration-300 ${strength >= 2 ? 'bg-amber-400' : 'bg-transparent'
                      }`}
                  />
                  <div
                    className={`h-full flex-1 transition-all duration-300 ${strength >= 3 ? 'bg-emerald-500' : 'bg-transparent'
                      }`}
                  />
                </div>

                <div className="flex items-center justify-between text-[11px]">
                  <span className="text-slate-400">
                    Strength:{' '}
                    <strong
                      className={
                        strength === 1
                          ? 'text-rose-400'
                          : strength === 2
                            ? 'text-amber-400'
                            : 'text-emerald-400'
                      }
                    >
                      {strength === 1 ? 'Weak' : strength === 2 ? 'Medium' : 'Strong'}
                    </strong>
                  </span>

                  <div className="flex gap-2 text-[10px] text-slate-400">
                    <span className={strength >= 1 ? 'text-rose-400 font-medium' : 'text-slate-500'}>
                      ● 8+ Chars
                    </span>
                    <span className={strength >= 2 ? 'text-amber-400 font-medium' : 'text-slate-500'}>
                      ● 1 Uppercase
                    </span>
                    <span className={strength >= 3 ? 'text-emerald-400 font-medium' : 'text-slate-500'}>
                      ● 1 Symbol
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3.5 bg-gradient-to-r from-blue-600 to-amber-500 hover:from-blue-500 hover:to-amber-400 text-white font-bold rounded-xl text-sm shadow-lg shadow-blue-600/25 transition duration-200 disabled:opacity-50 active:scale-[0.99]"
          >
            {loading ? 'Creating Account...' : 'Register Account'}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-slate-800 text-center text-xs text-slate-400">
          Already registered?{' '}
          <Link to="/login" className="text-amber-400 font-bold hover:text-amber-300 hover:underline transition">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}