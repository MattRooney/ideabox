function createIdea() {
  $("#create-idea").on("click", function() {
    var title = $('#idea-title').val()
    var body = $('#idea-description').val()
    $.ajax({
      type: "POST",
      url: "/api/v1/ideas?title="+title+"&body="+body,
      success: function(newIdea){
        renderIdea(newIdea)
        $("#idea-title").val("");
        $("#idea-description").val("");
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
