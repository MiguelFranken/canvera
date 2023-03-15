<template>
  <div class="space-y-12 p-6">
    <ClientOnly>
      <AuthoredGallery />
      <ReceivedGallery />
    </ClientOnly>
  </div>
</template>

<style lang="scss" scoped></style>

<route lang="yaml">
meta:
  layout: default
  title: Collection
</route>
