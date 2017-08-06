document.write('<style>.garou>img{max-width:100%;opacity:0;transition:opacity .2s ease;position:absolute;top:0;left:0;right:0;bottom:0}.garou{position:relative}.garou>img:first-child{opacity:1;position:static}.garou>.is_active{opacity:1}</style>');
if (document.readyState != 'loading'){
garou();
} else {
document.addEventListener('DOMContentLoaded', garou);
}
function garou(){
  Array.prototype.forEach.call(document.getElementsByClassName('garou'), function(element, i){
    var images = element.getElementsByTagName('img');
    var triggerStart = getPosition(element);
    var currentSlide = 0;
    var triggerEnd = triggerStart + (element.offsetHeight);
    var step = element.offsetHeight / images.length;
    window.addEventListener('resize', function(){
      triggerStart = getPosition(element);
      triggerEnd = triggerStart + (element.offsetHeight);
      step = element.offsetHeight / images.length;
    }, false);
    requestAnimationFrame(function(){
      calc();
    });
    function calc(){
      var scrollTop = (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0);
      if (scrollTop > triggerStart && scrollTop < triggerEnd){
        var slide = (scrollTop - triggerStart) / step | 0;
        if (currentSlide != slide){
          currentSlide = slide;
          draw();
        }
      }
      requestAnimationFrame(function(){
        calc();
      });
    }
    function draw(){
      Array.prototype.forEach.call(images, function(image, i){
        if (currentSlide > i)
          addClass(image, 'is_active');
        else
          removeClass(image, 'is_active');
      });
    }
  });
  function getPosition(el){
    var pos = (el.getBoundingClientRect().top + (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop || 0)) - window.innerHeight;
    if (pos < 0)
      return 0;
    return pos;
  }
  function addClass(o, c){
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
      if (re.test(o.className)) return
      o.className = (o.className + " " + c).replace(/\s+/g, " ").replace(/(^ | $)/g, "")
  }
  function removeClass(o, c){
      var re = new RegExp("(^|\\s)" + c + "(\\s|$)", "g")
      o.className = o.className.replace(re, "$1").replace(/\s+/g, " ").replace(/(^ | $)/g, "")
  }
}
