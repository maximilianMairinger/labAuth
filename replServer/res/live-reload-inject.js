let stream = new EventSource(url);


stream.addEventListener("message", function (event) {
  console.log("event.data", event.data)
  if (JSON.parse(event.data) === "reloadPlease") location.reload()
})
