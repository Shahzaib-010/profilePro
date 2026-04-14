import React from "react";
import { motion } from "framer-motion";
import { NavLink } from 'react-router-dom'

const LandingPage = () => {
  return (
    <div className="bg-white text-gray-900 font-sans">
      {/* NAVBAR */}
      <header className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b border-gray-100">
        <div className="max-w-7xl mx-auto flex items-center justify-between px-6 py-4">
          <h1 className="text-xl font-bold tracking-tight">ProfilePro</h1>

          <nav className="hidden md:flex gap-8 text-sm text-gray-600">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">About</a>
          </nav>

          <div className="flex items-center gap-4">
            <NavLink to="/signup"  className="text-sm text-gray-600 hidden md:block">
              Sign in
            </NavLink>
            <NavLink to="/get-started" className="bg-black text-white px-5 py-2 rounded-full text-sm font-medium hover:scale-105 transition">
              Get Started
            </NavLink>
          </div>
        </div>
      </header>

      {/* HERO */}
      <section className="pt-32 pb-24 px-6 relative overflow-hidden">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center">
          {/* TEXT */}
          <div>
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-5xl md:text-6xl font-bold tracking-tight leading-tight"
            >
              The Last Link You’ll Ever Send.
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="mt-6 text-lg text-gray-600 max-w-lg"
            >
              Turn your entire career into a single, structured link. No PDFs.
              No scattered portfolios. Just one clean, recruiter-ready profile.
            </motion.p>

            <div className="mt-8 flex gap-4">
              <button className="bg-black text-white px-6 py-3 rounded-full text-sm font-medium hover:scale-105 transition">
                Create Your Link
              </button>
              <button className="px-6 py-3 rounded-full text-sm border border-gray-300 hover:bg-gray-100 transition">
                View Example
              </button>
            </div>
          </div>

          {/* FLOATING CARD */}
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="relative"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ repeat: Infinity, duration: 4 }}
              className="bg-white shadow-2xl rounded-2xl p-6 w-full max-w-sm mx-auto border"
            >
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-full bg-gray-300" />
                <div>
                  <h3 className="font-semibold">Shahzaib</h3>
                  <p className="text-sm text-gray-500">
                    Frontend Developer
                  </p>
                </div>
              </div>

              <div className="mt-4 flex flex-wrap gap-2">
                {["React", "Tailwind", "Redux"].map((skill) => (
                  <span
                    key={skill}
                    className="text-xs bg-gray-100 px-2 py-1 rounded-full"
                  >
                    {skill}
                  </span>
                ))}
              </div>

              <div className="mt-6 flex gap-3">
                <button className="flex-1 bg-black text-white text-sm py-2 rounded-lg">
                  View Profile
                </button>
                <button className="flex-1 border text-sm py-2 rounded-lg">
                  Contact
                </button>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* GRADIENT */}
        <div className="absolute bottom-0 left-0 w-full h-64 bg-gradient-to-r from-blue-200 via-purple-200 to-pink-200 blur-3xl opacity-40" />
      </section>

      {/* PROBLEM SECTION */}
      <section className="py-24 px-6 bg-gray-50">
        <div className="max-w-6xl mx-auto text-center">
          <h2 className="text-3xl font-bold tracking-tight">
            Everything recruiters hate — fixed.
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-10">
            {[
              {
                title: "Stop sending static resumes.",
                desc: "Your PDF can’t adapt, track, or stand out. It gets opened, skimmed, forgotten.",
              },
              {
                title: "Know when you’re being viewed.",
                desc: "Track profile opens and engagement in real-time. No more guessing.",
              },
              {
                title: "Update once. Everywhere.",
                desc: "Change your experience anytime — your link always shows the latest version.",
              },
            ].map((item, i) => (
              <div
                key={i}
                className="p-6 bg-white rounded-xl border hover:-translate-y-2 transition"
              >
                <h3 className="font-semibold text-lg">{item.title}</h3>
                <p className="mt-3 text-gray-600 text-sm">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <section className="py-24 px-6">
        <div className="max-w-5xl mx-auto text-center">
          <h2 className="text-3xl font-bold">
            From scattered links to one clean identity.
          </h2>

          <div className="mt-16 grid md:grid-cols-3 gap-8 text-left">
            {[
              "Build your profile",
              "Get your Career Link",
              "Send it anywhere",
            ].map((step, i) => (
              <div key={i}>
                <span className="text-sm text-gray-400">0{i + 1}</span>
                <h3 className="mt-2 font-semibold">{step}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* TRUST */}
      <section className="py-16 px-6 bg-gray-50 text-center">
        <p className="text-sm text-gray-500 mb-6">
          Used by candidates hired at
        </p>
        <div className="flex justify-center gap-10 opacity-50 text-sm">
          <span>Stripe</span>
          <span>Notion</span>
          <span>Vercel</span>
          <span>Shopify</span>
          <span>Linear</span>
        </div>
      </section>

      {/* FINAL CTA */}
      <section className="py-24 px-6 text-center bg-black text-white">
        <h2 className="text-4xl font-bold">
          One link. That’s all they need.
        </h2>
        <p className="mt-4 text-gray-300">
          Make your first impression structured, modern, and impossible to ignore.
        </p>

        <button className="mt-8 bg-white text-black px-6 py-3 rounded-full font-medium hover:scale-105 transition">
          Create Your Link
        </button>
      </section>

      {/* FOOTER */}
      <footer className="py-10 px-6 border-t text-sm text-gray-500">
        <div className="max-w-7xl mx-auto flex justify-between">
          <span>© 2026 ProfilePro</span>
          <div className="flex gap-6">
            <a href="#">Features</a>
            <a href="#">Pricing</a>
            <a href="#">Privacy</a>
            <a href="#">Terms</a>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

