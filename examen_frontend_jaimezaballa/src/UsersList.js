import React from 'react';

import axios from 'axios';

class UserList extends React.Component {

    usuariosEndPoint = "http://localhost:10002/api/usuarios";

    constructor(props) {
        super(props);
        this.state = {
            "current_page": 1,
            "last_page": 1,
            "per_page": 10,
            "from": 1,
            "to": 1,
            "​​total": 1,
            "userList": []
        }
    }

    updatePage(page) {
        this.setState({"current_page":page}, () => {
            const url = this.usuariosEndPoint + '?page=' + this.state.current_page;
            axios.get(url).then((response) => {
                if (response.status === 200) {
                    this.setState({
                        "userList":response.data.data,
                        "current_page": response.data.current_page,
                        "last_page": response.data.last_page,
                        "per_page": response.data.per_page,
                        "from": response.data.from,
                        "to": response.data.to,
                        "​​total": response.data.total
                    });
                }
            }).catch((error) => {
                // TODO
            });
        });
    }

    save(userData) {
        if (this.props.modal.current) {
            this.props.modal.current.message("Guardando");
            //console.log("saving...", userData);
            const url = this.usuariosEndPoint + "/" + userData.id;
            // Formateamos la salida para que se valide en una sola tirada
            axios.put(url, userData).then((response) => {
                //console.log(response);
                if (response.status === 200) {
                    this.props.modal.current.message("Se actualizó este usuario");
                    setTimeout(() => {
                        this.props.modal.current.close();
                        this.updatePage(this.state.current_page);
                    }, 1000);
                } else {
                    this.props.modal.current.message("No fue posible actualizar al usuario");
                }
            }).catch((error) => {
                this.props.modal.current.message("Error de comunicación con el servidor");
            });
        }
    }

    delete(userData) {
        if (this.props.modal.current) {
            this.props.modal.current.message("Eliminando...");
            //console.log("deleting...", userData);
            const url = this.usuariosEndPoint + "/" + userData.id;
            axios.delete(url, userData).then((response) => {
                //console.log(response);
                if (response.status === 200) {
                    this.props.modal.current.message("Se eliminó este usuario");
                    setTimeout(() => {
                        this.props.modal.current.close();
                        this.updatePage(this.state.current_page);
                    }, 1000);
                } else {
                    this.props.modal.current.message("No fue posible eliminar al usuario");
                }
            }).catch((error) => {
                this.props.modal.current.message("Error de comunicación con el servidor");
            });
        }
    }

    userEdit(userData) {
        if (this.props.modal.current) {
            this.props.modal.current.open('edit', userData);
        }
    }

    userDelete(userData) {
        if (this.props.modal.current) {
            this.props.modal.current.open('delete', userData);
        }
    }

    componentDidMount() {
        this.updatePage(this.state.current_page);
    }

    render() {
        const pages = [];
        for (let i=0; i<this.state.last_page; i++) { pages.push(i+1); }
        return (
            <React.Fragment>
                <table>
                    <thead>
                        <tr>
                            <th>Nombre</th>
                            <th>Email</th>
                            <th>Fec. Nacimiento</th>
                            <th>Opciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this.state.userList.map((userData, userIndex) => {
                            const keyTR = "column_" + userData.id;
                            return (
                                <tr id={keyTR} key={keyTR}>
                                    <td>{userData.name}</td>
                                    <td>{userData.email}</td>
                                    <td>{userData.info?.birthday}</td>
                                    <td>
                                        <button onClick={() => { this.userEdit(userData); }} className="btn">Editar</button>
                                        <button onClick={() => { this.userDelete(userData); }} className="btn">Eliminar</button>
                                    </td>
                                </tr>    
                            );
                        })}
                    </tbody>
                    <tfoot>
                        <tr>
                            <td>
                                {pages.map((page) => {
                                    const current = (this.state.current_page === page ? " current" : "");
                                    const keyButton = "page_" + page;
                                    return (
                                        <button id={keyButton} key={keyButton} onClick={() => { this.updatePage(page); }} className={"btn" + current}>{page}</button>
                                    );
                                })}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </React.Fragment>
        );
    }


}

export default UserList;