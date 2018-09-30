const mongoose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');


let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
}
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'El nombre es necesario']
    },
    email: {
        type: String,
        unique: true,
        required: [true, 'El correo es necesario']

    },
    password: {
        type: String,
        required: [true, 'El pasword es necesario']
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        required: [true, 'El necesario el rol'],
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: String,
        required: true,
        default: true
    },
    google: {
        type: Boolean,
        required: false
    }

});

usuarioSchema.methods.toJSON = function() {
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}


usuarioSchema.plugin(uniqueValidator, { message: '{PATH} debe de ser unido' });
module.exports = mongoose.model('Usuario', usuarioSchema);