CKEDITOR.plugins.add( 'variables', {
    requires: 'richcombo',
    lang: 'en,zh-cn',
    init: function( editor ) {
        if ( editor.blockless )
            return;

        var config = editor.config;
        var lang = editor.lang.variables;
        var variables = config.variables;

        if (!variables) {
            return;
        }

        variables = variables.split(',');

        editor.ui.addRichCombo( 'Variables', {
            label: lang.label,
            title: lang.label,
            toolbar: 'others,1',

            panel: {
                css: [ CKEDITOR.skin.getPath( 'editor' ) ].concat( config.contentsCss ),
                multiSelect: false,
                attributes: { 'aria-label': 'Variables' }
            },

            init: function() {
                for (var i = 0, l = config.variable_tags.length; i < l; i++) {
                    var tag = config.variable_tags[i];

                    if (!variables.length || (variables.indexOf(tag.type) > -1)) {
                        this.startGroup( tag.name );

                        for (var ii = 0, ll = tag.options.length; ii < ll; ii++) {
                            var option = tag.options[ii];
                            this.add(option[0], option[1], option[2]);
                        }
                    }
                }
            },

            onClick: function( value ) {
                editor.focus();

                setTimeout(function () {
                    editor.insertText( '{{' + value + '}}' );
                }, 0);
            }
        } );

        CKEDITOR.config.variable_tags = [
            {
                name: lang['Candidate'],
                type: 'candidate',
                options: [
                    ['candidate.englishName', lang['English Name'], lang['English Name']],
                    ['candidate.chineseName', lang['Chinese Name'], lang['Chinese Name']],
                    ['candidate.company', lang['Company'], lang['Company']],
                    ['candidate.title', lang['Title'], lang['Title']],
                    ['candidate.city', lang['City'], lang['City']],
                    ['candidate.mobile', lang['Mobile'], lang['Mobile']],
                    ['candidate.mobile1', lang['Mobile 1'], lang['Mobile 1']],
                    ['candidate.mobile2', lang['Mobile 2'], lang['Mobile 2']]
                ]
            }, {
                name: lang['Client Contact'],
                type: 'clientContact',
                options: [
                    ['clientcontact.englishName', lang['English Name'], lang['English Name']],
                    ['clientcontact.chineseName', lang['Chinese Name'], lang['Chinese Name']],
                    ['clientcontact.company', lang['Company'], lang['Company']],
                    ['clientcontact.title', lang['Title'], lang['Title']],
                    ['clientcontact.mobile', lang['Mobile'], lang['Mobile']],
                    ['clientcontact.mobile1', lang['Mobile 1'], lang['Mobile 1']],
                    ['clientcontact.mobile2', lang['Mobile 2'], lang['Mobile 2']],
                    ['clientcontact.address', lang['Address'], lang['Address']]
                ]
            }, {
                name: lang['Job'],
                type: 'job',
                options: [
                    ['job.jobTitle', lang['Job Title'], lang['Job Title']],
                    ['job.client', lang['Client'], lang['Client']],
                    ['job.city', lang['Company'], lang['Company']],
                    ['job.interviewDate', lang['Interview Date'], lang['Interview Date']],
                ]
            }, {
                name: lang['User'],
                type: 'user',
                options: [
                    ['user.englishName', lang['English Name'], lang['English Name']],
                    ['user.chineseName', lang['Chinese Name'], lang['Chinese Name']],
                    ['user.title', lang['Title'], lang['Title']],
                    ['user.mobile', lang['Mobile'], lang['Mobile']],
                    ['user.officeTel', lang['Office Tel'], lang['Office Tel']]
                ]
            }
        ];
    }
} );


