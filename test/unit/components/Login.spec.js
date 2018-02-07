import { shallow } from '@vue/test-utils'
import { assert } from 'chai'
import Login from '@/components/Login.vue'

describe('Login.vue', () => {
  test('is a vue instance', () => {
    const wrapper = shallow(Login)
    assert.isTrue(wrapper.isVueInstance())
  })

  test('password rules works fine', () => {
    const wrapper = shallow(Login)
    const isPasswordEmpty = wrapper.vm.passwordRules[0]
    assert.equal(isPasswordEmpty(''), 'Password is required')
    assert.equal(isPasswordEmpty('test'), true)
  })

  test('click in subheader should call changeRoute', () => {
    const wrapper = shallow(Login)
    const changeRoute = jest.fn()
    wrapper.setMethods({ changeRoute })

    const registerLink = wrapper.find('v-subheader')
    registerLink.trigger('click')
    assert.equal(1, changeRoute.mock.calls.length)
    assert.equal('auth.register', changeRoute.mock.calls[0][0])
  })

  test('method changeRoute should call $router.push', () => {
    const push = jest.fn()
    const $router = { push }

    const wrapper = shallow(Login, {
      mocks: {
        $router
      }
    })

    wrapper.vm.changeRoute('test')
    assert.equal(1, push.mock.calls.length)
    assert.deepEqual({ name: 'test' }, push.mock.calls[0][0])
  })
})
