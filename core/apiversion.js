

export default function apiversion(app, routers) {

    for (let i in routers) {

        for (let j in routers[i]) {
            app.use(`/${i}/${j}`, routers[i][j])
        }
    }
}