(function(){
  'use strict';

  CKEDITOR.plugins.add( 'iframely', {
      icons: 'iframely',
      init: function( editor ) {
        editor.addCommand( 'iframely', new CKEDITOR.dialogCommand('iframelyDialog') );

        editor.ui.addButton( 'iframely', {
          label: 'Embed via iframely',
          command: 'iframely',
          toolbar: 'insert'
        });

        CKEDITOR.dialog.add( 'iframelyDialog', this.path + 'dialogs/iframely.js' );

      }
  });
})();
