function editIdeaTitle() {
  $("#ideas-index").delegate('.idea-title', 'keypress', function(event) {
    if (event.which === 13) {
      event.preventDefault()
      this.blur()
      var idea = $(this).closest(".idea")
      var data = { title: this.textContent }

      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: data,
        success: function(idea) {
          console.log("Success")
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    }
  })
}

function editIdeaBody() {
  $("#ideas-index").delegate('.idea-body', 'keypress', function(event) {
    if (event.which === 13) {
      event.preventDefault()
      this.blur()
      var idea = $(this).closest(".idea")
      var data = { body: this.textContent }

      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: data,
        success: function(idea) {
          console.log("Success")
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    }
  })
}
