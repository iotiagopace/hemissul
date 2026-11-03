export function getVisibleHeroSlides(slides, now) {
  const available = slides.filter(
    (slide) =>
      slide.enabled !== false &&
      (!slide.expiresAt || now < new Date(slide.expiresAt).getTime()),
  )
  const exclusive = available.find((slide) => slide.exclusive === true)

  return exclusive ? [exclusive] : available
}
