angular.module("ui.bootstrap-carousel", ["ui.bootstrap-carousel.tpls","ui.bootstrap-carousel.carousel"]);
angular.module("ui.bootstrap-carousel.tpls", ["template/carousel/carousel.html","template/carousel/slide.html"]);

angular.module('ui.bootstrap-carousel.carousel', [])
.directive('carousel', [function() {
  return {
    restrict: 'EA',
    transclude: true,
    replace: true,
    controller: function ($scope, $timeout) {
      var self = this,
        slides = self.slides = [],
        currentIndex = -1;
      self.currentSlide = null;

      self.select = function(nextSlide, direction) {
        var nextIndex = slides.indexOf(nextSlide);
        $timeout(goNext);
        function goNext() {
          if (self.currentSlide && nextSlide.$element) { 
            nextSlide.$element.addClass(direction);
            nextSlide.$element[0].offsetWidth = nextSlide.$element[0].offsetWidth; //force reflow
            angular.forEach(slides, function(slide) {
              angular.extend(slide, {direction: '', entering: false, leaving: false, active: false});
            });
            angular.extend(nextSlide, {direction: direction, active: true, entering: true});
            angular.extend(self.currentSlide||{}, {direction: direction, leaving: true});
          } else { //if it's the last slide during carousel creation
            angular.extend(nextSlide, {direction: '', active: true, leaving: false, entering: false});
            angular.extend(self.currentSlide||{}, {direction: '', active: false, leaving: false, entering: false});
          }
          self.currentSlide = nextSlide;
          currentIndex = nextIndex;
        }
      };

      $scope.next = function() {
        var newIndex = (currentIndex + 1) % slides.length;
        return self.select(slides[newIndex], 'next');
      };

      $scope.prev = function() {
        var newIndex = currentIndex - 1 < 0 ? slides.length - 1 : currentIndex - 1;
        return self.select(slides[newIndex], 'prev');
      };

      $scope.select = function(slide) {
        self.select(slide);
      };

      $scope.activeSlideIndex = function() {
        return currentIndex;
      };

      $scope.lastSlideIndex = function() {
        return slides.length - 1;
      }

      self.addSlide = function(slide, element) {
        slide.$element = element;
        slides.push(slide);
        if(slides.length === 1 || slide.active) {
          self.select(slides[slides.length-1]);
        } else {
          slide.active = false;
        }
      };
    },
    templateUrl: 'template/carousel/carousel.html',
    scope: {}
  };
}])
.directive('slide', [function() {
  return {
    require: '^carousel',
    restrict: 'EA',
    transclude: true,
    replace: true,
    templateUrl: 'template/carousel/slide.html',
    scope: {
      active: '='
    },
    link: function (scope, element, attrs, carouselCtrl) {
      carouselCtrl.addSlide(scope, element);
    }
  };
}]);

angular.module("template/carousel/carousel.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/carousel.html",
    "<div class=\"carousel\">\n" +
    "    <div class=\"carousel-inner\" ng-transclude></div>\n" +
    "    <a ng-click=\"prev()\" class=\"carousel-control left\" ng-show=\"activeSlideIndex() > 0\">&lsaquo;</a>\n" +
    "    <a ng-click=\"next()\" class=\"carousel-control right\" ng-hide=\"activeSlideIndex() == lastSlideIndex()\">&rsaquo;</a>\n" +
    "</div>\n" +
    "");
}]);

angular.module("template/carousel/slide.html", []).run(["$templateCache", function($templateCache) {
  $templateCache.put("template/carousel/slide.html",
    "<div ng-class=\"{\n" +
    "    'active': leaving || (active && !entering),\n" +
    "    'prev': (next || active) && direction=='prev',\n" +
    "    'next': (next || active) && direction=='next',\n" +
    "    'right': direction=='prev',\n" +
    "    'left': direction=='next'\n" +
    "  }\" class=\"item\" ng-transclude></div>\n" +
    "");
}]);
