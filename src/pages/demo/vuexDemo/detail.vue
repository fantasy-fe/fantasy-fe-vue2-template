<template>
    <div>
        <h1>Detail</h1>
        <ul>
            <li>
                <label>id: </label>
                <input type="text" v-model="productInfo.id" />
            </li>
            <li>
                <label>name: </label>
                <input type="text" v-model="productInfo.name" />
            </li>
            <li>
                <label>price: </label>
                <input type="text" v-model="productInfo.price" />
            </li>
        </ul>
        
        
    </div>
</template>

<script>
import { mapGetters } from 'vuex'

export default {
    
    data () {
        return {
            title: 'detail page',
            detailId: '',
            productInfo: {
                id: '',
                name: '',
                price: ''
            }
        }
    },

    computed: {
        ...mapGetters([
            'getProdList',
            'getProdInfo'
        ])
    },

    mounted() {
        this.initParams();
        this.fetchData();
    },

    methods : {
        initParams () {
            this.detailId = this.$route.query.id;
        },

        fetchData () {
            const self = this;
            const info = this.getProdInfo 
            if(info){
                this.productInfo = info;
            }
            
            console.info('detail: ', this.productInfo);
            
            //const detail = list.filter((item) => { return item.id === self.detailId});
            //console.info(detail);
        }
    }
}
</script>

<style>

</style>
