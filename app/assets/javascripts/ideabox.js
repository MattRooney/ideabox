$(document).ready(function() {
  fetchIdeas()
  createIdea()
})

function fetchIdeas() {
  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        $("#ideas-index").append(
          "<div class='idea' data-id='"
          + idea.id
          + "'><p>Published on "
          + idea.created_at
          + "</p><h6>Title: "
          + idea.title
          + "</h6><p>Description: "
          + idea.body
          + "</p><p>Quality: "
          + idea.quality
          + "</p>"
          + "<button id='delete-idea' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
          + "<button id='edit-idea' name='button-fetch' class='btn btn-default btn-xs'>Edit</button>"
          + "</div>"
        )
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}

function createIdea() {
  $("#create-idea").on("click", function() {
    var title = $('#idea-title').val()
    var body = $('#idea-description').val()

    $.ajax({
      type: "POST",
      url: "/api/v1/ideas?title="+title+"&body="+body,
      success: function(newIdea){
        $('#ideas-index').append(
          "<div class='idea' data-id='"
          + newIdea.id
          + "'><p>Published on "
          + newIdea.created_at
          + "</p><h6>Title: "
          + newIdea.title
          + "</h6><p>Description: "
          + newIdea.body
          + "</p><p>Quality: "
          + newIdea.quality
          + "</p>"
          + "<button id='delete-post' name='button-fetch' class='btn btn-default btn-xs'>Delete</button>"
          + "<button id='edit-post' name='button-fetch' class='btn btn-default btn-xs'>Edit</button>"
          + "</div>"
        )
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
