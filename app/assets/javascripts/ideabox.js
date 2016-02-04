$(document).ready(function() {
  fetchIdeas()
  createIdea()
  deleteIdea()
  editIdeaTitle()
  editIdeaBody()
  thumbsUp()
  thumbsDown()
  searchIdeas()
})

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

function renderIdea(idea) {
  $("#ideas-index").prepend(
    "<div class='idea bg-info' data-id='"
    + idea.id
    + "'><p>Created on "
    + idea.created_at
    + "</p><p>Title: </p><h4 contentEditable=true class='edit idea-title'>"
    + idea.title
    + "</h4><p>Description: </p><h5 contentEditable=true class='edit idea-body'>"
    + truncateIdeaBody(idea.body)
    + "</h5><p>Quality: <span class='idea-quality'>"
    + idea.quality
    + "</span></p>"
    + "<button id='delete-idea' name='button-delete' class='btn btn-danger btn-xs danger'>Delete</button> "
    + "<button name='button-up' class='thumbs-up glyphicon glyphicon-thumbs-up btn-success'></button> "
    + "<button name='button-down' class='thumbs-down glyphicon glyphicon-thumbs-down btn-primary'>  </button> "
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
        $("#idea-title").val("");
        $("#idea-description").val("");
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

function thumbsUp() {
  $("#ideas-index").delegate('.thumbs-up', 'click', function() {
    var idea = $(this).closest(".idea")
    var qualitySpan = idea.find('.idea-quality')
    var qualityText = qualitySpan.text()

    if (qualityText === "swill") {
      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: { quality: "plausible" },
        success: function() {
          qualitySpan.text("plausible");
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    } else if (qualityText === "plausible") {
      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: { quality: "genius" },
        success: function() {
          qualitySpan.text("genius");
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    } else {}
  })
}

function thumbsDown() {
  $("#ideas-index").delegate('.thumbs-down', 'click', function() {
    var idea = $(this).closest(".idea")
    var qualitySpan = idea.find('.idea-quality')
    var qualityText = qualitySpan.text()

    if (qualityText === "genius") {
      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: { quality: "plausible" },
        success: function() {
          qualitySpan.text("plausible");
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    } else if (qualityText === "plausible") {
      $.ajax({
        type: "PUT",
        url: "/api/v1/ideas/"+ idea.attr('data-id'),
        data: { quality: "swill" },
        success: function() {
          qualitySpan.text("swill");
        },
        error: function(xhr) {
          console.log(xhr.responseText)
        }
      })
    } else {}
  })
}

function searchIdeas() {
  $('#search').keyup(function(event) {
    var searchParam = $(this).val().toLowerCase();
    var ideas = $('#ideas-index').children();
    ideas.removeClass('invisible');

    var hideIdeas = ideas.filter(function() {
      var titleAndBody = $(this).find(".idea-title, .idea-body").text().toLowerCase();
      return !(titleAndBody.includes(searchParam))
    })
    hideIdeas.addClass('invisible');
  })
}

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
