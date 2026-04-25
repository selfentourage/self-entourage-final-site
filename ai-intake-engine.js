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
    wrap.innerHTML='<div class="se-ai-card"><div class="se-ai-head"><button class="se-ai-close" aria-label="Close">×</button><strong>Find Your Best Path</strong><span>Answer a few quick questions and get routed to the right offer.</span><div class="se-ai-progress"><i></i></div></div><div class="se-ai-body"></div></div>';
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
      var rec={
        title:'Foundation Snapshot',
        type:'Clarity Offer',
        href:'product-foundation-snapshot.html',
        label:'View Foundation Snapshot',
        why:'You need a clean diagnostic before choosing a bigger build.',
        next:'Start with a snapshot so the next move is based on the real system gaps.'
      };

      if(data.need==='Clarity / Direction' && data.time==='Today / ASAP'){
        rec={title:'Crown Consult 30',type:'Strategy Session',href:'product-crown-consult-30.html',label:'Book Crown Consult 30',why:'You need fast direction from a live strategy session.',next:'Book the 30-minute session and bring one clear situation to solve.'};
      } else if(data.need==='Clarity / Direction' && data.budget==='Under $100'){
        rec={title:'15-Minute Consultation',type:'Quick Start',href:'product-15-minute-consultation.html',label:'Book 15-Minute Consultation',why:'You need a low-friction route check before committing to a larger offer.',next:'Use the quick consultation to identify whether you should learn, build, or deploy next.'};
      } else if(data.need==='Clarity / Direction'){
        rec={title:'Foundation Snapshot',type:'Diagnostic',href:'product-foundation-snapshot.html',label:'Get Foundation Snapshot',why:'You need structure and direction before a bigger purchase.',next:'Complete the snapshot intake so the right path can be mapped.'};
      }

      if(data.need==='More Sales'){
        rec={title:'Builder Pack',type:'Best First Move',href:'product-builder-pack.html',label:'View Builder Pack',why:'You need offer movement, funnel structure, and a practical starter build.',next:'Use Builder Pack to move from scattered ideas into a clearer buyer path.'};
        if(data.stage==='Growing Business' || data.budget==='$500-$2k') rec={title:'Neverloop Prime Launch',type:'Revenue System',href:'product-neverloop-prime-launch.html',label:'View Neverloop Prime Launch',why:'You need payments, offers, and delivery logic connected so sales can move cleanly.',next:'Start with the launch system if you are ready to wire revenue and fulfillment.'};
      }

      if(data.need==='Automation / Systems'){
        rec={title:'System Forge',type:'System Build',href:'product-system-forge.html',label:'View System Forge',why:'You need one major workflow turned into a usable system.',next:'Start with System Forge when one area needs to be mapped, built, and handed off.'};
        if(data.budget==='$2k+' || data.stage==='Established Operator') rec={title:'Sovereign AI Package',type:'Premium AI Build',href:'product-sovereign-ai-package.html',label:'View Sovereign AI Package',why:'You are ready for AI infrastructure, operating logic, and system-level support.',next:'Use this when AI needs to become the operating layer behind the business.'};
      }

      if(data.need==='Premium Brand Presence'){
        rec={title:'Codex Command System',type:'Brand OS',href:'product-codex-command-system.html',label:'View Codex Command System',why:'Your brand needs a language base, prompt vault, and consistent execution layer.',next:'Use the Codex build when the brand needs to sound and operate consistently.'};
        if(data.budget==='Under $100') rec={title:'Signal Drop Package',type:'Content Starter',href:'product-signal-drop-package.html',label:'View Signal Drop Package',why:'You need a sharper public signal without a large build yet.',next:'Start with a signal drop to improve the next post, caption, or campaign.'};
      }

      if(data.need==='Custom Build Help' || data.stage==='Established Operator' || data.budget==='$2k+'){
        rec={title:'Ascension Build',type:'Advanced System Build',href:'product-ascension-build.html',label:'View Ascension Build',why:'Your answers suggest a larger connected system instead of a small isolated product.',next:'Review Ascension Build or send a direction request if the scope needs confirmation first.'};
      }

      if(data.stage==='Idea Stage' && data.budget==='Under $100'){
        rec={title:'AI Foundations Class',type:'Learning Start',href:'product-ai-foundations-class.html',label:'View AI Foundations Class',why:'You are early enough that learning the foundation may be smarter than buying a big build.',next:'Take the class, then come back to the Store when you know what you want to build.'};
      }

      return rec;
    }

    function render5(){
      var r=getRecommendation();
      var payload={need:data.need,stage:data.stage,time:data.time,budget:data.budget,recommendation:r.title,type:r.type,href:r.href,page:(location.pathname.split('/').pop()||'index.html'),ts:new Date().toISOString()};
      try{localStorage.setItem('se_ai_intake',JSON.stringify(payload));}catch(e){}
      body.innerHTML='<div class="se-ai-step is-active"><h3>Recommended Offer</h3><div class="se-ai-result"><strong>'+r.type+'</strong><span>'+r.title+'</span></div><div class="se-ai-result"><strong>Why This Fits</strong><span>'+r.why+'</span></div><div class="se-ai-result"><strong>Next Step</strong><span>'+r.next+'</span></div></div>';
      var a=d.createElement('div');
      a.className='se-ai-actions';
      var go=d.createElement('a');
      go.className='primary';
      go.href=r.href;
      go.textContent=r.label;
      a.appendChild(go);
      var store=d.createElement('a');
      store.href='store.html';
      store.textContent='Compare Store Options';
      a.appendChild(store);
      var again=d.createElement('button');
      again.type='button';
      again.textContent='Start Over';
      again.onclick=restart;
      a.appendChild(again);
      var send=d.createElement('a');
      send.href='mailto:selfentourage@gmail.com?subject=Self%20Entourage%20Offer%20Match&body=I%20completed%20the%20path%20finder.%0A%0ANeed:%20'+encodeURIComponent(data.need||'')+'%0AStage:%20'+encodeURIComponent(data.stage||'')+'%0ATimeline:%20'+encodeURIComponent(data.time||'')+'%0ABudget:%20'+encodeURIComponent(data.budget||'')+'%0ARecommended%20Offer:%20'+encodeURIComponent(r.title)+'%0A%0APlease%20confirm%20whether%20this%20is%20the%20right%20next%20step.';
      send.textContent='Send Match to Self Entourage';
      a.appendChild(send);
      body.appendChild(a);
    }
  });
})();