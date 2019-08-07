document.getElementById("myform").addEventListener("submit", saveBookmark);

function saveBookmark(e) {
  e.preventDefault();
  var name = document.getElementById("sitename").value;
  var url = document.getElementById("siteurl").value;

  if (!validateForm(name, url)) {
    return false;
  }

  var bookmark = {
    name: name,
    url: url
  };

  if (localStorage.getItem("bookmarks") === null) {
    var bookmarks = [];
    bookmarks.push(bookmark);

    // set bookmark to local storege
    localStorage.setItem("bookmarks", JSON.stringify(bookmarks));
  } else {
    var bookma = JSON.parse(localStorage.getItem("bookmarks"));
    bookma.push(bookmark);

    // re-set bookmark to local storege
    localStorage.setItem("bookmarks", JSON.stringify(bookma));
  }
  document.getElementById("myform").reset();

  fetchBookmark();
}

function fetchBookmark() {
  var bookmarks = JSON.parse(localStorage.getItem("bookmarks"));
  var output = document.getElementById("result");
  output.innerHTML = ``;
  Array.from(bookmarks).forEach(function(val) {
    var sitename = val.name;
    var siteurl = val.url;
    output.innerHTML += `<div class=output-item>                        <h3>${sitename}<a class=link href="${siteurl}" target="_blank"> visit </a> <a class=close-btn onclick="deleteBookmark(\'${siteurl}\')"> X </a></h3></div>`;
  });
}

function deleteBookmark(siteurl) {
  var books = JSON.parse(localStorage.getItem("bookmarks"));

  Array.from(books).forEach(function(book) {
    if (book.url == siteurl) {
      books.splice(book, 1);
    }
  });

  // re-set bookmark to local storege
  localStorage.setItem("bookmarks", JSON.stringify(books));

  fetchBookmark();
}

function validateForm(name, url) {
  if (!name || !url) {
    alert("please Enter the details first");
    return false;
  }

  var expression = /[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)?/gi;
  var regex = new RegExp(expression);

  if (!url.match(regex)) {
    alert("please enter the correct url");
    return false;
  }
  return true;
}
