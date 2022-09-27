export { default as FormComponent } from '../..\\components\\FormComponent.vue'
export { default as FormPivotTable } from '../..\\components\\FormPivotTable.vue'
export { default as FormPlan } from '../..\\components\\FormPlan.vue'
export { default as FormPlanCareer } from '../..\\components\\FormPlanCareer.vue'
export { default as FormQualification } from '../..\\components\\FormQualification.vue'
export { default as FormSelfAssessment } from '../..\\components\\FormSelfAssessment.vue'
export { default as NuxtLogo } from '../..\\components\\NuxtLogo.vue'
export { default as Test } from '../..\\components\\test.vue'
export { default as Tutorial } from '../..\\components\\Tutorial.vue'

// nuxt/nuxt.js#8607
function wrapFunctional(options) {
  if (!options || !options.functional) {
    return options
  }

  const propKeys = Array.isArray(options.props) ? options.props : Object.keys(options.props || {})

  return {
    render(h) {
      const attrs = {}
      const props = {}

      for (const key in this.$attrs) {
        if (propKeys.includes(key)) {
          props[key] = this.$attrs[key]
        } else {
          attrs[key] = this.$attrs[key]
        }
      }

      return h(options, {
        on: this.$listeners,
        attrs,
        props,
        scopedSlots: this.$scopedSlots,
      }, this.$slots.default)
    }
  }
}
