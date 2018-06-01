# image-areas-tag


> A jQuery plugin for selecting and tagging areas for images (https://github.com/IrinaSmirnova/image-areas-tag).


## Getting started

### Installation

```shell
npm install image-areas-tag
```

Include files:

```html
<script src="/path/to/jquery.js"></script><!-- jQuery is required -->
<script src="/path/to/bootstrap.min.js"></script><!-- Bootstrap is required -->
<link  href="/path/to/bootstrap.css" rel="stylesheet">
<script src="/path/to/jquery.selectareas.js"></script><!-- jquery.selectareas is required -->
<link  href="/path/to/jquery.selectareas.css" rel="stylesheet">
<script src="/path/to/select2.full.js"></script><!-- select2.js is required -->
<link  href="/path/to/select2.css" rel="stylesheet">
<link  href="/path/to/dist/css/image-areas-tag.css" rel="stylesheet">

```

### Usage

Initialize with `$.fn.imageAreasTag` method.

```html
<!-- Container where carousel with images will be placed -->
<div id="container">

</div>
```

```js
// Define your array of images with id and url fields
const imagesArr = [
	{
		id: 1,
		url: '...'
	},
	{
		id: 2,
		url: '...'
	}
];
// Define your callback function that will called with selected areas data after proceeding to the next slide.
let cb = function(dataObj) {
	...
};
$('#container').imageAreasTag(imagesArr, cb, options)


```

## Options

Here is a list of available options for imageAreasTag, with their *default value*:

 - **allowEdit** (*true*) : When set to false, unset allowMove, allowResize, allowSelect and allowDelete
 - **allowMove** (*true*) : When set to false, Areas can not be moved with a drag & drop.
 - **allowResize** (*true*) : When set to false, Areas can not be resized.
 - **allowSelect** (*true*) : When set to false, Areas can not be created.
 - **allowDelete** (*true*) : When set to false, Areas can not be deleted.
 - **allowNudge** (*true*) : When set to false, Areas can not be moved with arrow keys.
 - **aspectRatio** (*0*) : When not 0, force a ratio between height and width for the selections.
 - **minSize** (*[30, 30]*) : When not 0, set the minimum size for a selection [width, height]
 - **maxSize** (*[0, 0]*) : When not 0, set the maximum size for a selection [width, height]
 - **maxAreas** (*0*) : When not 0, set the maximum number of area that can be drawn.
 - **outlineOpacity** (*0.5*) : opacity of the moving dotted outline around a selection.
 - **overlayOpacity** (*0*) : opacity of the overlay layer over the image
 - **areas** (*[]*) : list of areas to add to the image from the beginning  (id will be ignored)
 - **onChanging** (*null*) : triggered when the event "changing" is fired
 - **onChanged** (*null*) : triggered when the event "changed" is fired
 - **onLoaded** (*null*) : triggered when the event "loaded" is fired
 - **width** (*0*) : When not 0, scale the image to this width (px). The coordinates of the areas on the full image can be retrieved with method relativeAreas()
 - **enableLabels** (true) : When set to false, setting tags for ares is unavailable
 - **tags** ([]) : List of predefined tags
 - **allowOwnTags** (true) : When set to false, user can not enter own tags
 - **isLabelsRequired** (false) : When set to true, user can not proceed to the next image while there are some areas without tags
 - **errorTextOnMissingLabel** ('Each area must have at least one tag') : Error text which user sees in alert window when he tries to proceed to the next image without tagging all areas on the image (when **isLabelsRequired** option set to true)



## No conflict

If you have to use other plugin with the same namespace, just call the `$.fn.imageAreasTag.noConflict` method to revert to it.

```html
<script src="other-plugin.js"></script>
<script src="image-areas-tag.js"></script>
<script>
  $.fn.imageAreasTag.noConflict();
  // Code that uses other plugin's "$().imageAreasTag" can follow here.
</script>
```

## License

[MIT](http://opensource.org/licenses/MIT) © [Irina Smirnova]
