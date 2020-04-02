

window.addEventListener('scroll', function (e) {
  var scrolled = window.pageYOffset;

  const nav = this.document.getElementById('snav');

  if (scrolled > 100) {
    nav.style.background = "#191919";
  }
  else{
    nav.style.background = "";
  }
   
}, false) ;



$(document).ready(function(){
  // Add smooth scrolling to all links
  $("#scrollToBot").on('click', function(event) {

      // Using jQuery's animate() method to add smooth page scroll
      // The optional number (800) specifies the number of milliseconds it takes to scroll to the specified area

      var div1 = $("#div1");
      if (div1.length){
        var divOffset = div1.offset().top}
      $('html, body').animate({
        scrollTop: divOffset
      }, 800, function(){

        // Add hash (#) to URL when done scrolling (default click behavior)
      });
    })
  });









  var clientId = '1081624984691-h9mifdgui1fe7rue5r04vdgi7vpa5t35.apps.googleusercontent.com';
      var apiKey = 'AIzaSyDuT3i5LxUCKMhVGa8jwV2Sw8_DGoEBzoA';
      var scopes = 'https://www.googleapis.com/auth/gmail.send';

      function handleClientLoad() {
        gapi.client.setApiKey(apiKey);
        window.setTimeout(checkAuth, 1);
      }

      function checkAuth() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: true
        }, handleAuthResult);
      }

      function handleAuthClick() {
        gapi.auth.authorize({
          client_id: clientId,
          scope: scopes,
          immediate: false
        }, handleAuthResult);
        return false;
      }

      function handleAuthResult(authResult) {
        if(authResult && !authResult.error) {
          loadGmailApi();
          $('#authorize-button').remove();
          $('.table-inbox').removeClass("hidden");
        } else {
          $('#authorize-button').removeClass("hidden");
          $('#authorize-button').on('click', function(){
            handleAuthClick();
          });
        }
      }

      function loadGmailApi() {
        gapi.client.load('gmail', 'v1', displayInbox);
      }


  function sendEmail()
{
  $('#send-button').addClass('disabled');

  sendMessage(
    {
      'To': $('#compose-to').val(),
      'Subject': $('#compose-subject').val()
    },
    $('#compose-message').val(),
    composeTidy
  );

  return false;
}


function sendMessage(headers_obj, message, callback)
{
  var email = '';

  for(var header in headers_obj)
    email += header += ": "+headers_obj[header]+"\r\n";

  email += "\r\n" + message;

  var sendRequest = gapi.client.gmail.users.messages.send({
    'userId': 'me',
    'resource': {
      'raw': window.btoa(email).replace(/\+/g, '-').replace(/\//g, '_')
    }
  });

  return sendRequest.execute(callback);
}

function composeTidy()
{
  $('#compose-modal').modal('hide');

  $('#compose-to').val('');
  $('#compose-subject').val('');
  $('#compose-message').val('');

  $('#send-button').removeClass('disabled');
}