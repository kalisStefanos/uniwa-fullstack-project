<script setup>
// Hardcoded placeholders for now.
// Later, replace the empty-state text in each card with a v-for over real data.
</script>

<template>
  <div class="max-w-6xl mx-auto">
    <header class="mb-8">
      <h1 class="text-3xl font-bold">Dashboard</h1>
      <p class="mt-1 text-gray-500">What's new since your last visit.</p>
    </header>

    <div class="grid gap-6 md:grid-cols-2">
      <!-- Admin: payments received in buildings you manage -->
      <section class="rounded-lg border border-gray-200 bg-white p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold">New payments</h2>
            <p class="text-sm text-gray-500">Buildings you manage</p>
          </div>
          <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600">
            0
          </span>
        </div>

        <div class="mt-6 flex items-center gap-3 rounded-md bg-green-50 px-4 py-3 text-green-800">
          <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-green-500"></span>
          <p class="text-sm">All bills are paid.</p>
        </div>

        <!-- Example row for when there is data:
        <ul class="mt-6 divide-y divide-gray-100">
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="text-sm font-medium">Apartment 4B · Maintenance</p>
              <p class="text-xs text-gray-500">Oak Street 12 · 2 hours ago</p>
            </div>
            <span class="text-sm font-semibold text-green-700">€45.00</span>
          </li>
        </ul>
        -->
      </section>

      <!-- Tenant: bills issued for your apartment -->
      <section class="rounded-lg border border-gray-200 bg-white p-5">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold">New bills</h2>
            <p class="text-sm text-gray-500">Your apartment</p>
          </div>
          <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600">
            0
          </span>
        </div>

        <div class="mt-6 flex items-center gap-3 rounded-md bg-gray-50 px-4 py-3 text-gray-700">
          <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400"></span>
          <p class="text-sm">You have no new bills.</p>
        </div>

        <!-- Example row for when there is data:
        <ul class="mt-6 divide-y divide-gray-100">
          <li class="flex items-center justify-between py-3">
            <div>
              <p class="text-sm font-medium">Heating · October</p>
              <p class="text-xs text-gray-500">Due Nov 5</p>
            </div>
            <span class="text-sm font-semibold">€62.50</span>
          </li>
        </ul>
        -->
      </section>

      <!-- Messages: full width -->
      <section class="rounded-lg border border-gray-200 bg-white p-5 md:col-span-2">
        <div class="flex items-start justify-between gap-4">
          <div>
            <h2 class="text-lg font-semibold">Messages</h2>
            <p class="text-sm text-gray-500">From building admins and tenants</p>
          </div>
          <span class="rounded-full bg-gray-100 px-2.5 py-0.5 text-sm font-medium text-gray-600">
            0
          </span>
        </div>

        <div class="mt-6 flex items-center gap-3 rounded-md bg-gray-50 px-4 py-3 text-gray-700">
          <span class="h-2.5 w-2.5 shrink-0 rounded-full bg-gray-400"></span>
          <p class="text-sm">No new messages.</p>
        </div>

        <!-- Example row for when there is data:
        <ul class="mt-6 divide-y divide-gray-100">
          <li class="flex items-start gap-3 py-3">
            <div class="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-blue-100 text-sm font-semibold text-blue-700">
              MK
            </div>
            <div class="min-w-0">
              <p class="text-sm font-medium">Maria K. <span class="font-normal text-gray-500">· Apartment 2A</span></p>
              <p class="truncate text-sm text-gray-600">The elevator is out of order again, could you check?</p>
            </div>
          </li>
        </ul>
        -->
      </section>
    </div>
  </div>
</template>