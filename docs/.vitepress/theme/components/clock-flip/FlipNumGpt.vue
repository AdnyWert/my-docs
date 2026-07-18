<template>
  <div class="flip-num">

    <!-- 当前数字 -->
    <div class="half top">
      <span>{{ current }}</span>
    </div>

    <div class="gap"></div>

    <div class="half bottom">
      <span>{{ current }}</span>
    </div>


    <!-- 翻页旧数字 -->
    <div
      v-if="animating"
      class="old-page"
    >

      <div class="old-top">
        <span>{{ old }}</span>
      </div>

      <div class="old-bottom">
        <span>{{ old }}</span>
      </div>

    </div>


  </div>
</template>


<script setup>

import {
ref,
watch,
nextTick
} from "vue"


const props = defineProps({
 num:{
  type:[String,Number],
  required:true
 }
})


const current=ref(
 String(props.num)
)


const old=ref(
 String(props.num)
)


const animating=ref(false)



watch(
 ()=>props.num,
 async(newVal)=>{


 if(String(newVal)===current.value)
 return


 old.value=current.value

 current.value=String(newVal)


 await nextTick()


 animating.value=true


 setTimeout(()=>{

 animating.value=false

 },650)


 }

)

</script>



<style scoped>


.flip-num{

width:42px;
height:54px;

position:relative;

perspective:500px;

}



.half{

position:absolute;

left:0;

width:100%;

height:calc(50% - 2.5px);

background:#ffd7e8;

display:flex;

justify-content:center;

align-items:center;

overflow:hidden;

font-size:24px;

font-weight:800;

color:#c94d83;

border-radius:8px;


box-shadow:
0 3px 8px rgba(200,80,130,.15);

}



.top{

top:0;

}


.bottom{

bottom:0;

background:#fbc5dc;

}



.half span{

line-height:1;

}



.top span{

transform:
translateY(50%);

}



.bottom span{

transform:
translateY(-50%);

}




.gap{

position:absolute;

top:50%;

height:5px;

width:100%;

background:#fff1f7;

z-index:10;

}





.old-page{

position:absolute;

inset:0;

z-index:20;

}



.old-top{

position:absolute;

top:0;

height:50%;

width:100%;

background:#ffd7e8;

overflow:hidden;

transform-origin:center bottom;

animation:
topFlip .65s ease forwards;

}



.old-bottom{

position:absolute;

bottom:0;

height:50%;

width:100%;

background:#fbc5dc;

overflow:hidden;

}



.old-top span,
.old-bottom span{


position:absolute;

font-size:24px;

font-weight:800;

color:#c94d83;


left:50%;


}



.old-top span{

top:50%;

transform:
translate(-50%,-50%);

}



.old-bottom span{

bottom:50%;

transform:
translate(-50%,50%);

}




@keyframes topFlip{


0%{

transform:
rotateX(0deg);

}


100%{

transform:
rotateX(-180deg);

}

}



</style>