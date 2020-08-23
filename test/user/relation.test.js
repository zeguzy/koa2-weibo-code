/**
 * 用户关系单元测试
 * @author zegu
 */

const { ID_1, ID_2, USER_NAME_1, USER_NAME_2, COOKIE_1, COOKIE_2 } = require('../testUserInfo')
const server = require('../server')
const { getFans, getFollowersData } = require('../../src/controller/userRelation')

//先让张三取消关注a12（避免出现张三关注了a12）
test('无论如何，线取消关注', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ followerId: ID_2 })
        .set('cookie', COOKIE_1)
    expect(1).toBe(1)
})

//张三关注a12应该成功
test('张三关注a12应该成功', async () => {
    const res = await server
        .post('/api/profile/Follow')
        .send({ followerId: ID_2 })
        .set('cookie', COOKIE_1)
    expect(res.body.errno).toBe(0)
})

//获取粉丝
test('获取a12的粉丝，应该有张三', async () => {
    const result = await getFans(ID_2)
    const { count, userList } = result.data
    const hasUserName = userList.some(fansInfo => {
        return fansInfo.userName === USER_NAME_1
    })

    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

//获取关注人
test('获取张三的关注人，应该有a12', async () => {
    const result = await getFollowersData(ID_1)
    const { count, userList } = result.data
    const hasUserName = userList.some(fansInfo => {
        return fansInfo.userName === USER_NAME_2
    })

    expect(count > 0).toBe(true)
    expect(hasUserName).toBe(true)
})

//张三取消关注a12
test('张三取消关注a12', async () => {
    const res = await server
        .post('/api/profile/unFollow')
        .send({ followerId: ID_2 })
        .set('cookie', COOKIE_1)
    expect(res.body.errno).toBe(0)
})