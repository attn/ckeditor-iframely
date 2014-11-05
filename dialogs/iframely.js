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

        var hostname = 'http://iframe.ly';
        var method = 'oembed';

        if (typeof editor.config.iframely === 'undefined') {
          editor.config.iframely = {};
        }

        if (typeof editor.config.iframely.endpoint !== 'undefined') {
          hostname = editor.config.iframely.endpoint;
        }

        if (typeof editor.config.iframely.method !== 'undefined') {
          method = editor.config.iframely.method;
        }

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
        var html = json.html;

        if (editor.config.iframely.method === 'iframely') {
          if (typeof json.meta.site !== 'undefined') {
            provider = json.meta.site.toLowerCase();
          }
          else {
            if (typeof json.meta.author !== 'undefined') {
              provider = json.meta.author.toLowerCase();
            }
          }

          if (typeof editor.config.iframely.embed_key !== 'undefined') {
            var embed_key = editor.config.iframely.embed_key;
            if (embed_key.hasOwnProperty(provider)) {
               var buff = json;
               var pieces = embed_key[provider].split(".");
               for(var i=0; i< pieces.length; i++) {
                 if (buff.hasOwnProperty(pieces[i])) {
                   buff = buff[pieces[i]];
                 }
                 else {
                   buff = false;
                 }
               }
               if (buff !== false) {
                 html = buff;
               }
            }
          }
        }
        else if(editor.config.iframely.method === 'oembed') {
          if (typeof json.provider_name !== 'undefined') {
            provider = json.provider_name.toLowerCase();
          }
        }

        var embed = editor.document.createElement( 'div' );
        var classes = ['iframely-embed'];

        if (provider !== '') {

          var provider_class = provider.split(' ').join('-');

          classes.push(classes[0] + '-' + provider_class);
        }

        embed.setAttribute(
          'class',
          classes.join(' ')
        );

        embed.appendHtml( html );

        editor.insertElement( embed );

      }
    };
  });

})();
