"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const schema = new mongoose_1.Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
    },
    description: {
        type: String,
        required: [true, 'Description is required']
    },
    status: {
        type: Boolean,
        default: true
    }
});
schema.methods.toJSON = function () {
    const _a = this.toObject(), { __v, _id } = _a, category = __rest(_a, ["__v", "_id"]);
    category.uid = _id;
    return category;
};
const Category = (0, mongoose_1.model)('Category', schema);
exports.default = Category;
//# sourceMappingURL=category.model.js.map