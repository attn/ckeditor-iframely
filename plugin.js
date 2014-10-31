(function(){
  'use strict';

  CKEDITOR.plugins.add( 'iframely', {
    icons: 'iframely',
    init: function( editor ) {

      editor.addContentsCss( this.path + 'css/iframely.css' );

      editor.addCommand( 'iframely', new CKEDITOR.dialogCommand('iframelyDialog', { allowedContent : 'div(iframely);iframe[*](*)' }) );

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
