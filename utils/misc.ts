export function focusOnInput(ev: MouseEvent) {
  if (!(ev.currentTarget instanceof HTMLElement)) return
  ev.preventDefault()
  ev.currentTarget.querySelector('input')?.focus()
}