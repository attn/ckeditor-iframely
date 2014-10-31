(function(){
  'use strict';

  CKEDITOR.plugins.add( 'iframely', {
    icons: 'iframely',
    requires: [
      'fakeobjects'
    ],
    init: function( editor ) {
      CKEDITOR.addCss(
        'img.iframely-embed' +
        '{' +
        'background-image: url("http://placehold.it/350x150");' +
        'background-position: center center;' +
        'background-repeat: no-repeat;' +
        'border: 1px solid #a9a9a9;' +
        'width: 80px;' +
        'height: 80px;' +
        '}'
      );
      editor.addCommand( 'iframely', new CKEDITOR.dialogCommand('iframelyDialog') );

      editor.ui.addButton( 'iframely', {
        label: 'Embed via iframely',
        command: 'iframely',
        toolbar: 'insert',
        icon: this.path + "icons/iframely.png"
      });

      CKEDITOR.dialog.add( 'iframelyDialog', this.path + 'dialogs/iframely.js' );

    }

  });
})();
