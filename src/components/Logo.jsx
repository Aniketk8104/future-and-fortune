import { useState } from 'react'

export default function Logo({ className = '' }) {
  const [failed, setFailed] = useState(false)

  if (failed) {
    return (
      <div className={`w-8 h-8 bg-gradient-to-br from-primary-500 to-secondary-500 rounded-lg flex items-center justify-center ${className}`} aria-hidden="true">
        <span className="text-white font-black text-sm">F&F</span>
      </div>
    )
  }

  return (
    <img
      src="/brand-logo.svg"
      alt="Future & Fortune Solutions"
      className={`h-8 sm:h-9 w-auto object-contain ${className}`}
      loading="eager"
      decoding="async"
      fetchPriority="high"
      width={152}
      height={32}
      onError={() => setFailed(true)}
    />
  )
}
