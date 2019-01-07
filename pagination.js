import React from 'react';
import styles from './pagination.module.css';
import { Pagination } from 'react-bootstrap';
import {connect} from 'react-redux';
import {changePage} from "../../actions/index";
import PropTypes from 'prop-types';

function mapDispatchToProps(dispatch) {
    return {
        changePage: payload => dispatch(changePage(payload)),
    };
}

const mapStateToProps = state => {
    return {
        page: state.page
    };
};

class ConnectedPaginasion extends React.Component {

    static propTypes = {
        totalItems: PropTypes.number.isRequired,
        itemsPerPage: PropTypes.number.isRequired,
        size: PropTypes.oneOf(['large', 'medium', 'small']),
    }

    static defaultProps = {
        itemsPerPage: 10,
        size: 'medium',
        totalItems: 0
    }

    constructor(props) {
        super(props);
        this.state = {
            items: [],
        };
        this.loadPage = this.loadPage.bind(this);
    }
    loadPage(e, page) {
        e.preventDefault();
        this.props.changePage({page: page});
    }
    componentDidMount() {
        const totalPages = Math.ceil(this.props.totalItems / this.props.itemsPerPage );
        let itemss = [];
        for (let number = 1; number <= totalPages; number++) {
            itemss.push(
                <Pagination.Item key ={number} onClick={(e) => this.loadPage(e, number)} active={number === this.props.page}>{number}</Pagination.Item>
            );
        }
        this.setState({
            items: itemss
        });
    }

    render() {
        return (
            <div>
                <Pagination bsSize={this.props.size}>{this.state.items}</Pagination>
            </div>
        )
    }
}

const Paginasion = connect(mapStateToProps, mapDispatchToProps)(ConnectedPaginasion);

export default Paginasion;
