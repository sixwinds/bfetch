( function(global){

  if ( global.fetch ) return;

  /* ----------------- main ----------------- */
  var Method = {
    GET: 'GET',
    POST: 'POST'
  };

  if ( !global.XMLHttpRequest ) {
    var XMLHttpRequest = function() {
      if ( global.ActiveXObject ) {
        return new ActiveXObject( 'Microsoft.XMLHTTP' );
      } else {
        throw new Error( 'Browser does not support.' );
      }
    }

    XMLHttpRequest.UNSENT = 0;
    XMLHttpRequest.OPENED = 1;
    XMLHttpRequest.HEADERS_RECEIVED = 2;
    XMLHttpRequest.LOADING = 3;
    XMLHttpRequest.DONE = 4;
    
    global.XMLHttpRequest = XMLHttpRequest;
  }

  function Request( input, init ) {
    init = init || {};

    if ( input instanceof Request ) {
      if ( input.bodyUsed ) {
        throw new TypeError( 'Already read' );
      }
      this.url = input.url;
      this.method = input.method;
    } else {
      this.url = input;
    }
    this.method = init.method || this.method || Method.GET;
  }

  function fetch( input, init ) {
    return new Promise( function(resolve, reject){
      var xhr = new XMLHttpRequest();
      var request = new Request( input, init );

      xhr.open( request.method, request.url, true );
      // 
      xhr.onreadystatechange = function() {
        if ( xhr.readyState === XMLHttpRequest.DONE ) {
          // TODO: should be resolve( new Response(xxxx) );
          resolve( xhr );
        }
      }
      xhr.send();
    } );
  }

  global.fetch = fetch;

} )( window );
