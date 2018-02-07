import { shallow, createLocalVue } from '@vue/test-utils'
import { email, password, name, amount } from '@/components/mixins/rules'
import { assert } from 'chai'
import { forEach } from 'ramda'

describe('rules mixin', () => {
  const localVue = createLocalVue()
  test('email pass in both rules', () => {
    const wrapper = shallow(localVue, {
      mixins: [email]
    })
    const emailToTest = 'test@test.com'
    const emailEmpty = wrapper.vm.emailRules[0]
    const emailFormat = wrapper.vm.emailRules[1]

    assert.isTrue(emailEmpty(emailToTest))
    assert.isTrue(emailFormat(emailToTest))
  })

  test('email fail in empty rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [email]
    })
    const emailToTest = ''
    const emailEmpty = wrapper.vm.emailRules[0]
    assert.equal(emailEmpty(emailToTest), 'E-mail is required')
  })

  test('email fail in format rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [email]
    })
    const emailToTest = 'test.com'
    const emailFormat = wrapper.vm.emailRules[1]
    assert.equal(emailFormat(emailToTest), 'E-mail must be valid')
  })

  test('amount pass in both rules', () => {
    const wrapper = shallow(localVue, {
      mixins: [amount]
    })
    const amountToTest = '22.22'
    const amountEmpty = wrapper.vm.amountRules[0]
    const amountFormat = wrapper.vm.amountRules[1]
    assert.isTrue(amountEmpty(amountToTest))
    assert.isTrue(amountFormat(amountToTest))
  })

  test('amount fail in empty rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [amount]
    })
    const amountToTest = ''
    const amountEmpty = wrapper.vm.amountRules[0]

    assert.equal(amountEmpty(amountToTest), 'This field can\'t be empty')
  })

  test('amount fail in format rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [amount]
    })
    const amountToTest = '22.232'
    const amountFormat = wrapper.vm.amountRules[1]
    assert.equal(amountFormat(amountToTest), 'Incorrect format for money')
  })

  test('name pass in rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [name]
    })
    const nameToTest = 'test'
    const nameEmpty = wrapper.vm.nameRules[0]
    assert.isTrue(nameEmpty(nameToTest))
  })

  test('name fail in rule', () => {
    const wrapper = shallow(localVue, {
      mixins: [name]
    })
    const nameToTest = ''
    const nameEmpty = wrapper.vm.nameRules[0]
    assert.equal(nameEmpty(nameToTest), 'Name is required')
  })

  test('password pass in all rules', () => {
    const wrapper = shallow(localVue, {
      mixins: [password]
    })
    const passwordToTest = 'Ab12345678'
    const assertTest = (rule) => assert.isTrue(rule(passwordToTest))
    forEach(assertTest, wrapper.vm.passwordRules)
  })
})
