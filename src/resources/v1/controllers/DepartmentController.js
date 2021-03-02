import Department from '../../../models/Department';

import AbstractRestController from "../../../core/AbstractRestController";


class Controller extends AbstractRestController {
    constructor() {
        super(Department)
    }
}

export default new Controller()