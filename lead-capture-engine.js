/* Self Entourage Lead Capture Engine - disabled for clean public UX */
(function(){
  'use strict';
  document.addEventListener('DOMContentLoaded', function(){
    document.querySelectorAll('.se-lead-mini,.se-lead-dock,.se-quick-actions,.se-floating-rail,.se-command,.se-toast').forEach(function(el){ el.remove(); });
  });
})();
