<template>
	<div>
		<div class="dragimg" @mousedown="mousedown" @mousemove="mousemove" @mouseup="mouseup" :style="{ left: drag.left + 'px', top: drag.top + 'px' }">
			<img src="/static/images/11.jpg" />
		</div>
	</div>
</template>
<script>
	module.exports = {
		data:function(){
			return {
				"drag":{"mousedown":0,"left":0,"top":0,"positionX":0,"positionY":0}
			}
		},
		methods:{
			mousedown:function(event){
				this.drag.mousedown = 1;
				event.preventDefault();
				this.drag.positionX = event.clientX - this.drag.left;
				this.drag.positionY = event.clientY - this.drag.top;
			},
			mousemove:function(event){
				if(this.drag.mousedown == 1){
					this.drag.left = event.clientX - this.drag.positionX;
					this.drag.top = event.clientY - this.drag.positionY;
				}
			},
			mouseup:function(event){
				this.drag.mousedown = 0;
				this.drag.positionX = 0;
				this.drag.positionY = 0;
			}
		}
	}
</script>
<style>
.dragimg{
	position: absolute;
	width: 400px;
	left: 0;
	top: 0;
}
</style>