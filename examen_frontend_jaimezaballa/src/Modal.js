import React from "react";

class Modal extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            "mode": null,
            "visible": false,
            "message":"",
            "userData": {
                "id":0,
                "name":"",
                "email":"",
                "password":"",
                "address":"",
                "phone":"",
                "birthday":""
            }
        }
    }

    open(mode, userData) {
        const newUserData = {
            "id":userData.id,
            "name":(userData.name === null || userData.name === undefined ? "" : userData.name),
            "email":(userData.email === null || userData.email === undefined ? "" : userData.email),
            "password":(userData.password === null || userData.password === undefined ? "" : userData.password),
            "address":(userData.info?.address === null || userData.info?.address === undefined ? "" : userData.info.address),
            "phone":(userData.info?.phone === null || userData.info?.phone === undefined ? "" : userData.info.phone),
            "birthday":(userData.info?.birthday === null || userData.info?.birthday === undefined ? "" : userData.info.birthday)
        };
        this.setState({"message":"", "visible":true, "mode":mode, "userData":newUserData});
    }

    close() {
        this.setState({"visible":false});
    }

    save() {
        if (this.props.userList.current) {
            this.props.userList.current.save(this.state.userData);
        }
    }

    delete() {
        if (this.props.userList.current) {
            this.props.userList.current.delete(this.state.userData);
        }
    }

    message(message) {
        this.setState({"message":message});
    }

    handleChange(event) {
        let userData = this.state.userData;
        userData[event.target.name] = event.target.value;
        this.setState({"userData":userData});
    }

    render() {
        const visible = (this.state.visible === true ? "visible" : "");
        const title = (this.state.mode === 'edit' ? 'Editar' : 'Eliminar');
        return (
            <div id="Modal" className={visible}>

                <h2>{title + ' ' + this.state.userData.name}</h2>
                
                <div className="input-group">
                    <label>Nombre</label>
                    <input onChange={this.handleChange.bind(this)} name="name" type="text" className="form-control" value={this.state.userData.name} />
                </div>

                <div className="input-group">
                    <label>Email</label>
                    <input onChange={this.handleChange.bind(this)} name="email" type="text" className="form-control" value={this.state.userData.email} />
                </div>

                <div className="input-group">
                    <label>Password</label>
                    <input onChange={this.handleChange.bind(this)} name="password" type="text" className="form-control" value={this.state.userData.password} />
                </div>

                <div className="input-group">
                    <label>Domicilio</label>
                    <input onChange={this.handleChange.bind(this)} name="address" type="text" className="form-control" value={this.state.userData.address} />
                </div>

                <div className="input-group">
                    <label>Teléfono</label>
                    <input onChange={this.handleChange.bind(this)} name="phone" type="text" className="form-control" value={this.state.userData.phone} />
                </div>

                <div className="input-group">
                    <label>Fecha de nacimiento</label>
                    <input onChange={this.handleChange.bind(this)} name="birthday" type="text" className="form-control" value={this.state.userData.birthday} />
                </div>

                <p className="messages">{this.state.message}</p>

                <div className="buttons">
                    <button onClick={() => { this.close(); }} className="btn">Cancelar</button>

                    <button onClick={() => { 
                        switch (this.state.mode) {
                            case 'edit' : this.save(); break;
                            case 'delete' : this.delete(); break;
                            default : 
                        }
                    }} className={"btn " + this.state.mode}>{title}</button>
                </div>
            </div>
        );
    }

}

export default Modal;