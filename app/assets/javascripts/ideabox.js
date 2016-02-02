$(document).ready(function() {
  fetchIdeas()
  createIdea()
  deleteIdea()
  editIdea()
})

function fetchIdeas() {
  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
        renderIdea(idea)
      })
    },
    error: function(xhr) {
      console.log(xhr.responseText)
    }
  })
}

function renderIdea(idea) {
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
    + "<br>"
  )
}

function createIdea() {
  $("#create-idea").on("click", function() {
    var title = $('#idea-title').val()
    var body = $('#idea-description').val()

    $.ajax({
      type: "POST",
      url: "/api/v1/ideas?title="+title+"&body="+body,
      success: function(newIdea){
        renderIdea(newIdea)
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}

function deleteIdea() {
  $("#ideas-index").delegate('#delete-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

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

function editIdea() {

  // incomplete

  $("#ideas-index").delegate('#edit-idea', 'click', function() {
    var $idea = $(this).closest(".idea")

    $.ajax({
      type: "PUT",
      url: "/api/v1/ideas/"+ $idea.attr('data-id'),
      success: function(idea) {
        console.log("Success")
      },
      error: function(xhr) {
        console.log(xhr.responseText)
      }
    })
  })
}
