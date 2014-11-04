(function(){
  'use strict';

  CKEDITOR.dialog.add( 'iframelyDialog', function ( editor ) {

    var dialog = CKEDITOR.dialog;

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
              validate: dialog.validate.notEmpty('URL field cannot be empty.')
            }
          ]
        }
      ],
      onOk: function() {

        // @todo add a default configuration object.

        var hostname = editor.config.iframely.endpoint || 'http://iframe.ly';
        var method = editor.config.iframely.method || 'oembed';
        var endpoint = hostname + '/api/' + method;
        var provider = '';

        var query = [
          'url=' + encodeURI(this.getValueOf( 'iframely-embed', 'url' ))
        ];

        for(var config in editor.config.iframely) {
          if(editor.config.iframely.hasOwnProperty(config)) {
            switch(config) {
              case 'method':
              case 'endpoint':
                continue;
              default:
                query.push(config + '=' + editor.config.iframely[config]);
                break;
            }
          }
        }

        endpoint += '?' + query.join('&');

        var xmlHttp = null;
        xmlHttp = new XMLHttpRequest();
        xmlHttp.open( 'GET', endpoint, false );
        xmlHttp.send( null );

        if (xmlHttp.status !== 200) {
          return;
        }

        var json = JSON.parse(xmlHttp.responseText);

        if (editor.config.iframely.method === 'iframely') {
          provider = json.meta.site;
        }
        else if(editor.config.iframely.method === 'oembed') {
          provider = json.provider_name;
        }

        var embed = editor.document.createElement( 'div' );

        embed.setAttribute(
          'class',
          'iframely-embed iframely-embed-' + provider.toLowerCase()
        );
        
        embed.appendHtml( json.html );

        editor.insertElement( embed );

      }
    };
  });

})();
