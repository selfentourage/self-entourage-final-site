/* Self Entourage Phase 5 AI Intake Engine */
(function(){
  'use strict';
  var d=document;
  function ready(f){if(d.readyState!=='loading')f();else d.addEventListener('DOMContentLoaded',f);}
  ready(function(){
    var launch=d.createElement('button');
    launch.type='button';
    launch.className='se-ai-intake-launch';
    launch.innerHTML='🧭 <span>Find My Path</span>';
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
      opts.forEach(function(item){
        var value=Array.isArray(item)?item[0]:item;
        var label=Array.isArray(item)?item[1]:item;
        var note=Array.isArray(item)?item[2]:'';
        var b=d.createElement('button');
        b.type='button';
        b.innerHTML='<span><b>'+label+'</b>'+(note?'<em>'+note+'</em>':'')+'</span><small>→</small>';
        if(data[key]===value)b.classList.add('is-selected');
        b.onclick=function(){data[key]=value;nav(step+1);};
        box.appendChild(b);
      });
      body.appendChild(box);
    }

    function backOnly(){
      var a=d.createElement('div');
      a.className='se-ai-actions';
      var b=d.createElement('button');
      b.type='button';
      b.textContent='Back';
      b.onclick=function(){nav(step-1);};
      a.appendChild(b);
      body.appendChild(a);
    }

    function render1(){
      body.innerHTML='<div class="se-ai-step is-active"><h3>What do you need most?</h3><p>Choose the closest match. The answer routes you toward the cleanest next step.</p></div>';
      buttons([
        ['Clarity / Direction','Clarity / Direction','I need to know what to do first.'],
        ['More Sales','More Sales','I need offers, buyers, or stronger conversion.'],
        ['Automation / Systems','Automation / Systems','I need workflows, structure, or tools connected.'],
        ['Premium Brand Presence','Premium Brand Presence','I need the brand to look sharper and feel credible.'],
        ['Custom Build Help','Custom Build Help','I need something scoped around my exact situation.']
      ],'need');
    }
    function render2(){
      body.innerHTML='<div class="se-ai-step is-active"><h3>What stage are you in?</h3><p>This separates quick support from deeper system work.</p></div>';
      buttons([
        ['Idea Stage','Idea Stage','The concept exists, but the structure is not built yet.'],
        ['Early Revenue','Early Revenue','There is movement, but the system needs clarity.'],
        ['Growing Business','Growing Business','The work is real and needs better infrastructure.'],
        ['Established Operator','Established Operator','The system needs custom strategy or expansion.']
      ],'stage');
      backOnly();
    }
    function render3(){
      body.innerHTML='<div class="se-ai-step is-active"><h3>When do you need movement?</h3><p>Pick the timeline that feels most honest.</p></div>';
      buttons([
        ['Today / ASAP','Today / ASAP','I need direction immediately.'],
        ['This Week','This Week','I am ready to move soon.'],
        ['This Month','This Month','I am planning the next phase.'],
        ['Exploring','Exploring','I am still learning what fits.']
      ],'time');
      backOnly();
    }
    function render4(){
      body.innerHTML='<div class="se-ai-step is-active"><h3>What budget range feels realistic?</h3><p>This keeps the recommendation practical instead of oversized.</p></div>';
      buttons([
        ['Under $100','Under $100','Start small or learn first.'],
        ['$100-$500','$100–$500','Consult, snapshot, class, or first build step.'],
        ['$500-$2k','$500–$2k','Stronger strategy or build support.'],
        ['$2k+','$2k+','Custom implementation or advanced system work.']
      ],'budget');
      backOnly();
    }

    function getRecommendation(){
      var rec='Start Here', href='start-here.html', label='Start Here';
      var why='You need the cleanest first step before choosing a product or build path.';
      var next='Use the guided starting page, then choose the offer that matches your situation.';

      if(data.need==='Clarity / Direction'){
        rec='Start Here'; href='start-here.html'; label='Go to Start Here';
        why='Your answers point to direction first. A bigger purchase should come after the path is clear.';
        next='Start with the guided page or choose Foundation Snapshot / Crown Consult from the Store.';
      }
      if(data.need==='More Sales'){
        rec='Store'; href='store.html#best-sellers'; label='View Best First Moves';
        why='You are looking for momentum, offer clarity, and a direct buying path.';
        next='Review Best First Moves, then choose the offer that matches your current stage.';
      }
      if(data.need==='Premium Brand Presence'){
        rec='Store'; href='store.html#build-offers'; label='View Build Offers';
        why='A stronger brand presence usually needs a structured offer, system, or brand build behind it.';
        next='Start with Build Offers or use Contact if the brand work needs custom scoping.';
      }
      if(data.need==='Automation / Systems'){
        rec='Build'; href='build.html'; label='Go to Build';
        why='You are asking for structure, workflows, and implementation logic.';
        next='Compare System Forge, Sovereign AI Package, and Ascension Build.';
      }
      if(data.need==='Custom Build Help' || data.stage==='Established Operator' || data.budget==='$2k+'){
        rec='Contact'; href='contact.html'; label='Send Direction Request';
        why='Your answers suggest custom scoping is smarter than guessing from a product card.';
        next='Send a direction request so Self Entourage can match the right build path before you commit.';
      }
      if(data.budget==='Under $100' && data.need!=='Custom Build Help'){
        rec='Store'; href='store.html#quick-wins'; label='View Quick Wins';
        why='A lower-risk starting point is the best fit right now.';
        next='Start with Quick Wins, classes, or a short consultation before moving into larger work.';
      }
      return {rec:rec,href:href,why:why,next:next,label:label};
    }

    function render5(){
      var r=getRecommendation();
      var payload={need:data.need,stage:data.stage,time:data.time,budget:data.budget,recommendation:r.rec,page:(location.pathname.split('/').pop()||'index.html'),ts:new Date().toISOString()};
      try{localStorage.setItem('se_ai_intake',JSON.stringify(payload));}catch(e){}
      body.innerHTML='<div class="se-ai-step is-active"><h3>Recommended Path</h3><div class="se-ai-result"><strong>'+r.rec+'</strong><span>'+r.why+'</span></div><div class="se-ai-result"><strong>Next Step</strong><span>'+r.next+'</span></div></div>';
      var a=d.createElement('div');
      a.className='se-ai-actions';
      var go=d.createElement('a');
      go.className='primary';
      go.href=r.href;
      go.textContent=r.label;
      a.appendChild(go);
      var again=d.createElement('button');
      again.type='button';
      again.textContent='Start Over';
      again.onclick=restart;
      a.appendChild(again);
      var send=d.createElement('a');
      send.href='mailto:selfentourage@gmail.com?subject=Self%20Entourage%20Direction%20Request&body=I%20completed%20the%20path%20finder.%0A%0ANeed:%20'+encodeURIComponent(data.need||'')+'%0AStage:%20'+encodeURIComponent(data.stage||'')+'%0ATimeline:%20'+encodeURIComponent(data.time||'')+'%0ABudget:%20'+encodeURIComponent(data.budget||'')+'%0ARecommended%20Path:%20'+encodeURIComponent(r.rec)+'%0A%0APlease%20help%20me%20choose%20the%20right%20next%20step.';
      send.textContent='Send to Self Entourage';
      a.appendChild(send);
      body.appendChild(a);
    }
  });
})();