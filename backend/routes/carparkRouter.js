const express = require('express');
const router = express.Router();
const cors = require('cors');
const path = require('path');
const { route } = require('express/lib/application');
const res = require('express/lib/response');
const mysql = require('mysql');

const db = mysql.createConnection({
    user: "root",
    host: "localhost",
    password: "",
    database: "carsystem"
})

router.get('/', (req, res) => {
    const FLOOR = 1;
    const LOT_NO = 8;
    let parkinglot_obj = {}
    for (let i = 0; i < FLOOR; i++) 
        for (let j = 0; j < LOT_NO; j++)
            parkinglot_obj[`P${j+1}F${i+1}`] = {
                "available": true,
                "cartype": null
            };

    
    db.query("SELECT * FROM carsparking", (err, result) => {
        if(err){
            console.log(err)
        } else{
            // res.send(result);
            for (let i = 0; i < result.length; i++) {
                parkinglot_obj[result[i].parkinglot] = {
                    "available": false,
                    "cartype": result[i].cartype
                };
            }
            let parkinglot_arr = [];
            for (let key in parkinglot_obj) {
                let val = parkinglot_obj[key];
                val.parkinglot = key;               
                parkinglot_arr.push(val);
            }
            res.send(parkinglot_arr);
        }
    })
});

router.post('/create', (req, res) => {
    let name = req.body.name;
    let email = req.body.email;
    let telephone = req.body.telephone;
    let cartype = req.body.cartype;
    let parkinglot = req.body.parkinglot;
    let active = '1';
    //let booking_status = req.booking_status;
    if (name == "" || email == "" || telephone == "" || cartype == "") {
        res.send({
            status: 'incompleted',
            message: 'You have some fields unfilled.',
        });
    }
    db.query("INSERT INTO carsparking (fullName, email,  telephone, type, parkinglot, active) VALUES(?,?,?,?,?,?)", 
    [name,email,  telephone, cartype, parkinglot, active],
    (err, result) => {
        if(err){
            console.log(err)
        } else{
            /*res.send([
                'Signup completed',
                `Email: ${email}`,
                `FullName: ${fullname}`,
                `Telephone: ${telephone}`,
                `Car type: ${carType}`
            ].join('<br>'));*/
            // res.redirect("http://127.0.0.1:5501/parking.html")
            res.send({
                status: 'completed',
                message: 'Your booking completed.',
            });
        }
    });

    // console.log(name);
    // console.log(name);
    // console.log(name);
    // console.log(name);
});

router.put('/api/users/update', (req, res) => {
    let id = req.body.id;
    let carType = req.body.carType;

    db.query("UPDATE carsparking SET type = ? WHERE id = ?", [carType, id]
    ,(err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    });
});

router.delete('/api/users/delete/:id', (req, res) => {
    let id = req.params.id;
    let carType = req.body.carType;

    db.query("DELETE FROM carsparking WHERE id = ?", id
    ,(err, result) => {
        if(err){
            console.log(err)
        } else{
            res.send(result);
        }
    });
});

module.exports = router;