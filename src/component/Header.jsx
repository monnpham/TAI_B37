import React, { Component } from 'react'
import { NavLinK } from 'react-router-dom'

export default class Header extends Component {
    render() {
        return (
            <div className='pb-5 border-bottom'>
                <h1 className=" text-center text-info" to="/user-page">USERS</h1>
            </div>
        )
    }
}