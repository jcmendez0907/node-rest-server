const express = require('express');

let { verificaToken, verificaRole } = require('../middleware/autenticacion');

let app = express();

let Categoria = require('../models/categoria');

/**
 * Mostrar todas las categorias
 */
app.get('/categoria', verificaToken, (req, res) => {

    Categoria.find({})
        .sort('descripcion')
        .populate('usuario')
        .exec((err, categorias) => {

            if (err) {
                return res.status(500).json({
                    ok: false,
                    err
                });
            }

            res.json({
                ok: true,
                categorias
            })

        });
});

/**
 * Mostrar solo una categoria por id
 */
app.get('/categoria/:id', verificaToken, (req, res) => {

    let id = req.params.id;

    Categoria.findById(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            categoriaDB
        })
    })


});

/**
 * Crear nueva categoria
 */
app.post('/categoria', verificaToken, (req, res) => {

    let body = req.body;

    let categoria = new Categoria({
        descripcion: body.descripcion,
        usuario: req.usuario._id,
    });

    categoria.save((err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };
        //usuarioDB.password = null;
        res.json({
            ok: true,
            categoria: categoriaDB
        });
    });

});

/**
 * actualizar categoria
 */
app.put('/categoria/:id', verificaToken, (req, res) => {
    let id = req.params.id;
    let body = req.body;

    let descCategoria = {
        descripcion: body.descripcion
    }

    Categoria.findByIdAndUpdate(id, descCategoria, { new: true, runValidators: true }, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        }

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err
            })
        };

        res.json({
            ok: true,
            categoria: categoriaDB
        });


    })
});

/**
 * elimina categoria
 */
app.delete('/categoria/:id', [verificaToken, verificaRole], (req, res) => {
    //solo admin

    let id = req.params.id;

    Categoria.findByIdAndRemove(id, (err, categoriaDB) => {
        if (err) {
            return res.status(500).json({
                ok: false,
                err
            });
        };

        if (!categoriaDB) {
            return res.status(400).json({
                ok: false,
                err: {
                    message: 'Id no encontrado'
                }
            })
        }
        res.json({
            ok: true,
            message: 'Categoria eliminada'
        });

    })

});


module.exports = app;