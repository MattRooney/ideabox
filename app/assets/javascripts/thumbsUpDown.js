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
