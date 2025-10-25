<script setup>

</script>
 
<template>
<div class="w-full bg-black border-red-600 shadow-2xl ">
    <div class="lg:px-8">
        <div class="flex items-center justify-between py-2">
            <div class="flex items-center gap-5">
                <div>
                    <slot name="logo">default logo</slot>
                </div>

                <div class="flex flex-col leading-none">
                    <div class="text-xl font-extrabold text-black bg-red-600 rounded-md p-1 w-15 h-10 text-center">
                        <slot name="title">THE MOVIE CRITIC</slot>
                    </div>
                    <div class="text-sm text-white font-medium italic mt-1">
                        <slot name="subtitle">Your Honest Film Reviews</slot>
                    </div>
                </div>
            </div>
            <div>
              <input type="text" class="border   rounded-md p-1 bg-white w-150" placeholder="Search..." autofocus >
            </div>
            <nav class="hidden md:flex space-x-4">
                <a href="#" class="text-sm font-medium text-white hover:text-red-500 transition duration-300">Home</a>
                <a href="#" class="text-sm font-medium text-white hover:text-red-500 transition duration-300">New Movies</a>
                <a href="#" class="text-sm font-medium text-white hover:text-red-500 transition duration-300">Articles</a>
                <a href="#" class="text-sm font-medium text-white hover:text-red-500 transition duration-300">About Us</a>
            </nav>
            </div>
    </div>
</div>
</template>
 
<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Oswald:wght@200..700&display=swap');

* {
  font-family: 'Oswald', sans-serif;
}

</style>