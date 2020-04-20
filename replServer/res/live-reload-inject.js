let stream = new EventSource(url);


stream.addEventListener("message", (event) => {
  if (JSON.parse(event.data) === "reloadPlease") location.reload()
})

stream.addEventListener("error", location.reload.bind(location))

