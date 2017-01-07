<template>
  <div class='form-group'>
    <label :for="id + '_input'">{{ labelDisplay }}</label>
    <input v-model='newValue' type='text' :id="id + '_input'" class='form-control input-sm' v-on:input='debounceChanged()'></input>
  </div>
</template>

<script>
import _ from 'lodash'

export default {
  props: {
    id: {
      required: true
    },
    name: {
      required: false
    },
    label: {
      required: false
    },
    value: {
      required: true
    },
    changeCallback: {
      required: true
    }
  },
  computed: {
    labelDisplay: function () {
      return this.label || this.name || this.id
    }
  },
  data: function () {
    return {
      newValue: this.value
    }
  },
  methods: {
    debounceChanged: _.debounce(function () {
      this.changeCallback && this.changeCallback(this.newValue)
    }, 500)
  }
}
</script>
