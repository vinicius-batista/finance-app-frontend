import { shallow, createLocalVue } from '@vue/test-utils'
import modal from '@/components/mixins/modal'
import { assert } from 'chai'

describe('Modal mixin', () => {
  const localVue = createLocalVue()
  test('actualVisibility is equal visibility props', () => {
    const wrapper = shallow(localVue, {
      mixins: [modal],
      propsData: {
        visibility: true
      }
    })

    assert.isTrue(wrapper.vm.actualVisibility)
  })

  test('close method emit event', (next) => {
    const $emit = jest.fn()
    const wrapper = shallow(localVue, {
      mixins: [modal],
      propsData: {
        visibility: true
      },
      mocks: {
        $emit
      }
    })
    wrapper.vm.close()
    wrapper.vm.$nextTick(() => {
      assert.equal(1, $emit.mock.calls.length)
      assert.equal('close', $emit.mock.calls[0][0])
      next()
    })
  })
})
