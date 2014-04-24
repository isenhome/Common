(function () {
    CKEDITOR.plugins.add( 'uploadImage', {
        requires: ['dialog'],
        lang: 'en,zh-cn',
        init: function( editor ) {
            CKEDITOR.dialog.add('uploadImage', this.path + 'dialogs/uploadImage.js');

            editor.addCommand('uploadImage', new CKEDITOR.dialogCommand('uploadImage'));

            if ( editor.blockless || !editor.config.imageUploadUrl ) {
                return;
            }

            var config = editor.config;
            var lang = editor.lang.uploadImage;

            editor.ui.addButton( 'uploadImage', {
                label: lang.label,
                toolbar: 'insert,1',
                command: 'uploadImage'
            });
        }
    });

}());
