// pages/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  LogIn,
  Film,
  AlertCircle,
} from "lucide-react";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!/\S+@\S+\.\S+/.test(formData.email)) {
      setError("Please enter a valid email address");
      return false;
    }
    if (!formData.password) {
      setError("Password is required");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsLoading(true);
    // Simulate API call
    setTimeout(() => {
      // Mock authentication - accept any email with valid format and password length >= 6
      // For demo, we'll also check a specific test account
      const isTestAccount =
        formData.email === "test@example.com" &&
        formData.password === "password123";
      const isValid =
        isTestAccount || (formData.email && formData.password.length >= 6);

      if (isValid) {
        // Store mock auth data
        localStorage.setItem("auth_token", "mock_jwt_token_" + Date.now());
        localStorage.setItem("user_email", formData.email);
        localStorage.setItem("is_authenticated", "true");
        navigate("/movies");
      } else {
        setError(
          "Invalid email or password. Try test@example.com / password123",
        );
      }
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="min-h-screen bg-[#252527] dark:bg-[#0f1418] flex items-center justify-center pt-16 md:pt-20 px-4">
      <title>Login</title>
      <div className="w-full max-w-md">
        {/* Logo/Brand */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#18E3B4]/10 border border-[#18E3B4]/30 mb-4">
            <Film size={32} className="text-[#18E3B4]" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">
            Welcome Back
          </h2>
          <p className="text-white/50 mt-2">
            Sign in to continue to your account
          </p>
        </div>

        {/* Login Card */}
        <div className="bg-[#252527]/80 dark:bg-[#0f1418]/80 backdrop-blur-xl rounded-2xl border border-white/10 p-6 md:p-8">
          {error && (
            <div className="mb-6 p-3 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center gap-2 text-red-400 text-sm">
              <AlertCircle size={16} />
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            {/* Email Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Email Address
              </label>
              <div className="relative">
                <Mail
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your@email.com"
                  className="w-full pl-10 pr-4 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#18E3B4] transition-all"
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-white/70 text-sm font-medium mb-2">
                Password
              </label>
              <div className="relative">
                <Lock
                  className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
                  size={18}
                />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="••••••••"
                  className="w-full pl-10 pr-12 py-3 bg-white/5 border border-white/20 rounded-xl text-white placeholder-white/40 focus:outline-none focus:border-[#18E3B4] transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/70 transition-colors"
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            {/* Forgot Password Link */}
            <div className="text-right">
              <button
                type="button"
                className="text-sm text-[#18E3B4] hover:text-[#18E3B4]/80 transition-colors"
                onClick={() => alert("Password reset feature coming soon!")}
              >
                Forgot password?
              </button>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-[#18E3B4] hover:bg-[#18E3B4]/80 text-white font-semibold py-3 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 transform hover:scale-[1.02] shadow-lg hover:shadow-[#18E3B4]/25 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <LogIn size={18} />
                  Sign In
                </>
              )}
            </button>
          </form>

          {/* Divider */}
          <div className="relative my-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-white/10"></div>
            </div>
            <div className="relative flex justify-center text-xs">
              <span className="px-2 bg-[#252527]/80 dark:bg-[#0f1418]/80 text-white/40">
                Demo Account
              </span>
            </div>
          </div>

          {/* Demo Credentials */}
          <div className="bg-white/5 rounded-xl p-3 mb-6">
            <p className="text-white/50 text-xs text-center mb-2">
              Test credentials:
            </p>
            <div className="flex justify-center gap-4 text-xs">
              <div>
                <span className="text-white/40">Email:</span>
                <span className="text-white/80 ml-1">test@example.com</span>
              </div>
              <div>
                <span className="text-white/40">Password:</span>
                <span className="text-white/80 ml-1">password123</span>
              </div>
            </div>
          </div>

          {/* Sign Up Link */}
          <p className="text-center text-white/50 text-sm">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-[#18E3B4] hover:text-[#18E3B4]/80 font-medium transition-colors"
            >
              Create Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
