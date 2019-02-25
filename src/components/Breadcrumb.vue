<template>
    <div>
        <template v-for="(val , index) in items" >
            
            <!-- <v-chip  label outline color="red">{{val}} - {{index}} </v-chip>  -->
            <!-- <v-chip   v-else label outline color="red">{{val}} - {{index}} </v-chip> -->
            <!-- <span v-if="items.length !== index + 1 ">{{val}} - {{index}} / </span>
            <span v-else>{{val}} - {{index}}  </span> -->
            <a><span STYLE="color: blue darken-3; font-size: 20pt"  @click="breadClick(val.href , val.text)">{{val.text}}</span></a>
           
           <span STYLE="color: black; font-size: 20pt" v-if="items.length !== index + 1"> / </span>
        </template>
    </div>
</template>

<script>

import { ACTION_NAMES } from "@/store/action_name";

export default {
    props:{
        items : Array
    },
    data : () => {
        return {
            // items : ['A' , 'B' , 'C']
        }
    },
    methods:{
        breadClick(href , text){
            let eles = this.$props.items
            console.log("breadClick:" + eles)
            this.$router.replace(href)
            let goto = '/'
            for(let idx in eles){
                goto += eles[idx].text + '/'
                //需要判断 当前点击对象 text === for循环
                if(eles[idx].text === text){
                    break;
                }
            }
            
            this.$store.dispatch(ACTION_NAMES.CHANGE_DIR, goto);
        }
    }
}
</script>

<style scope="this api replaced by slot-scope in 2.5.0+">

</style>
