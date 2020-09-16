import React, { Component } from 'react'

export default class LinkButton extends Component {
    render() {
        const { onClick, disabled, ...props } = { ...this.props };
        return disabled === true ? (
            <a disabled="disabled" {...props}>
                { this.props.children}
            </a >
        ) : (
                <a {...props} onClick={onClick}>
                    {this.props.children}
                </a>
            )
    }
}
