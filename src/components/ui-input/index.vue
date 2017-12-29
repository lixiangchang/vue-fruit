<template>
<div>
  <input class="ui-input"
   v-if="type==='text'" 
  type="text" 
  v-model="currentValue"
  :min="min"
  :maxlength="max"
  :name="name"
  :readonly="readonly"
  :disabled="disabled"
  :placeholder="placeholder"
  @click="focusHandler"
  @focus="focusHandler"
  @blur="onBlur"
  >
  <input class="ui-input" 
  v-if="type==='number'" 
  type="number"
  v-model="currentValue"
  :min="min"
  :max="max"
  :name="name"
  :readonly="readonly"
  :disabled="disabled"
  :placeholder="placeholder"
  @click="focusHandler"
  @focus="focusHandler"
  @blur="onBlur"
  >
  <input class="ui-input" 
  v-if="type==='tel'" 
  type="tel"
  v-model="currentValue"
  :maxlength="max"
  :name="name"
  :readonly="readonly"
  :disabled="disabled"
  :placeholder="placeholder"
  @click="focusHandler"
  @focus="focusHandler"
  @blur="onBlur"
  >
  <input class="ui-input" 
  v-if="type==='password'" 
  type="password"
  v-model="currentValue"
  :name="name"
  :readonly="readonly"
  :disabled="disabled"
  :placeholder="placeholder"
  @click="focusHandler"
  @focus="focusHandler"
  @blur="onBlur"
  >
</div>
</template>
<script>
export default {
  name: 'UiInput',
  props: {
    value: [String, Number],
    placeholder: String,
    type: {
      type: String,
      default: 'text'
    },
    ToFixed: { type: Number, default: 0 },
    readonly: Boolean,
    disabled: Boolean,
    min: Number,
    max: Number,
    maxlength: Number,
    name: String
  },
  data() {
    return {
      currentValue: ''
    }
  },
  computed: {},
  watch: {
    currentValue(val) {
      this.$emit('input', val)
    },
    value(val) {
      val = this.type === 'number' && this.max ? this.maxNumber(val) : val
      this.currentValue = val
    }
  },
  methods: {
    onBlur($event) {
      this.$emit('on-blur', $event, this.currentValue)
    },
    focusHandler($event) {
      if (
        typeof test !== 'undefined' &&
        $event.type === 'click' &&
        !$event.target.disabled
      ) {
        setTimeout(() => {
          $event.target.scrollIntoView(false)
        }, 230)
      }
      this.$emit('on-focus', $event, this.currentValue)
    },
    maxNumber(value) {
      var max = this.max
      var min = this.min
      var decimal = this.ToFixed
      var regexp
      regexp = !!decimal
        ? new RegExp('\\d+\\.?\\d{0,' + decimal + '}')
        : new RegExp('\\d+')
      value = value.toString().replace(/^0+/, '0')
      value = value === '' ? value : value.match(regexp).toString()
      value = !!max && value !== '' ? (+value >= max ? max : value) : value
      return value
    }
  },
  created() {
    this.currentValue = this.value || ''
  }
}
</script>
<style lang="scss">
.ui-input {
  position: relative;
  width: 100%;
  height: 1.47058824em;
  outline: 0;
  border: 0;
  background-color: transparent;
  color: inherit;
  font-size: inherit;
  line-height: 1.47058824;

  -webkit-appearance: none;
}
input.ui-input:disabled {
  color: #333;
  font-size: 28px;

  -webkit-text-fill-color: rgba(0, 0, 0, 1);
  -webkit-opacity: 1;
}
</style>
