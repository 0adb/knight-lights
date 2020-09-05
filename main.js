
var store = {
    debug: true,
    state: {
      value: 
      [[true, true, true, true, true, true, true, true], 
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true], 
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true], 
      [true, true, true, true, true, true, true, true],
      [true, true, true, true, true, true, true, true], 
      [true, true, true, true, true, true, true, true]]
    },
    flipAction (row, col) { 
      if (this.debug) console.log("flipAction with row/col: ", row, col)
      var newRow = this.state.value[row].slice(0)  
      newRow[col] = !newRow[col] 
      Vue.set(this.state.value, row, newRow)
      if (0 < row) {
        newRow = this.state.value[row-1].slice(0)  
        if (1 < col) {
            newRow[col - 2] = !newRow[col - 2]
        }
        if (col < 6) {
            newRow[col + 2] = !newRow[col + 2]
        }
        Vue.set(this.state.value, row -1, newRow)

        if (1 < row) {
            newRow = this.state.value[row- 2].slice(0)  
            if (0 < col) {
                newRow[col - 1] = !newRow[col - 1]
            }
            if (col < 7) {
                newRow[col + 1] = !newRow[col + 1]
            }
            Vue.set(this.state.value, row -2, newRow)
            }
      }
    
    if (row < 7) {
        newRow = this.state.value[row+1].slice(0)  
        if (1 < col) {
            newRow[col - 2] = !newRow[col - 2]
        }
        if (col < 6) {
            newRow[col + 2] = !newRow[col + 2]
        }
        Vue.set(this.state.value, row +1, newRow)

        if (row < 6) {
            newRow = this.state.value[row+ 2].slice(0)  
            if (0 < col) {
                newRow[col - 1] = !newRow[col - 1]
            }
            if (col < 7) {
                newRow[col + 1] = !newRow[col + 1]
            }
            Vue.set(this.state.value, row +2, newRow)
            }
      }
    }
}
Vue.component('light', {
    props: ['row', 'col'],
    data: function () {
      return { 
        sharedState: store.state 
      }
    },
    template: '<button v-on:click="flip" class="light" v-bind:class="{active:this.sharedState.value[this.row][this.col]}"></button>',
    // <span v-if="this.sharedState.value[this.row][this.col]">Apple</span>
    methods:  {flip: function (event) {  
        store.flipAction(this.row, this.col)
    }}
})

Vue.component('row', {
    props: ['r'],
    template: 
    `<div class="row">  
        <light v-for='n in 8' v-bind='gridrow(n - 1)'></light>  
    </div>`,
    methods: {gridrow: function (n) {
            return {
                row: this.r,
                col: n,
                id: this.r*9 + n
            }
        }
    }
})

var maincontainer = new Vue({
    el: '#maincontainer',
    template: '<div id="maincontainer"><row v-for="n in 8" v-bind:r="n-1" v-bind:id="9*n"></row></div>'
})

 
