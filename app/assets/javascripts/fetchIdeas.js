function fetchIdeas() {
  var newestIdea = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    success: function(ideas) {
      var sortedIdeas = ideas.sort(function(a, b) {
        return new Date(a.created_at) - new Date(b.created_at);
      });
      $.each(sortedIdeas, function(index, idea) {
        if (isNaN(newestIdea) || idea.id > newestIdea) {
          renderIdea(idea)
        }
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}
