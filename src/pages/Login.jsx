import { Link } from 'react-router-dom'

const socialButtons = [
  {
    label: 'Continue with Google',
    icon: <GoogleIcon />,
  },
  {
    label: 'Continue with LinkedIn',
    icon: <LinkedInIcon />,
  },
  {
    label: 'Continue with GitHub',
    icon: <GitHubIcon />,
  },
]

function Login() {
  const handleSubmit = (event) => {
    event.preventDefault()
  }

  return (
    <main className="h-screen overflow-hidden bg-auth-shell text-app-fg">
      <section className="grid h-full w-full overflow-hidden bg-auth-card lg:grid-cols-[0.74fr_1.06fr]">
        <div
          className="relative hidden h-full overflow-hidden lg:flex"
          style={{
            backgroundImage:
              'var(--auth-brand-overlay), var(--auth-brand-panel)',
          }}
        >
          <div className="absolute inset-0 bg-[linear-gradient(180deg,transparent,rgba(0,0,0,0.3))]" />
          <div className="relative z-10 flex w-full flex-col items-center justify-end px-12 pb-14 text-center text-white xl:px-16 xl:pb-16">
            {/* <div className="mb-14 flex h-[5.5rem] w-[5.5rem] items-center justify-center rounded-[22px] border border-white/10 bg-white/8 shadow-[0_20px_50px_rgba(0,0,0,0.28)] backdrop-blur-sm">
              <div className="geist text-center text-xl font-semibold leading-none">
                <span className="block text-white">Profile</span>
                <span className="block text-app-highlight">Pro</span>
              </div>
            </div> */}

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
              <span className="geist text-sm font-semibold text-app-fg">PP</span>
            </Link>

            <p className="text-xs font-medium text-auth-muted sm:text-[13px]">
              Don&apos;t have an account?{' '}
              <Link
                to="/signup"
                className="font-semibold text-app-fg underline underline-offset-2"
              >
                Sign Up
              </Link>
            </p>
          </div>

          <div className="flex min-h-0 flex-1 items-center justify-center px-5 py-8 sm:px-7 md:px-10 lg:px-12 xl:px-16">
            <div className="w-full max-w-[360px]">
              <div className="text-center">
                <h2 className="text-[22px] font-semibold tracking-[-0.03em] text-app-fg sm:text-[26px]">
                  Welcome back to ProfilePro!
                </h2>
                <p className="mt-2 text-[13px] text-auth-muted sm:text-sm">
                  Please enter your details to sign in your account
                </p>
              </div>

              <form className="mt-8 space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="email"
                    className="mb-2 block text-[13px] font-medium text-app-fg"
                  >
                    Email
                  </label>
                  <input
                    id="email"
                    type="email"
                    placeholder="shahzaib@mail.com"
                    className="h-[50px] w-full rounded-[14px] border border-auth-line bg-auth-card-strong px-4 text-sm text-app-fg outline-none transition placeholder:text-auth-muted focus:border-app-highlight focus:ring-4 focus:ring-app-highlight/15"
                  />
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between gap-4">
                    <label
                      htmlFor="password"
                      className="block text-[13px] font-medium text-app-fg"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-[12px] font-medium text-app-fg underline underline-offset-2"
                    >
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      id="password"
                      type="password"
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
                  className="mt-1 flex h-[50px] w-full items-center justify-center rounded-[14px] bg-[linear-gradient(180deg,#ffd54d_0%,#ffb512_100%)] text-sm font-semibold text-[#161616] shadow-[0_10px_24px_rgba(251,191,36,0.35)] transition hover:brightness-[0.98]"
                >
                  Sign In <span className="ml-2">-&gt;</span>
                </button>
              </form>

              <div className="mt-6">
                <p className="text-center text-[12px] font-medium uppercase tracking-[0.22em] text-auth-muted">
                  Or continue with
                </p>
                <div className="mt-4 flex items-center justify-center gap-3">
                  {socialButtons.map((button) => (
                    <button
                      key={button.label}
                      type="button"
                      aria-label={button.label}
                      title={button.label}
                      className="flex h-11 w-11 items-center justify-center rounded-[14px] border border-auth-line bg-auth-card-strong text-app-fg transition hover:border-app-highlight/40 hover:bg-app-highlight-soft"
                    >
                      {button.icon}
                    </button>
                  ))}
                </div>
              </div>
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
  )
}

function GoogleIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#4285F4"
        d="M21.8 12.23c0-.72-.06-1.25-.2-1.8H12v3.4h5.64c-.11.84-.73 2.1-2.1 2.95l-.02.11 3.05 2.36.21.02c1.93-1.78 3.02-4.4 3.02-7.04Z"
      />
      <path
        fill="#34A853"
        d="M12 22c2.76 0 5.08-.9 6.78-2.44l-3.24-2.5c-.87.6-2.03 1.03-3.54 1.03-2.7 0-4.98-1.78-5.8-4.25l-.1.01-3.16 2.45-.04.1A10.25 10.25 0 0 0 12 22Z"
      />
      <path
        fill="#FBBC05"
        d="M6.2 13.84A6.17 6.17 0 0 1 5.86 12c0-.64.12-1.25.33-1.84l-.01-.12-3.2-2.49-.1.05A10 10 0 0 0 2 12c0 1.6.38 3.1 1.05 4.4l3.15-2.56Z"
      />
      <path
        fill="#EA4335"
        d="M12 5.91c1.9 0 3.18.82 3.91 1.5l2.85-2.78C17.07 3.04 14.76 2 12 2a10.25 10.25 0 0 0-9.1 5.6l3.3 2.56C7.01 7.7 9.29 5.91 12 5.91Z"
      />
    </svg>
  )
}

function LinkedInIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="#0A66C2"
        d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.95v5.66H9.35V9h3.42v1.56h.05c.47-.9 1.64-1.85 3.38-1.85 3.62 0 4.29 2.38 4.29 5.48v6.26ZM5.33 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.11 20.45H3.54V9h3.57v11.45Z"
      />
    </svg>
  )
}

function GitHubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" aria-hidden="true">
      <path
        fill="currentColor"
        d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.38 7.86 10.9.58.1.79-.25.79-.56v-2.17c-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.72-1.55-2.55-.29-5.24-1.28-5.24-5.7 0-1.26.45-2.3 1.19-3.11-.12-.29-.51-1.47.11-3.07 0 0 .97-.31 3.19 1.19a11.2 11.2 0 0 1 5.8 0c2.22-1.5 3.19-1.19 3.19-1.19.62 1.6.23 2.78.11 3.07.74.81 1.19 1.85 1.19 3.11 0 4.43-2.69 5.41-5.25 5.69.41.35.78 1.04.78 2.1v3.11c0 .31.21.67.8.56A11.52 11.52 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"
      />
    </svg>
  )
}

function EyeIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M1.75 12s3.73-6.25 10.25-6.25S22.25 12 22.25 12s-3.73 6.25-10.25 6.25S1.75 12 1.75 12Z"
        stroke="currentColor"
        strokeWidth="1.5"
      />
      <circle cx="12" cy="12" r="3.25" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  )
}

export default Login
