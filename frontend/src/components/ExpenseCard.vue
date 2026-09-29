<script setup>
    import {RouterLink} from 'vue-router';
    import { useRoute } from 'vue-router';

    const route = useRoute();
    const id = route.params.id; 

    const props = defineProps({
        expense: {
            type: Object,
            required: true
        }
    });

    const formatDate = (dateString) => {
        if (!dateString) return '—';
        const date = new Date(dateString);
        return new Intl.DateTimeFormat('el-GR', { // or 'en-GB', 'de-DE'
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
        }).format(date);
    };


</script>

<template>
    <div class="flex w-64 bg-teal border rounded-xl text-gray-800 p-2">
        <div class="flex flex-col gap-2 w-full">
            <span :class="['max-w-full w-full info', expense.paid ?  'text-gray-400': '']" :title="`${expense.category.name}`">
                <i class="pi pi-tag"></i> {{expense.category?.name}} {{ expense.paid ? "(paid)" : '' }}
            </span>
            <div class="flex justify-between items-center w-full">
                <span class="max-w-30 info" :title="Number(expense.amount).toFixed(2) +' €'">
                    <i class="pi pi-money-bill"></i>
                    {{Number(expense.amount).toFixed(2)}} €
                </span>
                <span class="max-w-30 info " :title="'Issued at: ' + formatDate(expense.issuedAt)">
                    <i class="pi pi-calendar-plus mr-1"></i>
                    <span class="text-xs">{{formatDate(expense.issuedAt)}}</span>
                </span>
                <i class="pi pi-question-circle cursor-help" :title="'Description: ' + expense.description"></i>
                <RouterLink to="#" title="View Expense" class="button rounded text-xs">
                    <i class="pi pi-eye"></i>
                </RouterLink>
            </div>
        </div>
    </div>
</template>