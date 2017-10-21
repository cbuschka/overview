import React, {Component} from 'react';
import './Block.css';

function toClassName(prefix, value) {
    if (!value) {
        return "";
    }

    var className = prefix
        + value.substr(0, 1).toUpperCase()
        + value.substr(1);
    return className;
}

export class BlockContainer extends Component {

    _renderGroups() {
        var groups = (this.props.groups || []);
        var split = (100 / groups.length) | 0;
        var style = {"width": split + "vw"};

        return groups.map(function (e) {
            return (
                <div className="BlockContainerBlockWrapper" style={style}><GroupBlock group={e}></GroupBlock></div>);
        });
    }

    render() {
        return (
            <div className="BlockContainer">
                {this._renderGroups()}</div>
        );
    }
}

export class EnvBlock extends Component {

    _renderServices() {
        var single = this.props.env.services.length === 1;
        return (this.props.env.services || []).map(function (e) {
            return (<ServiceBlock single={single} service={e}></ServiceBlock>);
        });
    }

    render() {
        var name = this.props.env.name;

        return (
            <div className="EnvBlock"><span className="EnvBlockTitle">{name}</span>
                {this._renderServices()}</div>
        );
    }
}

export class GroupBlock extends Component {
    _renderEnvs() {
        return (this.props.group.envs || []).map(function (e) {
            return (<EnvBlock env={e}></EnvBlock>);
        });
    }

    render() {
        var name = this.props.group.name;

        return (
            <div className="GroupBlock"><h1>{name}</h1>
                {this._renderEnvs()}</div>
        );
    }
}

export class ServiceBlock extends Component {
    _renderInstances() {
        var single = (this.props.service.instances.length === 1)
        return (this.props.service.instances || []).map(function (e) {
            return (<InstanceBlock single={single} instance={e}></InstanceBlock>);
        });
    }

    render() {
        var name = this.props.service.name;
        var single = (this.props.single ? 'single' : '')

        return (
            <div className={"ServiceBlock " + single}>
                <span className="ServiceBlockTitle">{name}</span>
                {this._renderInstances()}</div>
        );
    }
}

export class InstanceBlock extends Component {
    render() {
        var name = this.props.instance.name;
        var status = this.props.instance.status || "unknown";
        var single = (this.props.single ? 'single' : '')

        return (
            <div className={"InstanceBlock " + single + " " + toClassName("status", status)}>{name}</div>
        );
    }
}

