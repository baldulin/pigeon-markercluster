export const getCrossProduct = ([ax, ay], [bx, by], [cx, cy]) =>
  (bx - ax) * (cy - ay) - (by - ay) * (cx - ax)

export const calculateHull = (points) => {
  let arr = Object.values(
    points.reduce((a, p) => ({ ...a, [`${p[0]}-${p[1]}`]: p }), {})
  )
  arr.sort(([ax, ay], [bx, by]) => (ay !== by ? by - ay : bx - ax))

  if (arr.length === 0) {
    return []
  }

  const [px, py] = arr[0]
  const s = px * px + py * py
  // using real dot product (might be faster using slopes)
  const angle = ([x, y]) => {
    const dx = x - px
    const dy = y - py
    return Math.acos(dx / Math.sqrt(dx * dx + dy * dy))
  }

  arr.sort((a, b) => {
    const aa = angle(a)
    const ab = angle(b)

    if (aa === ab) {
      const [ax, ay] = aa
      const [bx, by] = ab
      const la = (ax - px) * (ax - px) + (ay - py) * (ay - py)
      const lb = (bx - px) * (bx - px) + (by - py) * (by - py)
      return lb - la
    }
    return ab - aa
  })

  let stack = []

  arr.forEach((point) => {
    while (
      stack.length > 1 &&
      getCrossProduct(
        stack[stack.length - 2],
        stack[stack.length - 1],
        point
      ) <= 0
    ) {
      stack.pop()
    }
    stack.push(point)
  })
  return stack
}
