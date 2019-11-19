
import { TravelCtx } from "travel";

export async function everyDay_list(ctx: TravelCtx) {
    let {  body, srvs } = ctx
    const { knex } = srvs
    
    ctx.body = {
        code: 200
    }
}

export async function everyDay_award(ctx: TravelCtx) {

    let { request: { body }, params, status ,srvs} = ctx
    const { knex } =srvs
    let { id } = params
    let { player } = body

    let everyday_activity = await knex('everyday_activity').where({ id }).first()

    if (!everyday_activity) {
        ctx.body = { code: 400, msg: 'id不存在' }
        return
    }

    let date = new Date()
    let datestr = date.getFullYear() * 10000 + (date.getMonth() + 1) * 100 + date.getDate()
    let everyday_activity_record = await knex('everyday_activity_record').where({ datestr, player }).first()
    if (everyday_activity_record) {
        ctx.body = { code: 400, msg: '你已经领取今日活动奖品' }
        return
    }

}


export async function time_put(ctx) {

    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.system_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params
    let { title, start_time, end_time } = body

    let activity_time = await knex('activity_time').where({ id }).first()

    if (!activity_time) {
        ctx.body = {
            code: 200, msg: 'id不存在'
        }
        return
    }

    await knex('activity_time').update(body).where({ id })

    ctx.body = {
        code: 200, msg: '修改成功'
    }

}


export async function time_delete(ctx) {

    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.system_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params

    let uname = await knex('activity_time').where({ id }).first()
    if (!uname) {
        ctx.body = {
            code: 400, msg: 'id不存在'
        }
        return
    }

    await knex('activity_time').where({ id }).del()

    ctx.body = {
        code: 200, msg: '删除成功'
    }
}

export async function activity_choice(ctx) {
    let { session, knex, email, request: { body }, bcrypt, params } = ctx
    if (!session.user_auth) {
        ctx.body = {
            code: 400, msg: 'not jurisdiction'
        }
        return
    }
    let { id } = params

    let iscandidate = await knex('candidate').where({ id }).first()
    if (!iscandidate) {
        ctx.body = {
            code: 400, msg: '候选人id不存在'
        }
        return
    }

    let isactivity = await knex('activity').where({ user_id: session.user_id, candidate_id: id }).first()
    if (!isactivity) {
        ctx.body = {
            code: 400, msg: '你已经对该候选人投票'
        }
        return
    }

    let cdd_count = await knex('candidate').count('* as count')

    let activity_count = Math.round(cdd_count.count / 2)        //能投票的次数

    if (activity_count < 2) activity_count = 2
    if (activity_count > 5) activity_count = 5

    let user_count = await knex('activity').count('* as count')

    if (user_count.count > activity_count) {
        ctx.body = {
            code: 400, msg: `目前最大投票次数未${activity_count},你已经超过最大次数`
        }
        return
    }

    await knex('activity').insert({ user_id: session.user_id, candidate_id: id })

    ctx.body = {
        code: 200, msg: '投票成功'
    }

}


