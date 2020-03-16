import TheGoBack from "@/components/TheGoBack"
import { mount } from '@vue/test-utils'

describe('TheGoBack', () => {

    it('If image url is set - show image', () => {
        const wrapper = mount(TheGoBack)
        wrapper.setData({
            testCheck: true
        })
        expect(wrapper.find('span').isVisible()).toBe(true)
    })

    it('If image url isn\'t set - hide image', () => {
        const wrapper = mount(TheGoBack)
        wrapper.setData({
            testCheck: false
        })
        expect(wrapper.find('span').isVisible()).toBe(false)
    })
})