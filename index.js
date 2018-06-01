(function($) {
  var Images, anotherImageAreasTag, html;
  html = "<div class=\"mb-2\">\n  <span class=\"align-middle mr-4\">\n    <span class=\"image__counter-current\">1</span>\n    <span>/</span>\n    <span class=\"image__counter-total\"></span>\n  </span>\n  <a href=\"#carousel\" role=\"button\" data-slide=\"next\" id=\"next-btn\" class=\"btn btn-light\">\n    Next\n    <i class=\"fa fa-arrow-right ml-1\"></i>\n  </a>\n</div>\n<div id=\"carousel\" class=\"carousel\" data-interval=\"false\" data-wrap=\"false\">\n  <div class=\"carousel-inner\">\n\n  </div>\n</div>";
  Images = class Images {
    constructor(arr, cb, settings) {
      this.images = arr;
      this.callback = cb;
      this.tags = settings.tags;
      this.settings = settings;
      this.$carouselItem = $('<div class="carousel-item"><img class="d-block"></div>');
      this.$carouselInner = $('#carousel .carousel-inner');
      this.carouselLength = this.images.length;
      this.counter = 0;
      this.endOfCarousel = false;
      this.$total = $('.image__counter-total');
      this.$current = $('.image__counter-current');
      this.init();
    }

    init() {
      this.$total.text(this.carouselLength);
      this.addSlide();
      this.addSlide();
      this.attachListeners();
      $('#carousel img').eq(0).selectAreas(this.settings);
      if (this.settings.enableLabels) {
        return this.addLabelsFieldListener();
      }
    }

    saveAreas() {
      var $img, $slide, areas, imageId, imgHeight, imgWidth, values;
      values = [];
      $slide = $('.carousel-item.active');
      $img = $slide.find('img');
      imgWidth = $img.width();
      imgHeight = $img.height();
      imageId = $img.data('id');
      areas = $img.selectAreas('areas');
      $slide.find('select').map(function(i, el) {
        return values.unshift($(el).select2('data').map(function(el) {
          return el.text;
        }));
      });
      areas.map(function(area, i) {
        area.label = values[i];
        area.x = ((area.x / imgWidth) * 100).toFixed(2);
        area.y = ((area.y / imgHeight) * 100).toFixed(2);
        area.width = ((area.width / imgWidth) * 100).toFixed(2);
        return area.height = ((area.height / imgHeight) * 100).toFixed(2);
      });
      return this.callback({
        imageId: imageId,
        imageWidth: imgWidth,
        imageHeight: imgHeight,
        boundingBoxes: areas
      });
    }

    addLabelsFieldListener() {
      return $('.carousel-item.active').on('click', (e) => {
        var $selectHtml;
        if (!$(e.target).parents('.select-areas-outline').length) {
          $('select').select2('close');
        }
        $selectHtml = $("<select name='tags[]' multiple='multiple'></select>");
        this.tags.map(function(tag) {
          var $option;
          $option = $('<option></option>');
          $option.text(tag);
          return $selectHtml.append($option);
        });
        $(e.currentTarget).find('.select-areas-outline:empty').html($selectHtml).find('select').select2({
          tags: this.settings.tags
        }).select2('open');
        if (!this.settings.tags.length) {
          return $('.select2-dropdown').hide();
        }
      });
    }

    attachListeners() {
      $('#carousel').on('slid.bs.carousel', () => {
        var $activeImg;
        $activeImg = $('.carousel-item.active').find('img');
        $activeImg.selectAreas(this.settings);
        return this.addLabelsFieldListener();
      });
      return $('#next-btn').on('click', (e) => {
        if (this.settings.isLabelsRequired && !this.checkLabels()) {
          e.stopPropagation();
          alert(this.settings.errorTextOnMissingLabel);
          return;
        }
        this.saveAreas();
        if (this.endOfCarousel) {
          $(e.currentTarget).addClass('disabled');
          return;
        }
        this.$current.text(this.counter + 1);
        if (this.counter < this.carouselLength - 1) {
          this.$current.text(this.counter + 1);
          this.counter++;
        } else if (this.counter === this.carouselLength - 1) {
          this.endOfCarousel = true;
          return;
        }
        return this.addSlide();
      });
    }

    checkLabels() {
      return $('.carousel-item.active').find('select').toArray().every(function(el) {
        return $(el).select2('data').length;
      });
    }

    addSlide() {
      var $newItem, $newItemImg, ref, ref1;
      $newItem = this.$carouselItem.clone();
      $newItemImg = $newItem.find('img');
      $newItemImg.attr('src', (ref = this.images[this.counter]) != null ? ref.url : void 0);
      $newItemImg.attr('data-id', (ref1 = this.images[this.counter]) != null ? ref1.id : void 0);
      if (this.counter === 0) {
        $newItem.addClass('active');
        this.counter++;
      }
      return this.$carouselInner.append($newItem);
    }

  };
  $.fn.imageAreasTag = function(arr, cb, options) {
    var images, settings;
    settings = $.extend({
      minSize: [30, 30],
      overlayOpacity: 0,
      enableLabels: true,
      tags: [],
      allowOwnTags: true,
      isLabelsRequired: false,
      errorTextOnMissingLabel: 'Each area must have at least one tag'
    }, options);
    this.html(html);
    return images = new Images(arr, cb, settings);
  };
  anotherImageAreasTag = $.fn.imageAreasTag;
  return $.fn.imageAreasTag.noConflict = function() {
    $.fn.cropper = anotherImageAreasTag;
    return this;
  };
})(jQuery);
