function deleteIdea() {
  $("#ideas-index").delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest(".idea")
    debugger
    $.ajax({
      type: "DELETE",
      url: "/api/v1/ideas/"+ $idea.attr('data-id'),
      success: function() {
        $idea.remove()
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
