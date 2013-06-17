This directory contains the files for the Symbolset font.
Symbolsets are semantic symbol fonts. 
They work in modern browsers and anywhere OpenType features are supported.

See: http://symbolset.com/blog/symbolset-on-the-web/

Utilizes the index.* capability of Asset Pipeline: http://guides.rubyonrails.org/asset_pipeline.html#asset-organization

To update:
  Overwrite the font's directory with the downloaded files, as is.
  Just copy the zip contents to here.  There is no need to pick specific files.
  Then update the css to use font-url, relative to vendor/assets/fonts.  Such as:
    src: font-url('symbolset/ss-standard/webfonts/ss-standard.eot');
    src: font-url('symbolset/ss-standard/webfonts/ss-standard.eot?#iefix') format('embedded-opentype'),
         font-url('symbolset/ss-standard/webfonts/ss-standard.woff') format('woff'),
         font-url('symbolset/ss-standard/webfonts/ss-standard.ttf')  format('truetype'),
         font-url('symbolset/ss-standard/webfonts/ss-standard.svg#SSStandard') format('svg');

   The index.* files, in this directory, will load the appropriate files from the subdirectories.
