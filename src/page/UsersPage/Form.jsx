import axios from "axios";
import React, { Component, createRef } from "react";
import { connect } from "react-redux";
import { SET_DATA_FORM, } from "../../redux/constant/user";
import { setUserAction } from "../../redux/action/user";
import { message } from "antd";

class Form extends Component {
    // chức năng thêm
    // 1. tạo state chứ input từ user
    // 2. gọi api với method POST, đưa data từ state lên server
    componentDidMount() {
        this.inputRef.current.focus();
        this.inputRef.current.value = "defaultAccount";
        this.inputRef.current.style.color = "red";
    }
    inputRef = createRef();
    formRef = createRef();

    handleChangeForm = (event) => {
        let { value, name } = event.target;
        let user = { ...this.props.user, [name]: value };
        this.props.handleSetDataForm(user);
    };
    handleAddUser = () => {
        axios({
            url: "https://64de24a0825d19d9bfb22b3d.mockapi.io/users",
            method: "POST",
            data: this.props.user,
        })
            .then((res) => {
                console.log(res);
                this.formRef.current.reset();
                this.props.handleSetUser();
            })
            .catch((err) => {
                console.log(err);
            });
    };
    handleUpdateUser = (id) => {
        axios({
            url: `https://64de24a0825d19d9bfb22b3d.mockapi.io/users/${id}`,
            method: "PUT",
            data: this.props.user,
        })
            .then((res) => {
                console.log(res);
                this.props.handleSetUser();
                message.success("Cập nhập thành công");
                this.formRef.current.reset();
            })
            .catch((err) => {
                console.log(err);
            });
    };

    render() {
        return (
            <div>
                <form ref={this.formRef} className="form-inline">
                    <input
                        ref={this.inputRef}
                        onChange={this.handleChangeForm}
                        value={this.props.user.name}
                        type="text"
                        class="form-control"
                        name="name"
                        placeholder="Name"
                    />
                    <input
                        onChange={this.handleChangeForm}
                        value={this.props.user.account}
                        type="text"
                        class="form-control"
                        name="account"
                        placeholder="Account"
                    />
                    <input
                        onChange={this.handleChangeForm}
                        value={this.props.user.password}
                        type="text"
                        class="form-control"
                        name="password"
                        placeholder="Password"
                    />
                    <button
                        onClick={this.handleAddUser}
                        type="button"
                        className="btn btn-dark"
                    >
                        Thêm
                    </button>
                    <button
                        onClick={() => {
                            this.handleUpdateUser(this.props.user.id);
                        }}
                        type="button"
                        className="btn btn-secondary"
                    >
                        Cập nhập
                    </button>
                </form>
            </div>
        );
    }
}
let mapStateToProps = (state) => {
    return {
        user: state.userReducer.user,
    };
};
let mapDispatchToProps = (dispatch) => {
    return {
        handleSetUser: () => {
            dispatch(setUserAction());
        },
        handleSetDataForm: (user) => {
            dispatch({
                type: SET_DATA_FORM,
                payload: user,
            });
        },
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Form);