(function(){
  'use strict';

  CKEDITOR.dialog.add( 'iframelyDialog', function ( editor ) {
    return {
      title: 'Embed via iframely',
        minWidth: 400,
        minHeight: 200,
        contents: [
          {
            id: 'iframely-embed',
            label: 'Embed via iframely',
            elements: [
              {
                type: 'text',
                id: 'url',
                label: 'URL',
                validate: CKEDITOR.dialog.validate.notEmpty( 'URL field cannot be empty.' )
              }
            ]
          }
        ],
      onOk: function() {
        var dialog = this;
        var api_key = editor.config.iframely_api_key;
        var url = encodeURI(dialog.getValueOf( 'iframely-embed', 'url' ));
        var endpoint = 'http://iframe.ly/api/' + editor.config.iframely_method + '?url=' + url + '&api_key=' + api_key;

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( 'GET', endpoint, false );
        xmlHttp.send( null );


        var json = JSON.parse(xmlHttp.responseText);

        if (editor.config.iframely_method === 'iframely') {
          var provider = json.meta.site;
        }
        else if(editor.config.iframely_method === 'oembed') {
          var provider = json.provider_name;
        }

        var embed = editor.document.createElement( 'div' );
        embed.appendHtml( json.html );

        var placeholder = editor.createFakeElement( embed , 'iframely-embed iframely-embed-' + provider.toLowerCase(), 'div', true);
        editor.insertElement( placeholder );

      }

    };
  });

})();
