const divVisibility = document.querySelector("hidden");
const pageContent = document.querySelector("#page-content");

$(document).ready(function(){
	$(document).on('click', '#blogpage', function () {
    var selectedPage = $(this).attr("href").split('#')[1];
		$('#page-content').parent().append('<span id="appended-content"><div class="back-button"><a href="#" id="unhide">◄ Go back to the list</a></div><zero-md id="app" src="/md/' + selectedPage + '.md" manual-render><template><style>.markdown-body{line-height:1.5;word-wrap:break-word;font-size:1.2em;font-family:Roboto;}img{width: 100%;}blockquote{padding:0 1em;border-left:.25em solid #6a737d;}.dark p{color:white;}</style></template></zero-md><script>customElements.whenDefined("zero-md").then(() => {app.render({breaks: true,})})</script></span>');
    $('#page-content').css('display','none');
    console.log("successfully clicked and loaded md");
  });

  $(document).on("click", "#unhide", function () {
		$('#appended-content').remove();
    $('#page-content').css('display','block');
    console.log("successfully hid md")
  });

  /*$(function() {
    var currentBlogPage = window.location.href.split('#')[1];
    if(currentBlogPage !== "") {
      $('#page-content').parent().append('<span id="appended-content"><div class="back-button"><a href="#" id="unhide">◄ Go back to the list</a></div><zero-md id="app" src="/md/' + currentBlogPage + '.md" manual-render><template><style>.markdown-body{line-height:1.5;word-wrap:break-word;font-size:16px;font-family:-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji;}p{1.4em;}img{width: 100%;}blockquote{padding:0 1em;border-left:.25em solid #6a737d;}.dark p{color:white;}</style></template></zero-md><script>customElements.whenDefined("zero-md").then(() => {app.render({breaks: true,})})</script></span>');
    $('#page-content').css('display','none');
    console.log("loaded md");
    } else {
      $('#appended-content').remove();
      $('#page-content').css('display','block');
      console.log("returned else");
      }
  });*/


  $(function() {
    var hrefContent = window.location.href
    const regex = /(?<=\#).*/;
    var currentBlogPage = hrefContent.match(regex);
    if(currentBlogPage[0] !== null) {
      $('#page-content').parent().append('<span id="appended-content"><div class="back-button"><a href="#" id="unhide">◄ Go back to the list</a></div><zero-md id="app" src="/md/' + currentBlogPage + '.md" manual-render><template><style>.markdown-body{line-height:1.5;word-wrap:break-word;font-size:1.2em;font-family:Roboto;}img{width: 100%;}blockquote{padding:0 1em;border-left:.25em solid #6a737d;}.dark p{color:white;}</style></template></zero-md><script>customElements.whenDefined("zero-md").then(() => {app.render({breaks: true,})})</script></span>');
    $('#page-content').css('display','none');
    console.log("loaded md");
    } else {
      $('#appended-content').remove();
      $('#page-content').css('display','block');
      console.log("returned else");
      }
  });

});
