// Simple JS for interactions: cart button, testimonial slider, scroll reveal

document.addEventListener('DOMContentLoaded', function(){
  // Update year
  document.getElementById('year').textContent = new Date().getFullYear();

  // Add-to-cart demo
  document.querySelectorAll('.add-to-cart').forEach(btn => {
    btn.addEventListener('click', (e) => {
      btn.classList.add('btn-success');
      btn.textContent = 'Added';
      setTimeout(()=>{ btn.textContent = 'Add to Cart' }, 1400);
    });
  });

  // Testimonial slider
  const slides = document.querySelectorAll('.testimonial');
  let idx = 0;
  const show = (i) => {
    slides.forEach(s=> s.classList.remove('active'));
    slides[i].classList.add('active');
  };
  show(idx);

  document.querySelector('.slider-next').addEventListener('click', ()=>{
    idx = (idx+1) % slides.length; show(idx);
  });
  document.querySelector('.slider-prev').addEventListener('click', ()=>{
    idx = (idx-1+slides.length) % slides.length; show(idx);
  });

  // Auto-play slider
  let auto = setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 5000);
  [document.querySelector('.slider-next'), document.querySelector('.slider-prev')].forEach(btn=>{
    btn.addEventListener('click', ()=>{ clearInterval(auto); auto = setInterval(()=>{ idx = (idx+1)%slides.length; show(idx); }, 5000); });
  });

  // Scroll reveal (IntersectionObserver)
  const io = new IntersectionObserver(entries => {
    entries.forEach(e => {
      if(e.isIntersecting){
        e.target.classList.add('inview');
        // unobserve if you want one-time animation
        io.unobserve(e.target);
      }
    });
  }, {threshold: 0.12});

  document.querySelectorAll('.feature-card, .product-card, .testimonial, .hero-main').forEach(el=>{
    el.classList.add('fade-up'); io.observe(el);
  });

  // Smooth offset scroll for navbar (account for fixed header)
  document.querySelectorAll('.nav-link').forEach(link=>{
    link.addEventListener('click', (e)=>{
      if(link.hash){
        e.preventDefault();
        const target = document.querySelector(link.hash);
        const y = target.getBoundingClientRect().top + window.scrollY - 80; // offset
        window.scrollTo({top: y, behavior: 'smooth'});
      }
    });
  });

  // small accessibility: keyboard navigation to slider
  document.querySelectorAll('.slider-next, .slider-prev').forEach(btn => btn.setAttribute('tabindex', '0'));
});