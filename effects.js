/* Effets visuels : apparition au défilement, ombre du menu, parallaxe douce de l'ouverture */
(function(){
  var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;
  var header = document.querySelector('header.top');
  var onScroll = function(){ if(header) header.classList.toggle('scrolled', window.scrollY > 8); };
  onScroll(); window.addEventListener('scroll', onScroll, {passive:true});
  if (reduce || !('IntersectionObserver' in window)) return;

  var targets = document.querySelectorAll('.sec-head, .line, .steps li, .keyinfo > div, .gallery figure, .teaser a, details, .cta-band .wrap, .devis-grid > *');
  var io = new IntersectionObserver(function(entries){
    entries.forEach(function(e){ if(e.isIntersecting){ var el=e.target; el.classList.add('in'); io.unobserve(el);
      setTimeout(function(){ el.classList.remove('reveal','in'); el.style.removeProperty('--d'); }, 1100 + (parseInt(el.style.getPropertyValue('--d'))||0)); } });
  }, {rootMargin:'0px 0px -8% 0px'});
  [].forEach.call(targets, function(el){
    var r = el.getBoundingClientRect();
    if (r.top < window.innerHeight) return;           /* déjà visible : on ne cache rien */
    var sib = el.parentElement ? [].indexOf.call(el.parentElement.children, el) : 0;
    el.style.setProperty('--d', Math.min(sib, 5) * 70 + 'ms');
    el.classList.add('reveal'); io.observe(el);
  });

  var hero = document.querySelector('.hero-visual');
  if (hero && window.matchMedia('(hover: hover)').matches) {
    hero.addEventListener('mousemove', function(e){
      var r = hero.getBoundingClientRect();
      var x = (e.clientX - r.left) / r.width - .5, y = (e.clientY - r.top) / r.height - .5;
      hero.style.setProperty('--px', (x * 10).toFixed(1) + 'px');
      hero.style.setProperty('--py', (y * 10).toFixed(1) + 'px');
    });
    hero.addEventListener('mouseleave', function(){ hero.style.setProperty('--px','0px'); hero.style.setProperty('--py','0px'); });
  }
})();
