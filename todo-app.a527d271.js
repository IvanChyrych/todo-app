function e(e){localStorage.setItem("todoItem",JSON.stringify(e))}const t=document.querySelector("#save-todo-button"),o=document.querySelector("#title"),r=document.querySelector("#discription"),n=document.querySelector("#column"),c=document.querySelector(".trello__cards"),d=document.querySelector("#edit-save-todo-button"),l=document.querySelector("#trello__button-delete-all"),i=document.querySelector(".trello__todo-counter"),a=document.querySelector(".trello__inprogress-counter"),u=document.querySelector(".trello__done-counter"),s=document.querySelector(".trello__clock-hours"),m=document.querySelector(".trello__clock-minutes"),v=document.querySelector(".select__user"),_=document.querySelector(".select__user-edit");let S=[];const p=function(){let e=localStorage.getItem("todoItem");return e?JSON.parse(e).map(e=>e):[]}();g(p);let f=null;t.addEventListener("click",function(){let t=Date.now(),c=n.value,d=o.value,l=new y(t,c,d,r.value,v.value);if("in-progress"===c&&p.filter(e=>"in-progress"===e.column).length>=6)return void alert("too much tasks!");p.push(l),e(p),g(p)}),c.addEventListener("click",function({target:t}){let{role:o}=t.dataset;if("remove"!==o)return;let{id:r}=t.closest(".card").dataset,n=p.findIndex(e=>e.id==r);p.splice(n,1),e(p),g(p)}),c.addEventListener("click",function({target:e}){if("edit"!==e.dataset.role)return;let t=e.closest(".card").dataset.id,o=p.find(e=>e.id==t);f=t,document.querySelector("#edit-title").value=o.title,document.querySelector("#edit-discription").value=o.discription,document.querySelector("#edit-column").value=o.column,document.querySelector(".select__user-edit").value=o.user,new bootstrap.Modal(document.getElementById("editModal")).show()}),d.addEventListener("click",function(){let t=document.querySelector("#edit-title").value,o=document.querySelector("#edit-discription").value,r=document.querySelector("#edit-column").value,n=document.querySelector(".select__user-edit").value,c=p.findIndex(e=>e.id==f);if(-1===c)return void alert("Ошибка: задача не найдена!");p[c].title=t,p[c].discription=o,p[c].column=r,p[c].user=n,e(p),g(p),f=null}),l.addEventListener("click",function(){if(confirm("Delete all cards?")){let t=p.filter(e=>"done"!==e.column);p.length=0,t.forEach(e=>p.push(e)),e(p),g(p)}});class y{constructor(e,t,o,r,n){this.id=e,this.title=o,this.discription=r,this.column=t,this.createdAt=new Date,this.user=n}}function g(e){let t,o,r;document.querySelector(".trello__todo-container").innerHTML="",document.querySelector(".trello__inprogress-container").innerHTML="",document.querySelector(".trello__done-container").innerHTML="",e.forEach(e=>{let t="";"todo"===e.column?t=".trello__todo-container":"in-progress"===e.column?t=".trello__inprogress-container":"done"===e.column&&(t=".trello__done-container");let o=document.querySelector(t),r=function({id:e,title:t,discription:o,createdAt:r,user:n}){let c=new Date(r),d=S.find(e=>e.id==n),l=d?d.name:"unknown user";return`
        <div  data-id="${e}" class="card m-2 w-90" style="max-width:400px;">
        <button data-role="remove" class="btn btn-close"></button>
            <div class="card-body">
                <h5 class="card-title">${t}</h5>
                <p class="card-text">${o}</p>
                <p class="card-text">${l}</p>
                <div class="card__time d-flex">
                    <div class="card__time-day d-flex p-2">
                        <div class="card-createdAt">${c.getFullYear()}</div>
                        <div class="card-createdAt">.</div>
                        <div class="card-createdAt">${c.getMonth()}</div>
                        <div class="card-createdAt">.</div>
                        <div class="card-createdAt">${c.getDay()}</div>
                    </div>
                    <div class="card__time-hours d-flex p-2">
                        <div class="card-createdAt">${c.getHours().toString().padStart(2,"0")}</div>
                        <div class="card-createdAt">:</div>
                        <div class="card-createdAt">${c.getMinutes().toString().padStart(2,"0")}</div>
                    </div>
                </div>
            </div>
        <button data-role="edit" class="btn btn-warning">edit</button>
        </div>
    `}(e);o.insertAdjacentHTML("beforeend",r)}),t=0,o=0,r=0,p.forEach(e=>{"todo"==e.column&&(t+=1),"in-progress"==e.column&&(o+=1),"done"==e.column&&(r+=1)}),i.textContent=t,a.textContent=o,u.textContent=r}fetch("https://jsonplaceholder.typicode.com/users").then(e=>e.json()).then(e=>{var t;let o;S=t=e,o="",t.forEach(e=>{let t=function({id:e,name:t}){return`
    <option value="${e}">${t}</option>
    `}(e);o+=t}),v.insertAdjacentHTML("beforeend",o),_.insertAdjacentHTML("beforeend",o)}),setInterval(function(){let e=new Date,t=e.getHours().toString().padStart(2,"0"),o=e.getMinutes().toString().padStart(2,"0");s.textContent=`${t}`,m.textContent=`${o}`},100);
//# sourceMappingURL=todo-app.a527d271.js.map
