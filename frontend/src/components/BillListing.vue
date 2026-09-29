<script setup>
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

</script>

<template>
    <div class="w-full bg-teal text-lg flex justify-between items-center rounded border p-2">
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
        <button v-if="accessLevel === 'owner'" class="button">Pay</button>
        </div>

</template>