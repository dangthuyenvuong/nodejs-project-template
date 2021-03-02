import { objExclude } from '../src/core/helper'

test('Helper function', async () => {
    let obj = objExclude({
        a: 1,
        b: 2,
        c: 3,
        d: 4
    }, { a: 1, d: 1 })

    expect(obj).toMatchObject({ b: 2, c: 3 })
})
