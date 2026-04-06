import { NavLink } from 'react-router-dom'

const navLinks = [
  { label: 'Home', to: '/' },
  { label: 'Features', to: '/features' },
  { label: 'Pricing', to: '/pricing' },
  { label: 'Contact', to: '/contact' },
]

function Navbar() {
  const linkClassName = ({ isActive }) =>
    `px-3 py-2 text-sm font-medium transition-colors ${
      isActive ? 'text-app-fg' : 'text-app-muted hover:text-app-fg'
    }`

  return (
    <nav className="flex h-[5rem] justify-center   ">
      <div className="flex w-[90%]  gap-4 py-1 sm:py-5 items-center justify-between">
        <NavLink to="/" className="geist text-2xl font-semibold text-app-fg sm:text-2xl">
          Profile<span className='font-bold text-amber-500'>PRO</span>
        </NavLink>

        <div className="flex geist flex-wrap items-center justify-start gap-4 sm:gap-5 md:justify-center">
          {navLinks.map((link) => (
            <NavLink key={link.to} to={link.to} className={linkClassName}>
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="flex justify-start md:justify-end">
          <NavLink
            to="/get-started"
            className="inline-flex items-center justify-center rounded-full bg-app-highlight px-5 py-2.5 text-sm font-semibold text-app-highlight-fg transition-opacity hover:opacity-90"
          >
            Get Started
          </NavLink>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
