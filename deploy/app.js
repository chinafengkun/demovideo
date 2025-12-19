const students=[{id:1,name:'张明轩',checkedIn:true,onLeave:false},{id:2,name:'李雨欣',checkedIn:true,onLeave:false},{id:3,name:'王浩然',checkedIn:false,onLeave:false},{id:4,name:'陈思琪',checkedIn:true,onLeave:false},{id:5,name:'刘子涵',checkedIn:true,onLeave:false},{id:6,name:'赵天宇',checkedIn:false,onLeave:false},{id:7,name:'孙梦洁',checkedIn:true,onLeave:false},{id:8,name:'周博文',checkedIn:true,onLeave:false},{id:9,name:'吴雨桐',checkedIn:false,onLeave:true},{id:10,name:'郑俊杰',checkedIn:true,onLeave:false},{id:11,name:'林诗涵',checkedIn:true,onLeave:false},{id:12,name:'杨晨曦',checkedIn:false,onLeave:false},{id:13,name:'黄嘉怡',checkedIn:true,onLeave:false},{id:14,name:'徐文博',checkedIn:true,onLeave:false},{id:15,name:'朱雨婷',checkedIn:false,onLeave:false},{id:16,name:'马志强',checkedIn:true,onLeave:false},{id:17,name:'胡晓雯',checkedIn:true,onLeave:false},{id:18,name:'郭子轩',checkedIn:false,onLeave:true},{id:19,name:'何佳琪',checkedIn:true,onLeave:false},{id:20,name:'罗文昊',checkedIn:true,onLeave:false},{id:21,name:'梁思颖',checkedIn:false,onLeave:false},{id:22,name:'宋宇航',checkedIn:true,onLeave:false},{id:23,name:'唐雨萱',checkedIn:true,onLeave:false},{id:24,name:'许子豪',checkedIn:false,onLeave:false}];function updateDateTime(){const now=new Date();const dateStr=now.toLocaleDateString('zh-CN',{year:'numeric',month:'long',day:'numeric'});const timeStr=now.toLocaleTimeString('zh-CN',{hour:'2-digit',minute:'2-digit',second:'2-digit'});const dateElement=document.getElementById('current-date');const timeElement=document.getElementById('current-time');if(dateElement)dateElement.textContent=dateStr;if(timeElement)timeElement.textContent=timeStr;}
function renderStudentList(){const studentList=document.getElementById('student-list');if(!studentList)return;studentList.innerHTML='';students.forEach(student=>{const studentItem=document.createElement('div');let statusClass='';if(student.onLeave){statusClass='on-leave';}else if(student.checkedIn){statusClass='checked-in';}else{statusClass='not-checked-in';}
studentItem.className=`student-item ${statusClass}`;studentItem.dataset.testid=`student-${student.id}`;studentItem.innerHTML=`
            <div style="font-weight: bold; margin-bottom: 5px;">${student.name}</div>
            <div style="font-size: 0.9em;">
                ${student.onLeave ? 
                    '<span class="material-icons" style="color: #ffc107; font-size: 16px;">event_busy</span> 请假' : 
                    student.checkedIn ? 
                    '<span class="material-icons" style="color: #17a2b8; font-size: 16px;">check_circle</span> 已签到' : 
                    '<span class="material-icons" style="color: #dc3545; font-size: 16px;">cancel</span> 未签到'}
            </div>
        `;studentItem.addEventListener('click',()=>toggleAttendance(student.id));studentList.appendChild(studentItem);});updateAttendanceStats();}
function toggleAttendance(studentId){const student=students.find(s=>s.id===studentId);if(student&&!student.onLeave){student.checkedIn=!student.checkedIn;renderStudentList();}else if(student&&student.onLeave){showToast('该学生已请假，无法修改签到状态');}}
function updateAttendanceStats(){const checkedCount=students.filter(s=>s.checkedIn).length;const leaveCount=students.filter(s=>s.onLeave).length;const totalCount=students.length;const notCheckedCount=totalCount-checkedCount-leaveCount;const availableCount=totalCount-leaveCount;const rate=availableCount>0?Math.round((checkedCount/availableCount)*100):0;const checkedElement=document.getElementById('checked-count');const notCheckedElement=document.getElementById('not-checked-count');const leaveElement=document.getElementById('leave-count');const rateElement=document.getElementById('attendance-rate');const expectedElement=document.getElementById('expected-count');if(checkedElement)checkedElement.textContent=checkedCount;if(notCheckedElement)notCheckedElement.textContent=notCheckedCount;if(leaveElement)leaveElement.textContent=leaveCount;if(rateElement)rateElement.textContent=rate+'%';if(expectedElement)expectedElement.textContent=totalCount+'人';}
function navigateTo(page){showToast(`正在跳转到${getPageName(page)}...`);}
function getPageName(page){const pageNames={'home':'教师首页','schedule':'课程表','homework':'作业情况','weekly':'周计划','grades':'成绩管理','attendance':'考勤记录','students':'学生管理','resources':'教学资源','notifications':'通知公告','settings':'设置'};return pageNames[page]||page;}
function handleLogout(){if(confirm('确定要登出吗？')){showToast('正在登出...');setTimeout(()=>{showToast('已成功登出');},1000);}}
function handleClose(){if(confirm('确定要关闭签到系统吗？')){showToast('正在关闭...');setTimeout(()=>{showToast('签到系统已关闭');},1000);}}
function showToast(message){const existingToast=document.querySelector('.toast');if(existingToast){existingToast.remove();}
const toast=document.createElement('div');toast.className='toast';toast.textContent=message;toast.style.cssText=`
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: rgba(0, 0, 0, 0.8);
        color: white;
        padding: 12px 24px;
        border-radius: 25px;
        z-index: 1000;
        font-size: 14px;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;document.body.appendChild(toast);setTimeout(()=>{toast.style.opacity='1';},10);setTimeout(()=>{toast.style.opacity='0';setTimeout(()=>{if(toast.parentNode){toast.parentNode.removeChild(toast);}},300);},2000);}
function initBottomNav(){const bottomSection=document.querySelector('.bottom-section');if(!bottomSection)return;let isDown=false;let startX;let scrollLeft;bottomSection.addEventListener('mousedown',(e)=>{isDown=true;startX=e.pageX-bottomSection.offsetLeft;scrollLeft=bottomSection.scrollLeft;});bottomSection.addEventListener('mouseleave',()=>{isDown=false;});bottomSection.addEventListener('mouseup',()=>{isDown=false;});bottomSection.addEventListener('mousemove',(e)=>{if(!isDown)return;e.preventDefault();const x=e.pageX-bottomSection.offsetLeft;const walk=(x-startX)*2;bottomSection.scrollLeft=scrollLeft-walk;});let touchStartX=0;bottomSection.addEventListener('touchstart',(e)=>{touchStartX=e.touches[0].clientX;});bottomSection.addEventListener('touchmove',(e)=>{const touchX=e.touches[0].clientX;const diff=touchStartX-touchX;bottomSection.scrollLeft+=diff*0.5;touchStartX=touchX;});}
document.addEventListener('DOMContentLoaded',function(){updateDateTime();setInterval(updateDateTime,1000);renderStudentList();initBottomNav();const container=document.getElementById('container');if(container){container.style.opacity='0';container.style.transition='opacity 0.5s ease';setTimeout(()=>{container.style.opacity='1';},100);}
setInterval(()=>{const randomStudent=students[Math.floor(Math.random()*students.length)];if(Math.random()>0.8&&!randomStudent.checkedIn){randomStudent.checkedIn=true;renderStudentList();showToast(`${randomStudent.name} 刚刚签到`);}},10000);});