<template>

<div class="clock-box">


<div class="date">
🌸 {{dateStr}} ⏰
</div>



<div class="time">


<div class="pair">

<FlipNum :num="hourStr[0]" />
<FlipNum :num="hourStr[1]" />

</div>


<span>:</span>


<div class="pair">

<FlipNum :num="minuteStr[0]" />
<FlipNum :num="minuteStr[1]" />

</div>


<span>:</span>


<div class="pair">

<FlipNum :num="secondStr[0]" />
<FlipNum :num="secondStr[1]" />

</div>



</div>


</div>


</template>



<script setup>

import {
ref,
computed,
onMounted,
onUnmounted
} from "vue"


import FlipNum from "./FlipNumGpt.vue"



const now=ref(new Date())


let timer



const hourStr=computed(()=>{

return String(now.value.getHours())
.padStart(2,"0")

})


const minuteStr=computed(()=>{

return String(now.value.getMinutes())
.padStart(2,"0")

})


const secondStr=computed(()=>{

return String(now.value.getSeconds())
.padStart(2,"0")

})




const dateStr=computed(()=>{


let d=now.value


let weeks=[
"星期日",
"星期一",
"星期二",
"星期三",
"星期四",
"星期五",
"星期六"
]


return `${d.getFullYear()}-${String(d.getMonth()+1).padStart(2,"0")}-${String(d.getDate()).padStart(2,"0")} ${weeks[d.getDay()]}`


})



onMounted(()=>{

timer=setInterval(()=>{

now.value=new Date()

},1000)

})


onUnmounted(()=>{

clearInterval(timer)

})

</script>



<style scoped>


.clock-box{


padding:

14px 18px;


background:#fff0f7;


border-radius:20px;


display:flex;

flex-direction:column;

align-items:center;


gap:12px;



box-shadow:

0 8px 25px

rgba(220,100,150,.18);


}



.date{


font-size:14px;

color:#c8689c;

}



.time{


display:flex;

align-items:center;


gap:6px;


}



.pair{


display:flex;

gap:4px;


}



.time>span{


font-size:24px;

font-weight:800;

color:#d14d88;


}




</style>