import mongoose from "mongoose";
import { objExclude } from "./helper";

export default class AbstractRestController {
    model = null
    constructor(model) {
        this.model = model

    }
    getOne = (req, res, next) => {
        let { _id } = req.params
        let { select } = req.query;


        let exec = this.model.findOne({ _id })

        if (select) {
            exec.select(select.replace(/,/g, ' '))
        }


        exec.then(result => {
            return res.status(200).json({
                data: result,
            })
        })
            .catch(error => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    }
    get = (req, res, next) => {
        let { sort = { _id: 'desc' }, limit = '15', page = '1', select } = req.query;

        let exec = this.model.find()

        if (select) {
            exec.select(select.replace(/,/g, ' '))
        }

        page = parseInt(page)
        limit = parseInt(limit)

        if (page > 1) {
            exec.skip(limit * (page - 1))
        }

        exec.limit(limit)

        let paginate = {
            currentPage: page,
            perPage: limit,

        }

        Promise.all([
            exec.exec(),
            this.model.count(),
        ])
            .then(([data, count]) => {

                return res.status(200).json({
                    data,
                    paginate: {
                        ...paginate,
                        total: count,
                    }
                })
            })
    }
    post = (req, res, next) => {
        const data = new this.model({
            ...req.body,
            _id: new mongoose.Types.ObjectId(),

        })

        return data.save()
            .then((result) => res.status(201).json({
                data: result
            }))
            .catch((error) => res.status(500).json({
                message: error.message,
                error
            }))
    }
    put = (req, res, next) => {
        let { _id } = req.params

        this.model.updateOne({ _id }, {
            $set: objExclude(req.body, { createdAt: 1, updatedAt: 1 })
        }, { runValidators: true })
            .then((result) => {
                res.status(200).json({
                    data: result
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    }
    delete = (req, res, next) => {
        let { _id } = req.params
        this.model.deleteOne({ _id })
            .then((result) => {
                res.status(200).json({
                    data: result
                })
            }).catch((error) => {
                return res.status(500).json({
                    message: error.message,
                    error
                })
            })
    }
}