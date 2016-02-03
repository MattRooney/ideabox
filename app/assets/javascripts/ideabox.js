$(document).ready(function() {
  fetchIdeas()
  createIdea()
  deleteIdea()
  editIdeaTitle()
  editIdeaBody()
})

function fetchIdeas() {
  var newestIdea = parseInt($(".idea").last().attr("data-id"))

  $.ajax({
    type: "GET",
    url: "/api/v1/ideas",
    success: function(ideas) {
      $.each(ideas, function(index, idea) {
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

function renderIdea(idea) {
  $("#ideas-index").append(
    "<div class='idea bg-info' data-id='"
    + idea.id
    + "'><p>Created on "
    + idea.created_at
    + "</p><p>Title: </p><p contentEditable=true class='edit idea-title'>"
    + idea.title
    + "</h6><p>Description: </p><p contentEditable=true class='edit idea-body'>"
    + idea.body
    + "</p><p>Quality: "
    + idea.quality
    + "</p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger btn-xs danger'>Delete</button> "
    + "<button id='edit-idea' name='button-edit' class='btn btn-warning btn-xs'>Edit</button> "
    + "<button name='button-up' class='thumbs-up btn btn-success btn-xs '>Thumbs Up</button> "
    + "<button name='button-down' class='thumbs-down btn btn-primary btn-xs'>Thumbs Down</button> "
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

function editIdeaTitle() {
  $("#ideas-index").delegate('.idea-title', 'keypress', function(event) {
    if (event.which === 13) {
      event.preventDefault()
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
