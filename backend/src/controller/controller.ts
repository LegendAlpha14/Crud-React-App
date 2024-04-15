
import { NextFunction, Request, Response } from "express";
import { ProductTable } from '../database/connection'
import fs from 'fs'

export async function getRequest(req: Request, res: Response) {

    const count = Number(req.query.count)
    const number1 = Number(req.query.skip)
    // console.log("skip = " + skip1 + " Count" + count );

    const products = await ProductTable.find({}).sort({ _id: -1 }).skip(number1).limit(count)

    const totalProduct = await ProductTable.find({}).countDocuments()
    // console.log(products);
    console.log(products);

    // res.send("cusess")
    res.json({
        data: products,
        total: totalProduct
    })
}

export function getAndSaveFormData(req: Request, res: Response) {
    console.log("Body: ", req.body);
    let product = req.body
    // if (product.test === undefined) {

    //     product = { ...product, test: [] }

    // }
    ProductTable.create(product)

    console.log("File: ", req.file);
    res.send("data received successfully");

}

export async function deletImage(req: Request, res: Response) {
    // console.log(req.body);
    // console.log(__dirname + `/../uploads/${req.body.imageName}`);
    // await ProductTable.findByIdAndUpdate({ _id: id }, req.body)
    const deletedDocument = await ProductTable.findOneAndDelete({ _id: req.body.id })

    console.log("imageName : " + deletedDocument?.imageName);


    fs.unlinkSync(__dirname + `/../../uploads/${deletedDocument?.imageName}`);
    res.send("sucess");
}


export async function editProduct(req: Request, res: Response) {

    const id = req.body._id

    // const updateProduct = await ProductTable.findOne

    if (req.body.imageName) {


        const oldImageName = await ProductTable.findOne({ _id: req.body._id })
        console.log("oldImage = ", oldImageName?.imageName);

        fs.unlinkSync("/home/admin5/Documents/React/FormCrudTask/backend/uploads/" + oldImageName?.imageName);
        await ProductTable.findByIdAndUpdate({ _id: id }, req.body)

    } else {
        await ProductTable.findByIdAndUpdate({ _id: id }, req.body)

    }
    console.log("edit Product");
    console.log(req.file);

    console.log(req.body);
    console.log("edit Product");


    // const oldImageName = await ProductTable.findOne({ _id: req.body._id })
    // console.log("oldImage = ", oldImageName?.imageName);

    // fs.unlinkSync("/home/admin5/Documents/React/FormCrudTask/backend/uploads/" + oldImageName?.imageName);

    // await ProductTable.findByIdAndUpdate({ _id: id }, req.body)


    res.send("updated");

}


