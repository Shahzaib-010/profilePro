import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Signup() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData((current) => ({
      ...current,
      [name]: value,
    }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(
        "https://profile-pro-api.chfarhanliaqat.site/api/register",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            name: formData.fullName, // Ensure keys match what your API expects
            email: formData.email,
            password: formData.password,
          }),
        },
      );

      const data = await response.json();

      if (!response.ok) {
        // If API returns a 400 or 500 error, throw it to the catch block
        throw new Error(
          data.message || "Something went wrong. Please try again.",
        );
      }

      // Success!
      console.log("Registration Successful:", data);

      // Redirect to sign-in page after short delay or immediately
      navigate("/get-started");
    } catch (err) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="h-screen overflow-hidden bg-auth-shell text-app-fg">
      <section className="grid h-full w-full overflow-hidden bg-auth-card lg:grid-cols-[0.74fr_1.06fr]">
        <div
          className="relative hidden h-full overflow-hidden lg:flex"
          style={{
            backgroundImage:
              "var(--auth-brand-overlay), var(--auth-brand-panel)",
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.3))]" />
          <div className="relative z-10 flex w-full flex-col items-center justify-end px-12 pb-14 text-center text-white xl:px-16 xl:pb-16">
            <h1 className="max-w-[360px] text-[38px] font-semibold leading-[1.1] tracking-[-0.04em] xl:text-[42px]">
              One Platform to Streamline All Product Analytics
            </h1>
            <p className="mt-5 max-w-[380px] text-sm leading-7 text-white/60">
              Your revenue are set to grow by 20% next month. Your revenue
              increase by next month with our campaign tools.
            </p>
          </div>
        </div>

        <div className="flex h-full min-h-0 flex-col bg-auth-card">
          <div className="flex items-center justify-between px-5 pt-5 sm:px-7 sm:pt-6 md:px-8">
            <Link
              to="/"
              className="flex h-10 w-10 items-center justify-center rounded-full border border-auth-line bg-auth-card-strong shadow-[0_8px_24px_rgba(0,0,0,0.08)]"
            >
              <span className="geist text-sm font-semibold text-app-fg">
                PP
              </span>
            </Link>

            <p className="text-xs font-medium text-auth-muted sm:text-[13px]">
              Already have an account?{" "}
              <Link
                to="/get-started"
                className="font-semibold text-app-fg underline underline-offset-2"
              >
                Sign In
              </Link>
            </p>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-8 sm:px-7 md:px-10 lg:px-12 xl:px-16">
            <div className="w-full max-w-[360px]">
              <div className="text-center">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-app-fg sm:text-[26px]">
                  Create your ProfilePro account
                </h2>
                <p className="mt-2 text-[13px] text-auth-muted sm:text-sm">
                  Enter your details below to register a new account
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div className="text-center">
                 
                  {/* Error Alert */}
                  {error && (
                    <p className="mt-4 rounded-lg bg-red-500/10 p-3 text-xs font-medium text-red-500">
                      {error}
                    </p>
                  )}
                </div>
                <div>
                  <label
                    htmlFor="fullName"
                    className="mb-2 block text-[13px] font-medium text-app-fg"
                  >
                    Full Name
                  </label>
                  <input
                    id="fullName"
                    name="fullName"
                    type="text"
                    value={formData.fullName}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="h-[50px] w-full rounded-[14px] border border-auth-line bg-auth-card-strong px-4 text-sm text-app-fg outline-none transition placeholder:text-auth-muted focus:border-app-highlight focus:ring-4 focus:ring-app-highlight/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-medium text-app-fg"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    name="email"
                    type="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="farhan@mail.com"
                    className="h-[50px] w-full rounded-[14px] border border-auth-line bg-auth-card-strong px-4 text-sm text-app-fg outline-none transition placeholder:text-auth-muted focus:border-app-highlight focus:ring-4 focus:ring-app-highlight/15"
                  />
                </div>

                <div>
                  <label
                    htmlFor="password"
                    className="mb-2 block text-[13px] font-medium text-app-fg"
                  >
                    Password
                  </label>
                  <div className="relative">
                    <input
                      id="password"
                      name="password"
                      type="password"
                      value={formData.password}
                      onChange={handleChange}
                      placeholder="minimum 8 character"
                      className="h-[50px] w-full rounded-[14px] border border-auth-line bg-auth-card-strong px-4 pr-11 text-sm text-app-fg outline-none transition placeholder:text-auth-muted focus:border-app-highlight focus:ring-4 focus:ring-app-highlight/15"
                    />
                    <span className="pointer-events-none absolute inset-y-0 right-4 flex items-center text-auth-muted">
                      <EyeIcon />
                    </span>
                  </div>
                </div>

                <button
  type="submit"
  disabled={isLoading}
  className={`mt-1 flex h-[50px] w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ffd54d_0%,#ffb512_100%)] text-sm font-semibold text-[#161616] shadow-[0_10px_24px_rgba(251,191,36,0.35)] transition ${
    isLoading ? 'opacity-70 cursor-not-allowed' : 'hover:brightness-[0.98]'
  }`}
>
  {isLoading ? (
    <span className="flex items-center gap-2">
      Creating Account...
    </span>
  ) : (
    <>Register <span className="ml-2">-&gt;</span></>
  )}
</button>
              </form>
            </div>
          </div>

          <div className="flex items-center justify-between px-5 pb-5 text-xs text-auth-muted sm:px-7 sm:pb-6 md:px-8">
            <span>(c) 2026 ProfilePro</span>
            <div className="flex items-center gap-5">
              <a href="#" className="hover:text-app-fg">
                Privacy Policy
              </a>
              <a href="#" className="hover:text-app-fg">
                Support
              </a>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function EyeIcon() {
  return (
    <svg
      width="18"
      height="18"
      viewBox="0 0 24 24"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1.75 12s3.73-6.25 10.25-6.25S22.25 12 22.25 12s-3.73 6.25-10.25 6.25S1.75 12 1.75 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle
        cx="12"
        cy="12"
        r="3.25"
        stroke="currentColor"
        strokeWidth="1.5"
      />
    </svg>
  );
}

export default Signup;
