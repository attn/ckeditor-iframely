(function(){
  'use strict';

  CKEDITOR.plugins.add( 'iframely', {
    icons: 'iframely',
    init: function( editor ) {

      var dialog = new CKEDITOR.dialogCommand(
        'iframelyDialog',
        {allowedContent : 'div(iframely);iframe[*](*)'}
      );

      editor.addCommand('iframely', dialog);

      editor.ui.addButton( 'iframely', {
        label: 'Embed via iframely',
        command: 'iframely',
        toolbar: 'insert',
        icon: this.path + 'icons/iframely.png'
      });
      CKEDITOR.dialog.add(
        'iframelyDialog',
        this.path + 'dialogs/iframely.js'
      );
    }
  });
})();
