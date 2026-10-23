<script setup>
    import axios from 'axios';

    const props = defineProps({
        bill: {
            type: Object,
            required: true
        },
        accessLevel:{
            type: String,
            required: true
        }
    });

    const markBillAsPaid = async () => {
        try{
            const res = await axios.post(`/api/bills/${props.bill.id}/pay`);
            if(res.status === 200){
                props.bill.paid = true;
            }
        }catch(err){
            console.error(err);
        }
    }

</script>

<template>
    <div class="w-full bg-teal text-lg flex justify-between items-center rounded border p-2 gap-2">
        <span class="flex items-center gap-2" :title="'Description: ' + bill.expenseReport.description">
            <i class="pi pi-clipboard"></i>
            <span class="w-64 info">
                {{bill.expenseReport.description}}
            </span>
        </span>
        <span class="flex items-center gap-2">
            <i class="pi pi-money-bill"></i> 
            <span class="max-w-32 info">
                {{Number(bill.amount).toFixed(2) }}€
            </span>
        </span>

        <span v-if="accessLevel === 'owner'">
            <button v-if="bill.paid" disabled class="button disabled:bg-gray-300 disabled:text-gray-500
         disabled:cursor-default disabled:hover:bg-gray-300">
                Paid
            </button>
            <button @click="markBillAsPaid" v-else class="button">
                Pay
            </button>
        </span>
        
        <span v-if="accessLevel === 'admin'">
            <button v-if="bill.paid" disabled class="button disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-default disabled:hover:bg-gray-300">
                Paid
            </button>
            <button @click="markBillAsPaid" v-else class="button">
                Mark as Paid
            </button>
        </span>
    </div>

</template>