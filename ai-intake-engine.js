/* Self Entourage Phase 5 AI Intake Engine */
(function(){
  'use strict';
  var d=document;
  function ready(f){if(d.readyState!=='loading')f();else d.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    var launch=d.createElement('button');
    launch.type='button';
    launch.className='se-ai-intake-launch';
    launch.innerHTML='🧠 <span>Find My Path</span>';
    d.body.appendChild(launch);

    var wrap=d.createElement('div');
    wrap.className='se-ai-intake';
    wrap.innerHTML='<div class="se-ai-card"><div class="se-ai-head"><button class="se-ai-close" aria-label="Close">×</button><strong>Find Your Best Path</strong><span>Answer a few quick questions and get routed to the right Self Entourage starting point.</span><div class="se-ai-progress"><i></i></div></div><div class="se-ai-body"></div></div>';
    d.body.appendChild(wrap);

    var body=wrap.querySelector('.se-ai-body');
    var bar=wrap.querySelector('.se-ai-progress i');
    var step=0;
    var data={};
    var steps=[render1,render2,render3,render4,render5];

    function open(){wrap.classList.add('is-open');render();}
    function close(){wrap.classList.remove('is-open');}
    function render(){bar.style.width=((step+1)/steps.length*100)+'%';body.innerHTML='';steps[step]();}
    function nav(next){step=Math.max(0,Math.min(steps.length-1,next));render();}
    function restart(){step=0;data={};render();}

    launch.onclick=open;
    wrap.querySelector('.se-ai-close').onclick=close;
    wrap.onclick=function(e){if(e.target===wrap)close();};

    function buttons(opts,key){
      var box=d.createElement('div');
      box.className='se-ai-options';
      opts.forEach(function(t){
        var b=d.createElement('button');
        b.type='button';
        b.innerHTML=t+' <small>→</small>';
        if(data[key]===t)b.classList.add('is-selected');
        b.onclick=function(){data[key]=t;nav(step+1);};
        box.appendChild(b);
      });
      body.appendChild(box);
    }

    function actions(back){
      var a=d.createElement('div');
      a.className='se-ai-actions';
      if(back){var b=d.createElement('button');b.textContent='Back';b.onclick=function(){nav(step-1);};a.appendChild(b);}
      body.appendChild(a);
    }

    function render1(){body.innerHTML='<div class="se-ai-step is-active"><h3>What do you need most?</h3><p>Choose the closest match so the site can point you in the right direction.</p></div>';buttons(['Clarity / Direction','More Sales','Automation / Systems','Premium Brand Presence','Custom Build Help'],'need');}
    function render2(){body.innerHTML='<div class="se-ai-step is-active"><h3>What stage are you in?</h3><p>This helps separate quick-start support from deeper system builds.</p></div>';buttons(['Idea Stage','Early Revenue','Growing Business','Established Operator'],'stage');actions(true);}
    function render3(){body.innerHTML='<div class="se-ai-step is-active"><h3>When do you need movement?</h3><p>Pick the timeline that feels most honest.</p></div>';buttons(['Today / ASAP','This Week','This Month','Exploring'],'time');actions(true);}
    function render4(){body.innerHTML='<div class="se-ai-step is-active"><h3>What budget range feels realistic?</h3><p>This is used only to avoid recommending the wrong level of support.</p></div>';buttons(['Under $100','$100-$500','$500-$2k','$2k+'],'budget');actions(true);}

    function getRecommendation(){
      var rec='Start Here';
      var href='start-here.html';
      var why='You need the cleanest first step before choosing a product or build path.';
      var next='Start with the path selector, then choose the offer that matches your situation.';

      if(data.need==='More Sales'){
        rec='Store'; href='store.html';
        why='You are focused on offers, revenue, and buying the right support now.';
        next='Go to the Store and start with Best First Moves or Build Offers.';
      }
      if(data.need==='Premium Brand Presence'){
        rec='Store'; href='store.html';
        why='Brand presence usually starts with a productized offer, class, or build package.';
        next='Review the Store categories and choose the brand or build offer that fits.';
      }
      if(data.need==='Clarity / Direction'){
        rec='Start Here'; href='start-here.html';
        why='You need direction before you buy something bigger.';
        next='Start with the guided path and use a consult or snapshot if you need a sharper read.';
      }
      if(data.need==='Automation / Systems' && (data.budget==='$500-$2k' || data.budget==='$2k+')){
        rec='Build'; href='build.html';
        why='You are ready for structure, workflow design, and implementation planning.';
        next='Go to Build and compare System Forge, Sovereign AI Package, and Ascension Build.';
      }
      if(data.need==='Custom Build Help' || data.stage==='Established Operator' || data.budget==='$2k+'){
        rec='Contact'; href='contact.html';
        why='Your situation likely needs custom scoping before the right offer is chosen.';
        next='Send a direction request so Self Entourage can match the right build path.';
      }
      return {rec:rec,href:href,why:why,next:next};
    }

    function render5(){
      var r=getRecommendation();
      var payload={need:data.need,stage:data.stage,time:data.time,budget:data.budget,recommendation:r.rec,page:(location.pathname.split('/').pop()||'index.html'),ts:new Date().toISOString()};
      try{localStorage.setItem('se_ai_intake',JSON.stringify(payload));}catch(e){}
      body.innerHTML='<div class="se-ai-step is-active"><h3>Recommended Path</h3><div class="se-ai-result"><strong>'+r.rec+'</strong><span>'+r.why+'</span></div><div class="se-ai-result"><strong>Next Step</strong><span>'+r.next+'</span></div><p class="se-ai-human-note">Your answers were saved privately in this browser so the owner tools can read the latest intake during review. No raw code is shown to the customer.</p></div>';
      var a=d.createElement('div');
      a.className='se-ai-actions';
      var go=d.createElement('a');
      go.className='primary';
      go.href=r.href;
      go.textContent='Go to Recommended Path';
      a.appendChild(go);
      var again=d.createElement('button');
      again.type='button';
      again.textContent='Start Over';
      again.onclick=restart;
      a.appendChild(again);
      var send=d.createElement('a');
      send.href='mailto:selfentourage@gmail.com?subject=Self%20Entourage%20Direction%20Request&body=I%20completed%20the%20path%20finder.%0A%0ANeed:%20'+encodeURIComponent(data.need||'')+'%0AStage:%20'+encodeURIComponent(data.stage||'')+'%0ATimeline:%20'+encodeURIComponent(data.time||'')+'%0ABudget:%20'+encodeURIComponent(data.budget||'')+'%0ARecommended%20Path:%20'+encodeURIComponent(r.rec)+'%0A%0APlease%20help%20me%20choose%20the%20right%20next%20step.';
      send.textContent='Send This to Self Entourage';
      a.appendChild(send);
      body.appendChild(a);
    }
  });
})();