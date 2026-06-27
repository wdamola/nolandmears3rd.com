const HEADER_OFFSET = 96

export function scrollToSection(id: string, behavior: ScrollBehavior = "smooth") {
  const element = document.getElementById(id.replace(/^#/, ""))

  if (!element) {
    return false
  }

  const top = element.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET
  window.scrollTo({ top: Math.max(0, top), behavior })
  return true
}

export function scrollToHash(hash: string, behavior: ScrollBehavior = "smooth") {
  if (!hash || hash === "#") {
    return false
  }

  return scrollToSection(hash.replace(/^#/, ""), behavior)
}
