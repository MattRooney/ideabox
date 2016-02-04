function truncateIdeaBody(string) {
  if (string.length > 100) {
    return $.trim(string)
            .substring(0, 100)
            .split(" ")
            .slice(0, -1)
            .join(" ") + "..."
  } else {
    return string
  }
}
