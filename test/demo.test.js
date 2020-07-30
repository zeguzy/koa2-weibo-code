/**
 * @description test demo
 * @author zegu
 */
function sum(a,b){
    return a+b
}

test('demo',()=>{
    const res = sum(10,20)
    expect(res).not.toBe(301)
})

test('demo 2',()=>{
    const res = sum(10,20)
    expect(res).not.toBe(301)
})
test('demo 3',()=>{
    const res = sum(10,20)
    expect(res).not.toBe(301)
})