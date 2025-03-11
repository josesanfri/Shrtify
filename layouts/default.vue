<template>
    <main>
        <Header/>
        <slot></slot>
<<<<<<< HEAD
        <UNotifications />
=======
>>>>>>> e36d2c91c5e354aa0e9f0538b782229da2f9ddcb
        <Footer/>
    </main>
</template>

<style lang="sass">
.page-enter-active, .page-leave-active
  transition: all 0.4s

.page-enter-from, .page-leave-to
  opacity: 0
  filter: blur(1rem)
</style>